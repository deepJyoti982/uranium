const batchModel = require('../models/batchModel')

const createBatches = async function(req, res){
    let data = req.body
    if(! await batchModel.exists(data)){
        let createdBatch = await batchModel.create(data)
        res.send({msg: createdBatch})
    } else{
        res.send({msg: "This batch already exists"})
    }
}

module.exports = {
    createBatches
}