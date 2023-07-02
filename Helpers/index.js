
const ethers = require('ethers')
// is a valid address
module.exports.isAddress = (val) => ethers.isAddress(val)

// wait/sleep
module.exports.wait = /*@devfred*/ async (seconds) => new Promise((resolved) => setTimeout(() => resolved('continue'), Number(seconds) * 1000 || 1000))

// to big number
module.exports.toBN = (val) => ethers.BigNumber.from(val)

// from wei
module.exports.fmWei = (val, decimals = 18) => {
    if (!val) return 0
    return ethers.formatUnits(String(val), decimals)
}

// to wei
module.exports.toWei = (val, decimals = 18) => {
    if (!val || !decimals) return ethers.parseUnits('0', 18)
    return ethers.parseUnits(String(val), decimals)
}

module.exports.sub = (val, val1) => Number(val) - Number(val1)

// to uppercase
module.exports.toUpper = (val) => String(String(val)?.toUpperCase())

// to lowecasse
module.exports.toLower = (valg) => String(val?.toLowerCase())

// is equal
module.exports.strEqual = (val, val1)=> this.toUpper(val) === this.toUpper(val1)

// price difference
module.exports.priceDifference = (val, val2) => {
    const oldp = Number(val)
    const newp = Number(val2)
    const subtract = this.sub(oldp, newp);
    const addition = (oldp + newp) / 2
    const division = subtract / addition
    const percentage = (division * 100)
    return { subtract, percentage }
}