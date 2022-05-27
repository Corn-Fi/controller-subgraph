import { Address, BigInt, dataSource } from "@graphprotocol/graph-ts"
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
import { Controller, Order, Trade, User, ERC20, StrategyToken, Strategy } from "../generated/schema"

const ADDRESS_ZERO = Address.fromString('0x0000000000000000000000000000000000000000')
const BIG_INT_ONE = BigInt.fromI32(1)
const BIG_INT_ZERO = BigInt.fromI32(0)

export function fetchController(): Controller {
  let controller = Controller.load(dataSource.address().toString())
  if(controller === null) {
    controller = new Controller(dataSource.address().toString())
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


export function fetchOrder(strategyId: BigInt, tokenId: BigInt, tradeId: BigInt, orderId: BigInt): Order {
  const id = strategyId.toString().concat("-").concat(orderId.toString())
  const controller = ControllerContract.bind(dataSource.address())
  controller
  let trade = fetchTrade(strategyId, tokenId, tradeId)
  let order = Order.load(id)
  if(order === null) {
    order = new Order(id)
    order.trade = trade.id
    order.fromToken 
  }
}

export function fetchTrade(strategyId: BigInt, tokenId: BigInt, tradeId: BigInt): Trade {
  
}


// type User @entity {
//   id: ID!

//   controller: Controller!
//   strategyTokens: [StrategyToken!] @derivedfrom(field: "owner")
// }


export function fetchUser(address: Address): User {
  const controller = fetchController()
  let user = User.load(address.toString())
  if(user === null) {
    user = new User(address.toString())
    user.controller = controller.id
    user.save()
  }
  return user as User
}

export function fetchERC20(address: Address, strategyId: BigInt, strategyTokenId: BigInt): ERC20 {
  const id = address.toString().concat("-").concat(strategyId.toString()).concat("-").concat(strategyTokenId.toString())
  const strategyToken = fetchStrategyToken(strategyId, strategyTokenId)
  let erc20 = ERC20.load(id)
  if(erc20 === null) {
    erc20 = new ERC20(id)
    erc20.address = address
    erc20.owner = ADDRESS_ZERO
    erc20.amount = BIG_INT_ZERO
    erc20.strategyToken = strategyToken.id
    erc20.save()
  }
  return erc20 as ERC20
}

export function fetchStrategyToken(strategyId: BigInt, tokenId: BigInt): StrategyToken {
  const id = strategyId.toString().concat("-").concat(tokenId.toString())

  const strategy = fetchStrategy(strategyId)
  let strategyToken = StrategyToken.load(id)
  if(strategyToken === null) {
    strategyToken = new StrategyToken(id)
    strategyToken.tokenId = tokenId
    strategyToken.strategy = strategy.id
    strategyToken.owner = ADDRESS_ZERO 
    strategyToken.save()
  }
  return strategyToken as StrategyToken
}

export function fetchStrategy(strategyId: BigInt): Strategy {
  let strategy = Strategy.load(strategyId.toString())
  if(strategy === null) {
    strategy = new Strategy(strategyId.toString())
    strategy.controller = dataSource.address().toString()
    strategy.tokenCount = BIG_INT_ONE
  }
  strategy.save()
  return strategy as Strategy
}






export function handleCreateOrder(event: CreateOrder): void {
  let order = fetchOrder(event.params._vaultId, event.params._orderId, )
}

export function handleCreateTrade(event: CreateTrade): void {

}

export function handleFillOrder(event: FillOrder): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePaused(event: Paused): void {}

export function handleUnpaused(event: Unpaused): void {}

export function handleWithdraw(event: Withdraw): void {}
