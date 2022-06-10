import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts"
import { NewRound } from "../generated/ChainlinkOracle/ChainlinkOracle"
import { Oracle } from "../generated/ChainlinkOracle/Oracle"
import { ERC20Meta } from "../generated/schema"
import { fetchERC20Meta, fetchController } from "./controller"


const USDC = Address.fromString("0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174")
const WBTC = Address.fromString("0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6")
const ORACLE_ADDRESS = Address.fromString("0xB85fEe06B1b6a84c5Df0A0e15aEe9810b086EDBB")

export function fetchOracleContract(): Oracle {
    return Oracle.bind(ORACLE_ADDRESS)
}
const PRICE_PRECISION = BigInt.fromI32(1000000).toBigDecimal()

export function updateERC20Price(address: Address): ERC20Meta {
    const oracle = fetchOracleContract()
    let erc20 = fetchERC20Meta(address)
    erc20.priceUSD = oracle.getRateUSD(address).toBigDecimal().div(PRICE_PRECISION)
    erc20.totalValueUSD = erc20.totalBalance.times(erc20.priceUSD)
    erc20.save()
    return erc20 as ERC20Meta
}

export function updateAllERC20Price(): void {
    let controller = fetchController()
    controller.totalValueUSD = BigDecimal.zero()

    const tokens = controller.erc20
    if(tokens !== null) {
        for(let i = 0; i < tokens.length; i++) {
            log.debug("tokens {}", [tokens[i]])
            const erc20 = updateERC20Price(Address.fromString(tokens[i]))
            controller.totalValueUSD = controller.totalValueUSD.plus(erc20.totalValueUSD)
        }
    }

    controller.save()
}

export function handleNewRound(event: NewRound): void {
    // fetchERC20Meta(USDC)
    // fetchERC20Meta(WBTC)
    updateAllERC20Price()
}