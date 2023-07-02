"use strict"
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
app.use(express.json())
const ethers = require('ethers')
const {
    EtherInstances,
    AVAILABLE_CHAINS,
    addresses,
    PRICE_ORACLE_ABI
} = require('./ethereum')
const { fmWei, toWei, priceDifference, strEqual } = require('./Helpers')
const Opportunity = require('./Models/opportunity-model')


app.use("/opportunity", require('./Routes/dex-opportunities'))
// app.set('json spaces', 1)

mongoose.connect(process.env.DB_URL)
const DB = mongoose.connection
DB.on('error', error => console.log('DB |:| Connection Errored!'))
DB.once('open', opened => console.log(`DB |:| Connected Successfully! ${process.env.DB_URL}`));

async function execute(props) {
    const { path, pathMethod, pathFiltered, pathName, instance, dex, chain } = props
    let output = 0
    const amountIn = toWei(1, path?.[0]?.decimals)
    let input = Number(fmWei(amountIn, path[0]?.decimals));

    const [outputs] = await Promise.allSettled([instance.getAmountsOut(amountIn, pathFiltered)])

    const opportunity = {
        $set: {
            pathName,
            dex,
            chainId: chain,
            path,
            pathFiltered,
            input: input
        }
    }


    if (outputs.status === 'fulfilled') {
        const outValz = typeof outputs?.value === 'object' ? outputs?.value?.[outputs?.value?.length - 1] : outputs?.value
        output = Number(fmWei(outValz, path[path.length - 1].decimals))
        const { subtract: potnetialProfit, percentage } = priceDifference(output, input)
        if (pathMethod === 'T') opportunity['difference'] = { potnetialProfit, percentage }
        opportunity['amountOut'] = output
        if (output > input && pathMethod === 'T') {
            await Opportunity.updateOne({ pathName, chainId: chain }, opportunity, { upsert: true, multi: true })
        }
        return { chain, input, output, pathName: String(pathName), dex: dex?.names }
    }
    else return { "status": outputs?.status, pathName, "dex name": dex?.names, chain }

};


const PathFinder = (chain) => {
    const baseTokens = ["MATIC", "WBNB", "WETH", "USDT", "QUICK", "UNI", "BUSD", "DAI"]
    const baseTokensList = []
    let path = addresses[chain]?.['tokens']?.map(token => {
        if (baseTokens?.includes(token?.symbol)) { baseTokensList.push(token); return }
        return
    })

    path = addresses[chain]?.['tokens']?.sort((l, r) => 0.5 - Math.random())
    path = addresses[chain]?.['tokens']?.sort((l, r) => 1.5 - Math.random())
    path = addresses[chain]?.['tokens']?.sort((l, r) => 2.5 - Math.random())
    path = addresses[chain]?.['tokens']?.sort((l, r) => 3.5 - Math.random())
    path?.reverse()
    path = path.slice(0, Number(Math.random() * 3) + 2)
    let finalPath = path.map((token, index) => token) || []
    let pathMethod = ["T", "S"].sort(() => 0.5 - Math.random())[0]

    const executePath = baseTokensList.map((baseToken, index) => {
        const tempo = []
        finalPath?.map((finPath, i) => {
            if (i === 0)
                finPath = baseToken
            if (pathMethod === "T")
                if (i + 1 === finalPath.length)
                    if (finalPath.length === 4) {
                        if (baseTokens.includes(finPath?.symbol)) tempo[i] = finPath
                        else tempo[i] = baseToken
                        return
                    }
            tempo[i] = finPath
            return finPath
        })
        return tempo
    })

    return { pathMethod, executePath }
}


(async => {
    setInterval(() => {
        const initial = AVAILABLE_CHAINS.map(async (chain, index) => {
            if (EtherInstances[chain]) {
                const { pathMethod, executePath } = PathFinder(chain)
                addresses[chain]['dexchnages'].map((dex, index) => {
                    const instance = new ethers.Contract(dex?.router, PRICE_ORACLE_ABI, EtherInstances[chain])//addresses[chain]['price_contract_address']
                    executePath?.map(path => {
                        const pathName = new Array
                        const pathFiltered = new Array
                        path?.map(token => { pathFiltered.push(token.address); pathName.push(token?.symbol) })
                        const constStructTrade = { path, pathMethod, pathFiltered, pathName, instance, dex, chain }
                        if (pathMethod === "T")
                            execute(constStructTrade).then(data => { console.log(data) }).catch(err=>console.log("ERROR OCCURED"))
                    })
                })
            }
        })
    }, 1000)
})();



app.listen(1000)