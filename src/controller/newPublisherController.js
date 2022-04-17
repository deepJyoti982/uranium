const newPublisherModel = require('../models/newPublisherModel')

const createPublisher = async function(req,res) {
    let newPublisher = req.body
    let savePublisher = await newPublisherModel.create(newPublisher)
    res.send({savePublisher})
}

module.exports = {
    createPublisher
}