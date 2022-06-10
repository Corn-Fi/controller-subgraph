import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts"
import {
  Controller as ControllerContract,
  CreateOrder,
  CreateTrade,
  FillOrder,
  OwnershipTransferred,
  Paused,
  Unpaused,
  Withdraw
} from "../generated/undefined/Controller"
import { IVaultBase } from "../generated/undefined/IVaultBase"
import { ControllerView } from "../generated/undefined/ControllerView"
import { ERC20 as ERC20Contract } from "../generated/undefined/ERC20"
import { Order, Trade, User, ERC20, ERC20Meta, StrategyToken, Controller } from "../generated/schema"

const ADDRESS_ZERO = Address.fromString('0x0000000000000000000000000000000000000000')
const BIG_INT_ONE = BigInt.fromI32(1)
const BIG_INT_ZERO = BigInt.fromI32(0)
const CONTROLLER_VIEW = Address.fromString('0xC69334272cAE03986B4d9e5FC6C3897934E2D7Ef')
const CONTROLLER = Address.fromString('0x678753f5b53bfbF1d4dCfBB0F33aB5C2161edDF2')


// ---------------------------------------------------------------------------------
// //////////////////////////////// Fetch Entities /////////////////////////////////
// ---------------------------------------------------------------------------------

export function fetchERC20Contract(address: Address): ERC20Contract {
  return ERC20Contract.bind(address)
}

// ---------------------------------------------------------------------------------

export function fetchController(): Controller {
  let controller = Controller.load(CONTROLLER.toHexString())
  if(controller === null) {
    controller = new Controller(CONTROLLER.toHexString())
    controller.strategyCount = BIG_INT_ZERO
    controller.userCount = BIG_INT_ZERO
    controller.totalOrderCount = BIG_INT_ZERO
    controller.openOrderCount = BIG_INT_ZERO
    controller.filledOrderCount = BIG_INT_ZERO
    controller.totalValueUSD = BigDecimal.zero()
    controller.save()
  }
  return controller as Controller
}

// ---------------------------------------------------------------------------------

export function fetchUser(address: Address): User {
  let user = User.load(address.toHexString())
  if(user === null) {
    user = new User(address.toHex())
    user.save()

    let controller = fetchController()
    controller.userCount = controller.userCount.plus(BIG_INT_ONE)
    controller.save()
  }
  return user as User
}

// ---------------------------------------------------------------------------------

export function fetchERC20(address: Address, strategyId: BigInt, tokenId: BigInt): ERC20 {
  const id = address.toHexString().concat("-").concat(strategyId.toString()).concat("-").concat(tokenId.toString())
  let erc20 = ERC20.load(id)
  if(erc20 === null) {
    erc20 = new ERC20(id)

    const strategyToken = fetchStrategyToken(strategyId, tokenId)

    const st = strategyToken.erc20
    if(st === null) {
      strategyToken.erc20 = [erc20.id]
    }
    else {
      strategyToken.erc20 = st.concat([erc20.id])
    }
    strategyToken.save()

    erc20.strategyToken = strategyToken.id
    erc20.owner = strategyToken.owner
    erc20.erc20Meta = fetchERC20Meta(address).id
    erc20.amount = BigDecimal.zero()
    erc20.save()
  }
  return erc20 as ERC20
}

// ---------------------------------------------------------------------------------

export function fetchERC20Meta(address: Address): ERC20Meta {
  const id = address.toHexString()
  let erc20 = ERC20Meta.load(id)
  if(erc20 === null) {
    const erc20Contract = fetchERC20Contract(address)
    erc20 = new ERC20Meta(id)
    erc20.priceUSD = BigDecimal.zero()
    erc20.decimals = BigInt.fromI32((erc20Contract.decimals()))
    erc20.name = erc20Contract.name()
    erc20.symbol = erc20Contract.symbol()
    erc20.totalBalance = BigDecimal.zero()
    erc20.totalValueUSD = BigDecimal.zero()
    erc20.save()

    let controller = fetchController()
    const erc20s = controller.erc20
    if(erc20s === null) {
      controller.erc20 = [erc20.id]
    }
    else {
      controller.erc20 = erc20s.concat([erc20.id])
    }
    controller.save()
  }
  return erc20 as ERC20Meta
}

// ---------------------------------------------------------------------------------

export function fetchStrategyToken(strategyId: BigInt, tokenId: BigInt): StrategyToken {
  const controller = ControllerContract.bind(CONTROLLER)
  const strat = IVaultBase.bind(controller.vaults(strategyId))

  const id = strategyId.toString().concat("-").concat(tokenId.toString())

  let strategyToken = StrategyToken.load(id)
  if(strategyToken === null) {
    if(tokenId.equals(BIG_INT_ONE)) {
      let contr = fetchController()
      contr.strategyCount = contr.strategyCount.plus(BIG_INT_ONE)
      contr.save()
    }

    strategyToken = new StrategyToken(id)

    const owner = strat.ownerOf(tokenId)
    let user = fetchUser(owner)

    const st = user.strategyTokens
    if(st === null) {
      user.strategyTokens = [strategyToken.id]
    } 
    else {
      user.strategyTokens = st.concat([strategyToken.id])
    }
    user.save()

    strategyToken.strategyId = strategyId
    strategyToken.tokenId = tokenId
    strategyToken.owner = owner 
    strategyToken.open = true
    strategyToken.timestamp = BIG_INT_ZERO
    strategyToken.save()
  }
  return strategyToken as StrategyToken
}

// ---------------------------------------------------------------------------------

export function fetchTrade(strategyId: BigInt, tokenId: BigInt, tradeId: BigInt): Trade {
  const id = strategyId.toString().concat("-").concat(tokenId.toString()).concat("-").concat(tradeId.toString())
  let trade = Trade.load(id)
  if(trade === null) {
    trade = new Trade(id)

    const strategyToken = fetchStrategyToken(strategyId, tokenId)

    const st = strategyToken.trades
    if(st === null) {
      strategyToken.trades = [trade.id]
    }
    else {
      strategyToken.trades = st.concat([trade.id])
    }
    strategyToken.save()

    trade.tradeId = tradeId
    trade.token = strategyToken.id
    trade.timestamp = BIG_INT_ZERO
    trade.save()
  }
  return trade as Trade
}

// ---------------------------------------------------------------------------------

export function fetchOrder(strategyId: BigInt, orderId: BigInt, timestamp: BigInt): Order {
  const id = strategyId.toString().concat("-").concat(orderId.toString())
  const controllerView = ControllerView.bind(CONTROLLER_VIEW)
  const orderData = controllerView.viewOrder(strategyId, orderId)
  
  updateERC20(strategyId, orderData.tokenId)

  let trade = fetchTrade(strategyId, orderData.tokenId, orderData.tradeId)
  trade.timestamp = timestamp

  let strategyToken = fetchStrategyToken(strategyId, orderData.tokenId)
  strategyToken.timestamp = timestamp
  strategyToken.save()
  
  let order = Order.load(id)
  if(order === null) {
    order = new Order(id)

    let controller = fetchController()
    controller.totalOrderCount = controller.totalOrderCount.plus(BIG_INT_ONE)
    controller.openOrderCount = controller.openOrderCount.plus(BIG_INT_ONE)
    controller.save()
    
    const tr = trade.orders
    if(tr === null) {
      trade.orders = [order.id]
    }
    else {
      trade.orders = tr.concat([order.id])
    }

    const fromPricePrecision = BigInt.fromI32(10).pow(u8(fetchERC20Meta(orderData.tokens[0]).decimals.toI32())).toBigDecimal()
    const toPricePrecision = BigInt.fromI32(10).pow(u8(fetchERC20Meta(orderData.tokens[1]).decimals.toI32())).toBigDecimal()

    order.orderId = orderId
    order.fromToken = orderData.tokens[0]
    order.toToken = orderData.tokens[1]
    order.amountIn = orderData.amounts[0].toBigDecimal().div(fromPricePrecision)
    order.desiredAmountOut = orderData.amounts[1].toBigDecimal().div(toPricePrecision)
    order.amountOut = orderData.amounts[2].toBigDecimal()
    order.expiration = orderData.times[0]
    order.open = true
    order.timestamp = orderData.timestamp
    order.strategyToken = strategyToken.id
    order.save()
  }
  trade.save()
  return order as Order
}

// ---------------------------------------------------------------------------------
// /////////////////////////////// Helper Functions ////////////////////////////////
// ---------------------------------------------------------------------------------

export function updateERC20(strategyId: BigInt, tokenId: BigInt): void {
  const controllerView = ControllerView.bind(CONTROLLER_VIEW)
  const amounts = controllerView.tokenAmounts(strategyId, tokenId)
  for(let i = 0; i < amounts.length; i++) {
    let erc20 = fetchERC20(amounts[i].token, strategyId, tokenId)

    let erc20Meta = fetchERC20Meta(amounts[i].token)
    const denominator = BigInt.fromI32(10).pow(u8(erc20Meta.decimals.toI32())).toBigDecimal()
    const difference = amounts[i].amount.toBigDecimal().minus(erc20.amount).div(denominator)
    erc20Meta.totalBalance = erc20Meta.totalBalance.plus(difference)
    erc20Meta.totalValueUSD = erc20Meta.totalBalance.times(erc20Meta.priceUSD)
    erc20Meta.save()

    erc20.amount = amounts[i].amount.toBigDecimal().div(denominator)
    erc20.save()
  }
}

// ---------------------------------------------------------------------------------
// /////////////////////////////////// Handlers ////////////////////////////////////
// ---------------------------------------------------------------------------------

export function handleCreateOrder(event: CreateOrder): void {
  fetchOrder(event.params._vaultId, event.params._orderId, event.block.timestamp)
}

export function handleCreateTrade(event: CreateTrade): void {}

export function handleFillOrder(event: FillOrder): void {
  const controllerView = ControllerView.bind(CONTROLLER_VIEW)
  const orderData = controllerView.viewOrder(event.params._vaultId, event.params._orderId)
  let order = fetchOrder(event.params._vaultId, event.params._orderId, event.block.timestamp)
  const pricePrecision = BigInt.fromI32(10).pow(u8(fetchERC20Meta(orderData.tokens[1]).decimals.toI32())).toBigDecimal()
  order.timestamp = event.block.timestamp
  order.amountOut = orderData.amounts[1].toBigDecimal().div(pricePrecision)
  order.open = false
  order.save()

  let controller = fetchController()
  controller.openOrderCount = controller.openOrderCount.minus(BIG_INT_ONE)
  controller.filledOrderCount = controller.filledOrderCount.plus(BIG_INT_ONE)
  controller.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePaused(event: Paused): void {}

export function handleUnpaused(event: Unpaused): void {}

export function handleWithdraw(event: Withdraw): void {
  const strategyToken = fetchStrategyToken(event.params._vaultId, event.params._tokenId)
  strategyToken.open = false
  strategyToken.save()

  const controller = ControllerContract.bind(CONTROLLER)
  const strategy = IVaultBase.bind(controller.vaults(event.params._vaultId))
  
  const st = strategyToken.trades
  if(st !== null) {
    const tradeLength = st.length
    for(let i = 0; i < tradeLength; i++) {
      const orders = strategy.trade(event.params._tokenId, BigInt.fromI64(i))
      for(let j = 0; j < orders.length; j++) {
        if(strategy.order(orders[j]).timestamp == BIG_INT_ONE) {
          let order = fetchOrder(event.params._vaultId, orders[j], event.block.timestamp)
          order.timestamp = event.block.timestamp
          order.amountOut = BigInt.fromI64(0).toBigDecimal()
          order.open = false
          order.save()

          let controller = fetchController()
          controller.openOrderCount = controller.openOrderCount.minus(BIG_INT_ONE)
          controller.save()
        }
      }
    }
  }
}