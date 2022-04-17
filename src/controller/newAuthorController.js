const newAuthorModel = require('../models/newAuthorModel')

const createNewAuthor = async function(req,res) {
    let newAuthor = req.body
    let saveAuthor = await newAuthorModel.create(newAuthor)
    res.send({saveAuthor})
}

module.exports = {
    createNewAuthor  
}