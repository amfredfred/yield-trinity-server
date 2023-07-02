const ETH_MAINNET = [
    {
        "chainId": 1,
        "address": "0x4d224452801ACEd8B2F0aebE155379bb5D594381",
        "name": "ApeCoin",
        "symbol": "APE",
        "decimals": 18,
        "logoURI": "https://assets.coingecko.com/coins/images/24383/small/apecoin.jpg?1647476455",
    }, {
        "name": "Tether USD",
        "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        "symbol": "USDT",
        "decimals": 6,
        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    }
]

const BSC_MAINNET = require('../ethereum/tokensByLists/bsc-mainnet')
const POLYGON_MAINNET = require('../ethereum/tokensByLists/polygon-mainnet')

const BSC_TESTNET = [
    { "address": "0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8", "name": "BTCB Token", "symbol": "BTCB", "decimals": 18, "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/2837.png" },
    { "address": "0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867", "name": "Dai Token", "symbol": "DAI", "decimals": 18, logoURI: "https://raw.githubusercontent.com/compound-finance/token-list/master/assets/asset_DAI.svg" },
    { "address": "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd", "name": "USDT Token", "symbol": "USDT", "decimals": 18, "logoURI": "https://raw.githubusercontent.com/compound-finance/token-list/master/assets/asset_USDC.svg" },
    { "address": "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd", "name": "WBNB Token", "symbol": "WBNB", "decimals": 18, "logoURI": "https://raw.githubusercontent.com/compound-finance/token-list/master/assets/ctoken_wbtc.svg" },
    { "address": "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7", "name": "BUSD Token", "symbol": "BUSD", "decimals": 18, "logoURI": "https://raw.githubusercontent.com/compound-finance/token-list/master/assets/asset_USDC.svg" },
]

module.exports = {
    [97]: BSC_TESTNET,
    [56]: BSC_MAINNET,
    [1]: ETH_MAINNET,
    [137]: POLYGON_MAINNET
}
