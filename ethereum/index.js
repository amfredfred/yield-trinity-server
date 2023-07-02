const ethers = require('ethers')
const addresses = require('./addresses')
const { PRICE_ORACLE_ABI } = require('../constants/abi')
// const tokens  = require('./tokens')



module.exports.networks = {
    BSC_TESTNET: 97,
    ETH_MAINNET: 1,
    BSC_MAINNET: 56,
    POLYGON_MAINNET: 137
}

module.exports.rpcs = {
    97: "https://rpc.ankr.com/bsc_testnet_chapel/",
    1: "https://rpc.ankr.com/eth/",
    56: "https://rpc.ankr.com/bsc/",
    137: "https://rpc.ankr.com/polygon/"
}

module.exports.EtherInstances = {
    97: new ethers.JsonRpcProvider('https://rpc.ankr.com/bsc_testnet_chapel'),
    // 1: new ethers.AnkrProvider(),
    56: new ethers.JsonRpcProvider('https://rpc.ankr.com/bsc'),
    137: new ethers.JsonRpcProvider('https://rpc.ankr.com/polygon')
}

module.exports.addresses = addresses
module.exports.PRICE_ORACLE_ABI = PRICE_ORACLE_ABI
module.exports.AVAILABLE_CHAINS = [this.networks.POLYGON_MAINNET, this.networks.BSC_MAINNET, this.networks.ETH_MAINNET, this.networks.BSC_TESTNET];

// module.exports.tokens = tokens
 