const express = require('express')
const route = express.Router()
const opportunities = require('../Models/opportunity-model')
const { OpportunityCollection } = require('../Responses/opportunities')


route.post('/', async (req, res) => {
    const available = opportunities.find({})
    const [allOpportunities] = await Promise.all([
        available.sort([['updatedAt', 'descending']]).exec()
    ])
    const etherscrape = OpportunityCollection(allOpportunities)
    console.log(req?.body, " HEY FRED FRED FRED FRED\n\n\nHEY EY")
    res.json(etherscrape)
})

route.get('/get', async (req, res) => {
    const available = opportunities.find({})
    const [allOpportunities] = await Promise.all([
        available.sort([['updatedAt', 'descending']]).exec()
    ])
    const etherscrape = OpportunityCollection(allOpportunities)
    console.log(req?.body, " HEY FRED FRED FRED FRED\n\n\nHEY EY")
    res.json(etherscrape)
})



module.exports = route