import { Address, BigInt, dataSource, log } from "@graphprotocol/graph-ts"
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
import { Order, Trade, User, ERC20, StrategyToken } from "../generated/schema"

const ADDRESS_ZERO = Address.fromString('0x0000000000000000000000000000000000000000')
const BIG_INT_ONE = BigInt.fromI32(1)
const BIG_INT_ZERO = BigInt.fromI32(0)
const CONTROLLER_VIEW = Address.fromString('0xC69334272cAE03986B4d9e5FC6C3897934E2D7Ef')






// export function fetchStrategy(strategyId: BigInt): Strategy {
//   const controllerView = ControllerView.bind(CONTROLLER_VIEW)
//   const strategyDetails = controllerView.vaultDetails(strategyId)
//   let strategy = Strategy.load(strategyId.toString())
//   if(strategy === null) {
//     strategy = new Strategy(strategyId.toString())
//     strategy.controller = dataSource.address().toHex()
//     strategy.tokenCount = BIG_INT_ONE
//     strategy.name = strategyDetails.value0
//     strategy.address = strategyDetails.value3
//     strategy.save()
//   }
//   return strategy as Strategy
// }



// ---------------------------------------------------------------------------------
// //////////////////////////////// Fetch Entities /////////////////////////////////
// ---------------------------------------------------------------------------------

export function fetchUser(address: Address): User {
  let user = User.load(address.toHexString())
  if(user === null) {
    user = new User(address.toHex())
    user.save()
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
    erc20.address = address
    erc20.amount = BIG_INT_ZERO
    erc20.save()
  }
  return erc20 as ERC20
}

// ---------------------------------------------------------------------------------

export function fetchStrategyToken(strategyId: BigInt, tokenId: BigInt): StrategyToken {
  const controller = ControllerContract.bind(dataSource.address())
  const strat = IVaultBase.bind(controller.vaults(strategyId))
  const call = strat.try_ownerOf(tokenId)
  let owner = ADDRESS_ZERO
  if(!call.reverted) {
    owner = call.value
  }

  const id = strategyId.toString().concat("-").concat(tokenId.toString())

  let strategyToken = StrategyToken.load(id)
  if(strategyToken === null) {
    strategyToken = new StrategyToken(id)

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
    trade.save()
  }
  return trade as Trade
}

// ---------------------------------------------------------------------------------

export function fetchOrder(strategyId: BigInt, orderId: BigInt): Order {
  const id = strategyId.toString().concat("-").concat(orderId.toString())
  const controllerView = ControllerView.bind(CONTROLLER_VIEW)
  const orderData = controllerView.viewOrder(strategyId, orderId)
  
  updateERC20(strategyId, orderData.tokenId)
  
  let order = Order.load(id)
  if(order === null) {
    order = new Order(id)

    let trade = fetchTrade(strategyId, orderData.tokenId, orderData.tradeId)

    const tr = trade.orders
    if(tr === null) {
      trade.orders = [order.id]
    }
    else {
      trade.orders = tr.concat([order.id])
    }
    trade.save()

    const strategyToken = fetchStrategyToken(strategyId, orderData.tokenId)
    order.orderId = orderId
    order.fromToken = orderData.tokens[0]
    order.toToken = orderData.tokens[1]
    order.amountIn = orderData.amounts[0]
    order.desiredAmountOut = orderData.amounts[1]
    order.amountOut = orderData.amounts[2]
    order.expiration = orderData.times[0]
    order.open = true
    order.timestamp = orderData.timestamp
    order.strategyToken = strategyToken.id
    order.save()
  }
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
    erc20.amount = amounts[i].amount
    erc20.save()
  }
}

// ---------------------------------------------------------------------------------
// /////////////////////////////////// Handlers ////////////////////////////////////
// ---------------------------------------------------------------------------------

export function handleCreateOrder(event: CreateOrder): void {
  fetchOrder(event.params._vaultId, event.params._orderId)
}

export function handleCreateTrade(event: CreateTrade): void {}

export function handleFillOrder(event: FillOrder): void {
  const controllerView = ControllerView.bind(CONTROLLER_VIEW)
  const orderData = controllerView.viewOrder(event.params._vaultId, event.params._orderId)
  let order = fetchOrder(event.params._vaultId, event.params._orderId)
  order.timestamp = event.block.timestamp
  order.amountOut = orderData.amounts[1]
  order.open = false
  order.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePaused(event: Paused): void {}

export function handleUnpaused(event: Unpaused): void {}

export function handleWithdraw(event: Withdraw): void {
  const strategyToken = fetchStrategyToken(event.params._vaultId, event.params._tokenId)
  strategyToken.open = false
  strategyToken.save()

  const controller = ControllerContract.bind(dataSource.address())
  const strategy = IVaultBase.bind(controller.vaults(event.params._vaultId))
  
  const st = strategyToken.trades
  if(st !== null) {
    const tradeLength = st.length
    for(let i = 0; i < tradeLength; i++) {
      const orders = strategy.trade(event.params._tokenId, BigInt.fromI64(i))
      for(let j = 0; j < orders.length; j++) {
        if(strategy.order(orders[j]).timestamp == BIG_INT_ONE) {
          let order = fetchOrder(event.params._vaultId, orders[j])
          order.timestamp = event.block.timestamp
          order.amountOut = BigInt.fromI64(0)
          order.open = false
          order.save()
        }
      }
    }
  }
}