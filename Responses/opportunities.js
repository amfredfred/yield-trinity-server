const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const OpportunityResource = (post) => ({
    difference: post?.difference,
    dex: post?.dex,
    path: post?.path,
    pathFiltered: post?.pathFiltered,
    pathName: post?.pathName,
    amountIn: post?.amountIn,
    amountOut: post?.amountOut,
    chainId:post?.chainId,
    "createdAt": post?.createdAt ? { relative: dayjs(post?.createdAt).fromNow(), absolute: post?.createdAt } : '',
    "updatedAt": post?.createdAt ? { relative: dayjs(post?.updatedAt).fromNow(), absolute: post?.createdAt } : ''
})

const OpportunityCollection = (posts = []) => posts.map(post => OpportunityResource(post))

module.exports.OpportunityResource = OpportunityResource
module.exports.OpportunityCollection = OpportunityCollection
