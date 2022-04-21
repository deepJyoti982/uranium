const productModel = require('../models/productModel')

const createProduct = async function(req,res) {
    let productDetails = req.body
    let SaveProduct = await productModel.create(productDetails)
    res.send({status: true, data: SaveProduct})
}

module.exports = {
    createProduct
}