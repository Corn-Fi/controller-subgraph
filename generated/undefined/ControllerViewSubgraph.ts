// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class ControllerViewSubgraph__findBestPathExactInResult {
  value0: Address;
  value1: Array<Address>;
  value2: BigInt;

  constructor(value0: Address, value1: Array<Address>, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromAddressArray(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }

  getValue0(): Address {
    return this.value0;
  }

  getValue1(): Array<Address> {
    return this.value1;
  }

  getValue2(): BigInt {
    return this.value2;
  }
}

export class ControllerViewSubgraph__findBestPathExactOutResult {
  value0: Address;
  value1: Array<Address>;
  value2: BigInt;

  constructor(value0: Address, value1: Array<Address>, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromAddressArray(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }

  getValue0(): Address {
    return this.value0;
  }

  getValue1(): Array<Address> {
    return this.value1;
  }

  getValue2(): BigInt {
    return this.value2;
  }
}

export class ControllerViewSubgraph__tokenAmountsResultValue0Struct extends ethereum.Tuple {
  get token(): Address {
    return this[0].toAddress();
  }

  get amount(): BigInt {
    return this[1].toBigInt();
  }
}

export class ControllerViewSubgraph__tokenFeesResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt, value3: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    return map;
  }

  getValue0(): BigInt {
    return this.value0;
  }

  getValue1(): BigInt {
    return this.value1;
  }

  getValue2(): BigInt {
    return this.value2;
  }

  getValue3(): BigInt {
    return this.value3;
  }
}

export class ControllerViewSubgraph__vaultDetailsResult {
  value0: string;
  value1: string;
  value2: string;
  value3: Address;

  constructor(value0: string, value1: string, value2: string, value3: Address) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromString(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    map.set("value3", ethereum.Value.fromAddress(this.value3));
    return map;
  }

  getValue0(): string {
    return this.value0;
  }

  getValue1(): string {
    return this.value1;
  }

  getValue2(): string {
    return this.value2;
  }

  getValue3(): Address {
    return this.value3;
  }
}

export class ControllerViewSubgraph__vaultTokensByOwnerResultValue0Struct extends ethereum.Tuple {
  get vault(): Address {
    return this[0].toAddress();
  }

  get tokenId(): BigInt {
    return this[1].toBigInt();
  }
}

export class ControllerViewSubgraph__viewOpenOrdersByTokenResultValue0Struct extends ethereum.Tuple {
  get tokenId(): BigInt {
    return this[0].toBigInt();
  }

  get tradeId(): BigInt {
    return this[1].toBigInt();
  }

  get orderId(): BigInt {
    return this[2].toBigInt();
  }

  get timestamp(): BigInt {
    return this[3].toBigInt();
  }

  get tokens(): Array<Address> {
    return this[4].toAddressArray();
  }

  get amounts(): Array<BigInt> {
    return this[5].toBigIntArray();
  }

  get times(): Array<BigInt> {
    return this[6].toBigIntArray();
  }
}

export class ControllerViewSubgraph__viewOpenOrdersInRangeResultValue0Struct extends ethereum.Tuple {
  get tokenId(): BigInt {
    return this[0].toBigInt();
  }

  get tradeId(): BigInt {
    return this[1].toBigInt();
  }

  get orderId(): BigInt {
    return this[2].toBigInt();
  }

  get timestamp(): BigInt {
    return this[3].toBigInt();
  }

  get tokens(): Array<Address> {
    return this[4].toAddressArray();
  }

  get amounts(): Array<BigInt> {
    return this[5].toBigIntArray();
  }

  get times(): Array<BigInt> {
    return this[6].toBigIntArray();
  }
}

export class ControllerViewSubgraph__viewOrderResultValue0Struct extends ethereum.Tuple {
  get tokenId(): BigInt {
    return this[0].toBigInt();
  }

  get tradeId(): BigInt {
    return this[1].toBigInt();
  }

  get orderId(): BigInt {
    return this[2].toBigInt();
  }

  get timestamp(): BigInt {
    return this[3].toBigInt();
  }

  get tokens(): Array<Address> {
    return this[4].toAddressArray();
  }

  get amounts(): Array<BigInt> {
    return this[5].toBigIntArray();
  }

  get times(): Array<BigInt> {
    return this[6].toBigIntArray();
  }
}

export class ControllerViewSubgraph__viewOrdersResultValue0Struct extends ethereum.Tuple {
  get tokenId(): BigInt {
    return this[0].toBigInt();
  }

  get tradeId(): BigInt {
    return this[1].toBigInt();
  }

  get orderId(): BigInt {
    return this[2].toBigInt();
  }

  get timestamp(): BigInt {
    return this[3].toBigInt();
  }

  get tokens(): Array<Address> {
    return this[4].toAddressArray();
  }

  get amounts(): Array<BigInt> {
    return this[5].toBigIntArray();
  }

  get times(): Array<BigInt> {
    return this[6].toBigIntArray();
  }
}

export class ControllerViewSubgraph__viewTradeResultValue0Struct extends ethereum.Tuple {
  get tokenId(): BigInt {
    return this[0].toBigInt();
  }

  get tradeId(): BigInt {
    return this[1].toBigInt();
  }

  get orderId(): BigInt {
    return this[2].toBigInt();
  }

  get timestamp(): BigInt {
    return this[3].toBigInt();
  }

  get tokens(): Array<Address> {
    return this[4].toAddressArray();
  }

  get amounts(): Array<BigInt> {
    return this[5].toBigIntArray();
  }

  get times(): Array<BigInt> {
    return this[6].toBigIntArray();
  }
}

export class ControllerViewSubgraph extends ethereum.SmartContract {
  static bind(address: Address): ControllerViewSubgraph {
    return new ControllerViewSubgraph("ControllerViewSubgraph", address);
  }

  Controller(): Address {
    let result = super.call("Controller", "Controller():(address)", []);

    return result[0].toAddress();
  }

  try_Controller(): ethereum.CallResult<Address> {
    let result = super.tryCall("Controller", "Controller():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  Resolver(): Address {
    let result = super.call("Resolver", "Resolver():(address)", []);

    return result[0].toAddress();
  }

  try_Resolver(): ethereum.CallResult<Address> {
    let result = super.tryCall("Resolver", "Resolver():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  activeTokens(_vaultId: BigInt, _token: Address): boolean {
    let result = super.call(
      "activeTokens",
      "activeTokens(uint256,address):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromAddress(_token)
      ]
    );

    return result[0].toBoolean();
  }

  try_activeTokens(
    _vaultId: BigInt,
    _token: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "activeTokens",
      "activeTokens(uint256,address):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromAddress(_token)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  findBestPathExactIn(
    _fromToken: Address,
    _toToken: Address,
    _amountIn: BigInt
  ): ControllerViewSubgraph__findBestPathExactInResult {
    let result = super.call(
      "findBestPathExactIn",
      "findBestPathExactIn(address,address,uint256):(address,address[],uint256)",
      [
        ethereum.Value.fromAddress(_fromToken),
        ethereum.Value.fromAddress(_toToken),
        ethereum.Value.fromUnsignedBigInt(_amountIn)
      ]
    );

    return new ControllerViewSubgraph__findBestPathExactInResult(
      result[0].toAddress(),
      result[1].toAddressArray(),
      result[2].toBigInt()
    );
  }

  try_findBestPathExactIn(
    _fromToken: Address,
    _toToken: Address,
    _amountIn: BigInt
  ): ethereum.CallResult<ControllerViewSubgraph__findBestPathExactInResult> {
    let result = super.tryCall(
      "findBestPathExactIn",
      "findBestPathExactIn(address,address,uint256):(address,address[],uint256)",
      [
        ethereum.Value.fromAddress(_fromToken),
        ethereum.Value.fromAddress(_toToken),
        ethereum.Value.fromUnsignedBigInt(_amountIn)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new ControllerViewSubgraph__findBestPathExactInResult(
        value[0].toAddress(),
        value[1].toAddressArray(),
        value[2].toBigInt()
      )
    );
  }

  findBestPathExactOut(
    _fromToken: Address,
    _toToken: Address,
    _amountOut: BigInt
  ): ControllerViewSubgraph__findBestPathExactOutResult {
    let result = super.call(
      "findBestPathExactOut",
      "findBestPathExactOut(address,address,uint256):(address,address[],uint256)",
      [
        ethereum.Value.fromAddress(_fromToken),
        ethereum.Value.fromAddress(_toToken),
        ethereum.Value.fromUnsignedBigInt(_amountOut)
      ]
    );

    return new ControllerViewSubgraph__findBestPathExactOutResult(
      result[0].toAddress(),
      result[1].toAddressArray(),
      result[2].toBigInt()
    );
  }

  try_findBestPathExactOut(
    _fromToken: Address,
    _toToken: Address,
    _amountOut: BigInt
  ): ethereum.CallResult<ControllerViewSubgraph__findBestPathExactOutResult> {
    let result = super.tryCall(
      "findBestPathExactOut",
      "findBestPathExactOut(address,address,uint256):(address,address[],uint256)",
      [
        ethereum.Value.fromAddress(_fromToken),
        ethereum.Value.fromAddress(_toToken),
        ethereum.Value.fromUnsignedBigInt(_amountOut)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new ControllerViewSubgraph__findBestPathExactOutResult(
        value[0].toAddress(),
        value[1].toAddressArray(),
        value[2].toBigInt()
      )
    );
  }

  openOrdersLength(_vaultId: BigInt): BigInt {
    let result = super.call(
      "openOrdersLength",
      "openOrdersLength(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_vaultId)]
    );

    return result[0].toBigInt();
  }

  try_openOrdersLength(_vaultId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "openOrdersLength",
      "openOrdersLength(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_vaultId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  ordersLength(_vaultId: BigInt): BigInt {
    let result = super.call("ordersLength", "ordersLength(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(_vaultId)
    ]);

    return result[0].toBigInt();
  }

  try_ordersLength(_vaultId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "ordersLength",
      "ordersLength(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_vaultId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  priceMultiplier(_vaultId: BigInt): BigInt {
    let result = super.call(
      "priceMultiplier",
      "priceMultiplier(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_vaultId)]
    );

    return result[0].toBigInt();
  }

  try_priceMultiplier(_vaultId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "priceMultiplier",
      "priceMultiplier(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_vaultId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenAmounts(
    _vaultId: BigInt,
    _tokenId: BigInt
  ): Array<ControllerViewSubgraph__tokenAmountsResultValue0Struct> {
    let result = super.call(
      "tokenAmounts",
      "tokenAmounts(uint256,uint256):((address,uint256)[])",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromUnsignedBigInt(_tokenId)
      ]
    );

    return result[0].toTupleArray<
      ControllerViewSubgraph__tokenAmountsResultValue0Struct
    >();
  }

  try_tokenAmounts(
    _vaultId: BigInt,
    _tokenId: BigInt
  ): ethereum.CallResult<
    Array<ControllerViewSubgraph__tokenAmountsResultValue0Struct>
  > {
    let result = super.tryCall(
      "tokenAmounts",
      "tokenAmounts(uint256,uint256):((address,uint256)[])",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromUnsignedBigInt(_tokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<
        ControllerViewSubgraph__tokenAmountsResultValue0Struct
      >()
    );
  }

  tokenFees(
    _vaultId: BigInt,
    _token: Address
  ): ControllerViewSubgraph__tokenFeesResult {
    let result = super.call(
      "tokenFees",
      "tokenFees(uint256,address):(uint256,uint256,uint256,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromAddress(_token)
      ]
    );

    return new ControllerViewSubgraph__tokenFeesResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt()
    );
  }

  try_tokenFees(
    _vaultId: BigInt,
    _token: Address
  ): ethereum.CallResult<ControllerViewSubgraph__tokenFeesResult> {
    let result = super.tryCall(
      "tokenFees",
      "tokenFees(uint256,address):(uint256,uint256,uint256,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromAddress(_token)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new ControllerViewSubgraph__tokenFeesResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt()
      )
    );
  }

  tokenLength(_vaultId: BigInt): BigInt {
    let result = super.call("tokenLength", "tokenLength(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(_vaultId)
    ]);

    return result[0].toBigInt();
  }

  try_tokenLength(_vaultId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenLength",
      "tokenLength(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_vaultId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenMaxGas(_vaultId: BigInt, _tokenId: BigInt): BigInt {
    let result = super.call(
      "tokenMaxGas",
      "tokenMaxGas(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromUnsignedBigInt(_tokenId)
      ]
    );

    return result[0].toBigInt();
  }

  try_tokenMaxGas(
    _vaultId: BigInt,
    _tokenId: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenMaxGas",
      "tokenMaxGas(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromUnsignedBigInt(_tokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenMinimumDeposit(_vaultId: BigInt, _token: Address): BigInt {
    let result = super.call(
      "tokenMinimumDeposit",
      "tokenMinimumDeposit(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromAddress(_token)
      ]
    );

    return result[0].toBigInt();
  }

  try_tokenMinimumDeposit(
    _vaultId: BigInt,
    _token: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenMinimumDeposit",
      "tokenMinimumDeposit(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromAddress(_token)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenOpenOrdersLength(_vaultId: BigInt, _tokenId: BigInt): BigInt {
    let result = super.call(
      "tokenOpenOrdersLength",
      "tokenOpenOrdersLength(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromUnsignedBigInt(_tokenId)
      ]
    );

    return result[0].toBigInt();
  }

  try_tokenOpenOrdersLength(
    _vaultId: BigInt,
    _tokenId: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenOpenOrdersLength",
      "tokenOpenOrdersLength(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromUnsignedBigInt(_tokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenTradeLength(_vaultId: BigInt, _tokenId: BigInt): BigInt {
    let result = super.call(
      "tokenTradeLength",
      "tokenTradeLength(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromUnsignedBigInt(_tokenId)
      ]
    );

    return result[0].toBigInt();
  }

  try_tokenTradeLength(
    _vaultId: BigInt,
    _tokenId: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenTradeLength",
      "tokenTradeLength(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromUnsignedBigInt(_tokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokens(_vaultId: BigInt, _index: BigInt): Address {
    let result = super.call("tokens", "tokens(uint256,uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(_vaultId),
      ethereum.Value.fromUnsignedBigInt(_index)
    ]);

    return result[0].toAddress();
  }

  try_tokens(_vaultId: BigInt, _index: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("tokens", "tokens(uint256,uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(_vaultId),
      ethereum.Value.fromUnsignedBigInt(_index)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  tokensLength(_vaultId: BigInt): BigInt {
    let result = super.call("tokensLength", "tokensLength(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(_vaultId)
    ]);

    return result[0].toBigInt();
  }

  try_tokensLength(_vaultId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokensLength",
      "tokensLength(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_vaultId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  userGasAmounts(_user: Address): BigInt {
    let result = super.call(
      "userGasAmounts",
      "userGasAmounts(address):(uint256)",
      [ethereum.Value.fromAddress(_user)]
    );

    return result[0].toBigInt();
  }

  try_userGasAmounts(_user: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "userGasAmounts",
      "userGasAmounts(address):(uint256)",
      [ethereum.Value.fromAddress(_user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  vault(_vault: Address): i32 {
    let result = super.call("vault", "vault(address):(uint8)", [
      ethereum.Value.fromAddress(_vault)
    ]);

    return result[0].toI32();
  }

  try_vault(_vault: Address): ethereum.CallResult<i32> {
    let result = super.tryCall("vault", "vault(address):(uint8)", [
      ethereum.Value.fromAddress(_vault)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  vaultDetails(_vaultId: BigInt): ControllerViewSubgraph__vaultDetailsResult {
    let result = super.call(
      "vaultDetails",
      "vaultDetails(uint256):(string,string,string,address)",
      [ethereum.Value.fromUnsignedBigInt(_vaultId)]
    );

    return new ControllerViewSubgraph__vaultDetailsResult(
      result[0].toString(),
      result[1].toString(),
      result[2].toString(),
      result[3].toAddress()
    );
  }

  try_vaultDetails(
    _vaultId: BigInt
  ): ethereum.CallResult<ControllerViewSubgraph__vaultDetailsResult> {
    let result = super.tryCall(
      "vaultDetails",
      "vaultDetails(uint256):(string,string,string,address)",
      [ethereum.Value.fromUnsignedBigInt(_vaultId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new ControllerViewSubgraph__vaultDetailsResult(
        value[0].toString(),
        value[1].toString(),
        value[2].toString(),
        value[3].toAddress()
      )
    );
  }

  vaultId(_vault: Address): BigInt {
    let result = super.call("vaultId", "vaultId(address):(uint256)", [
      ethereum.Value.fromAddress(_vault)
    ]);

    return result[0].toBigInt();
  }

  try_vaultId(_vault: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("vaultId", "vaultId(address):(uint256)", [
      ethereum.Value.fromAddress(_vault)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  vaultTokensByOwner(
    _owner: Address
  ): Array<ControllerViewSubgraph__vaultTokensByOwnerResultValue0Struct> {
    let result = super.call(
      "vaultTokensByOwner",
      "vaultTokensByOwner(address):((address,uint256)[])",
      [ethereum.Value.fromAddress(_owner)]
    );

    return result[0].toTupleArray<
      ControllerViewSubgraph__vaultTokensByOwnerResultValue0Struct
    >();
  }

  try_vaultTokensByOwner(
    _owner: Address
  ): ethereum.CallResult<
    Array<ControllerViewSubgraph__vaultTokensByOwnerResultValue0Struct>
  > {
    let result = super.tryCall(
      "vaultTokensByOwner",
      "vaultTokensByOwner(address):((address,uint256)[])",
      [ethereum.Value.fromAddress(_owner)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<
        ControllerViewSubgraph__vaultTokensByOwnerResultValue0Struct
      >()
    );
  }

  vaults(_index: BigInt): Address {
    let result = super.call("vaults", "vaults(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(_index)
    ]);

    return result[0].toAddress();
  }

  try_vaults(_index: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("vaults", "vaults(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(_index)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  vaultsLength(): BigInt {
    let result = super.call("vaultsLength", "vaultsLength():(uint256)", []);

    return result[0].toBigInt();
  }

  try_vaultsLength(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("vaultsLength", "vaultsLength():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  viewOpenOrdersByToken(
    _vaultId: BigInt,
    _tokenId: BigInt
  ): Array<ControllerViewSubgraph__viewOpenOrdersByTokenResultValue0Struct> {
    let result = super.call(
      "viewOpenOrdersByToken",
      "viewOpenOrdersByToken(uint256,uint256):((uint256,uint256,uint256,uint256,address[2],uint256[3],uint256[])[])",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromUnsignedBigInt(_tokenId)
      ]
    );

    return result[0].toTupleArray<
      ControllerViewSubgraph__viewOpenOrdersByTokenResultValue0Struct
    >();
  }

  try_viewOpenOrdersByToken(
    _vaultId: BigInt,
    _tokenId: BigInt
  ): ethereum.CallResult<
    Array<ControllerViewSubgraph__viewOpenOrdersByTokenResultValue0Struct>
  > {
    let result = super.tryCall(
      "viewOpenOrdersByToken",
      "viewOpenOrdersByToken(uint256,uint256):((uint256,uint256,uint256,uint256,address[2],uint256[3],uint256[])[])",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromUnsignedBigInt(_tokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<
        ControllerViewSubgraph__viewOpenOrdersByTokenResultValue0Struct
      >()
    );
  }

  viewOpenOrdersInRange(
    _vaultId: BigInt,
    _start: BigInt,
    _end: BigInt
  ): Array<ControllerViewSubgraph__viewOpenOrdersInRangeResultValue0Struct> {
    let result = super.call(
      "viewOpenOrdersInRange",
      "viewOpenOrdersInRange(uint256,uint256,uint256):((uint256,uint256,uint256,uint256,address[2],uint256[3],uint256[])[])",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromUnsignedBigInt(_start),
        ethereum.Value.fromUnsignedBigInt(_end)
      ]
    );

    return result[0].toTupleArray<
      ControllerViewSubgraph__viewOpenOrdersInRangeResultValue0Struct
    >();
  }

  try_viewOpenOrdersInRange(
    _vaultId: BigInt,
    _start: BigInt,
    _end: BigInt
  ): ethereum.CallResult<
    Array<ControllerViewSubgraph__viewOpenOrdersInRangeResultValue0Struct>
  > {
    let result = super.tryCall(
      "viewOpenOrdersInRange",
      "viewOpenOrdersInRange(uint256,uint256,uint256):((uint256,uint256,uint256,uint256,address[2],uint256[3],uint256[])[])",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromUnsignedBigInt(_start),
        ethereum.Value.fromUnsignedBigInt(_end)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<
        ControllerViewSubgraph__viewOpenOrdersInRangeResultValue0Struct
      >()
    );
  }

  viewOrder(
    _vaultId: BigInt,
    _orderId: BigInt
  ): ControllerViewSubgraph__viewOrderResultValue0Struct {
    let result = super.call(
      "viewOrder",
      "viewOrder(uint256,uint256):((uint256,uint256,uint256,uint256,address[2],uint256[3],uint256[]))",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromUnsignedBigInt(_orderId)
      ]
    );

    return changetype<ControllerViewSubgraph__viewOrderResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_viewOrder(
    _vaultId: BigInt,
    _orderId: BigInt
  ): ethereum.CallResult<ControllerViewSubgraph__viewOrderResultValue0Struct> {
    let result = super.tryCall(
      "viewOrder",
      "viewOrder(uint256,uint256):((uint256,uint256,uint256,uint256,address[2],uint256[3],uint256[]))",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromUnsignedBigInt(_orderId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<ControllerViewSubgraph__viewOrderResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  viewOrders(
    _vaultId: BigInt,
    _orderIds: Array<BigInt>
  ): Array<ControllerViewSubgraph__viewOrdersResultValue0Struct> {
    let result = super.call(
      "viewOrders",
      "viewOrders(uint256,uint256[]):((uint256,uint256,uint256,uint256,address[2],uint256[3],uint256[])[])",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromUnsignedBigIntArray(_orderIds)
      ]
    );

    return result[0].toTupleArray<
      ControllerViewSubgraph__viewOrdersResultValue0Struct
    >();
  }

  try_viewOrders(
    _vaultId: BigInt,
    _orderIds: Array<BigInt>
  ): ethereum.CallResult<
    Array<ControllerViewSubgraph__viewOrdersResultValue0Struct>
  > {
    let result = super.tryCall(
      "viewOrders",
      "viewOrders(uint256,uint256[]):((uint256,uint256,uint256,uint256,address[2],uint256[3],uint256[])[])",
      [
        ethereum.Value.fromUnsignedBigInt(_vaultId),
        ethereum.Value.fromUnsignedBigIntArray(_orderIds)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<
        ControllerViewSubgraph__viewOrdersResultValue0Struct
      >()
    );
  }

  viewTrade(
    _vault: Address,
    _tokenId: BigInt,
    _tradeId: BigInt
  ): Array<ControllerViewSubgraph__viewTradeResultValue0Struct> {
    let result = super.call(
      "viewTrade",
      "viewTrade(address,uint256,uint256):((uint256,uint256,uint256,uint256,address[2],uint256[3],uint256[])[])",
      [
        ethereum.Value.fromAddress(_vault),
        ethereum.Value.fromUnsignedBigInt(_tokenId),
        ethereum.Value.fromUnsignedBigInt(_tradeId)
      ]
    );

    return result[0].toTupleArray<
      ControllerViewSubgraph__viewTradeResultValue0Struct
    >();
  }

  try_viewTrade(
    _vault: Address,
    _tokenId: BigInt,
    _tradeId: BigInt
  ): ethereum.CallResult<
    Array<ControllerViewSubgraph__viewTradeResultValue0Struct>
  > {
    let result = super.tryCall(
      "viewTrade",
      "viewTrade(address,uint256,uint256):((uint256,uint256,uint256,uint256,address[2],uint256[3],uint256[])[])",
      [
        ethereum.Value.fromAddress(_vault),
        ethereum.Value.fromUnsignedBigInt(_tokenId),
        ethereum.Value.fromUnsignedBigInt(_tradeId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<
        ControllerViewSubgraph__viewTradeResultValue0Struct
      >()
    );
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _controller(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _resolver(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetContractsCall extends ethereum.Call {
  get inputs(): SetContractsCall__Inputs {
    return new SetContractsCall__Inputs(this);
  }

  get outputs(): SetContractsCall__Outputs {
    return new SetContractsCall__Outputs(this);
  }
}

export class SetContractsCall__Inputs {
  _call: SetContractsCall;

  constructor(call: SetContractsCall) {
    this._call = call;
  }

  get _controller(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _resolver(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class SetContractsCall__Outputs {
  _call: SetContractsCall;

  constructor(call: SetContractsCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}