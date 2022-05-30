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
import { ControllerViewSubgraph } from "../generated/ControllerViewSubgraph/ControllerViewSubgraph"
import { Controller, Order, Trade, User, ERC20, StrategyToken, Strategy } from "../generated/schema"

const ADDRESS_ZERO = Address.fromString('0x0000000000000000000000000000000000000000')
const BIG_INT_ONE = BigInt.fromI32(1)
const BIG_INT_ZERO = BigInt.fromI32(0)
const CONTROLLER_VIEW = Address.fromString('0xEd40AB3f5ee0FaE785d94abC2328d65960a19608')

export function fetchController(): Controller {
  let controller = Controller.load(dataSource.address().toHex())
  if(controller === null) {
    controller = new Controller(dataSource.address().toHex())
    controller.owner = ADDRESS_ZERO
    controller.save()
  }
  return controller as Controller
}



// type Order @entity {
//   # id = strategy ID "-" order ID
//   id: ID!

//   orderId: BigInt!

//   trade: Trade!
  
//   fromToken: Bytes!
//   toToken: Bytes!
//   amountIn: BigInt!
//   desiredAmountOut: BigInt!
//   amountOut: BigInt!
//   expiration: BigInt!

//   open: Boolean!
//   timestamp: BigInt!
// }


export function fetchOrder(strategyId: BigInt, orderId: BigInt): Order {
  const id = strategyId.toString().concat("-").concat(orderId.toString())
  const controllerView = ControllerViewSubgraph.bind(CONTROLLER_VIEW)
  const orderData = controllerView.viewOrder(strategyId, orderId)
  const strategy = fetchStrategy(strategyId)
  
  updateERC20(strategyId, orderData.tokenId)
  let trade = fetchTrade(strategyId, orderData.tokenId, ADDRESS_ZERO)
  let order = Order.load(id)
  if(order === null) {
    order = new Order(id)
    order.orderId = orderId
    order.trade = trade.id
    order.fromToken = orderData.tokens[0]
    order.toToken = orderData.tokens[1]
    order.amountIn = orderData.amounts[0]
    order.desiredAmountOut = orderData.amounts[1]
    order.amountOut = orderData.amounts[2]
    order.expiration = orderData.times[0]
    order.open = true
    order.timestamp = orderData.timestamp
    order.owner = ADDRESS_ZERO
    order.strategy = strategy.id
    order.save()
  }
  return order as Order
}



// type Trade @entity {
//   #id = strategy ID "-" token ID "-" trade ID
//   id: ID!

//   tradeId: BigInt!
//   token: StrategyToken!
//   orders: [Order!]! @derivedfrom(field: "trade")
// }


export function fetchTrade(strategyId: BigInt, tokenId: BigInt, creator: Address): Trade {
  const controllerView = ControllerViewSubgraph.bind(CONTROLLER_VIEW)
  const tradeId = controllerView.tokenTradeLength(strategyId, tokenId).minus(BIG_INT_ONE)

  const id = strategyId.toString().concat("-").concat(tokenId.toString()).concat("-").concat(tradeId.toString())
  const strategyToken = fetchStrategyToken(strategyId, tokenId, creator)
  let trade = Trade.load(id)
  if(trade === null) {
    trade = new Trade(id)
    trade.tradeId = tradeId
    trade.token = strategyToken.id
    trade.save()
  }
  return trade as Trade
}


// // type User @entity {
// //   id: ID!

// //   controller: Controller!
// //   strategyTokens: [StrategyToken!] @derivedfrom(field: "owner")
// // }


export function fetchUser(address: Address): User {
  const controller = fetchController()
  let user = User.load(address.toHex())
  if(user === null) {
    user = new User(address.toHex())
    user.controller = controller.id
    user.save()
  }
  return user as User
}

export function updateERC20(strategyId: BigInt, strategyTokenId: BigInt): void {
  const controllerView = ControllerViewSubgraph.bind(CONTROLLER_VIEW)
  const amounts = controllerView.tokenAmounts(strategyId, strategyTokenId)
  for(let i = 0; i < amounts.length; i++) {
    let id = amounts[i].token.toHexString().concat("-").concat(strategyId.toString()).concat("-").concat(strategyTokenId.toString())
    let strategyToken = fetchStrategyToken(strategyId, strategyTokenId, ADDRESS_ZERO)
    let erc20 = new ERC20(id)
    erc20.address = amounts[i].token
    erc20.owner = ADDRESS_ZERO
    erc20.amount = amounts[i].amount
    erc20.strategyToken = strategyToken.id
    erc20.save()
  }
}

export function fetchStrategyToken(strategyId: BigInt, tokenId: BigInt, creator: Address): StrategyToken {
  const id = strategyId.toString().concat("-").concat(tokenId.toString())

  const strategy = fetchStrategy(strategyId)
  let strategyToken = StrategyToken.load(id)
  if(strategyToken === null) {
    strategyToken = new StrategyToken(id)
    strategyToken.tokenId = tokenId
    strategyToken.strategy = strategy.id
    strategyToken.owner = creator 
    strategyToken.save()
  }
  return strategyToken as StrategyToken
}

export function fetchStrategy(strategyId: BigInt): Strategy {
  const controllerView = ControllerViewSubgraph.bind(CONTROLLER_VIEW)
  const strategyDetails = controllerView.vaultDetails(strategyId)
  let strategy = Strategy.load(strategyId.toString())
  if(strategy === null) {
    strategy = new Strategy(strategyId.toString())
    strategy.controller = dataSource.address().toHex()
    strategy.tokenCount = BIG_INT_ONE
    strategy.name = strategyDetails.value0
    strategy.address = strategyDetails.value3
    strategy.save()
  }
  return strategy as Strategy
}






export function handleCreateOrder(event: CreateOrder): void {
  fetchUser(event.params._creator)
  let order = fetchOrder(event.params._vaultId, event.params._orderId)
  order.owner = event.params._creator
  order.save()
}

export function handleCreateTrade(event: CreateTrade): void {
  fetchTrade(event.params._vaultId, event.params._tokenId, event.params._creator)
}

export function handleFillOrder(event: FillOrder): void {
  const controllerView = ControllerViewSubgraph.bind(CONTROLLER_VIEW)
  const orderData = controllerView.viewOrder(event.params._vaultId, event.params._orderId)
  let order = fetchOrder(event.params._vaultId, event.params._orderId)
  order.timestamp = event.block.timestamp
  order.amountOut = orderData.amounts[1]
  order.open = false
  order.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let controller = fetchController()
  controller.owner = event.params.newOwner
  controller.save()
}

export function handlePaused(event: Paused): void {}

export function handleUnpaused(event: Unpaused): void {}

export function handleWithdraw(event: Withdraw): void {
  const controllerView = ControllerViewSubgraph.bind(CONTROLLER_VIEW)
  const tradeLength = controllerView.tokenTradeLength(event.params._vaultId, event.params._tokenId)
  for(let i = BIG_INT_ZERO; i < tradeLength; i.plus(BIG_INT_ONE)) {
    const orders = controllerView.viewTrade(controllerView.vaults(event.params._vaultId), event.params._tokenId, i)
    for(let j = 0; j < orders.length; j++) {
      if(orders[j].timestamp == BIG_INT_ONE) {
        let order = fetchOrder(event.params._vaultId, orders[j].orderId)
        order.timestamp = event.block.timestamp
        order.amountOut = BigInt.fromI64(0)
        order.open = false
        order.save()
      }
    }
  }
}
