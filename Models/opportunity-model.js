const mongoose = require('mongoose')

const OpportunitySchema = mongoose.Schema({
    pathName: { type: Array },
    dex: { type: Object },
    path: { type: Array },
    chainId: { type: Number },
    amountIn: { type: Number },
    amountOut: { type: Number },
    path: { type: Object },
    pathFiltered: { type: Object },
    difference: { type: Object }
}, { timestamps: true })


module.exports = mongoose.model('Opportunity', OpportunitySchema)