const req = require("express/lib/request")
const userModel= require("../models/userModel")


const createUser = async function(req, res) {
    let data = req.body
    let saveUser = await userModel.create(data)
    res.send({status: true, data: saveUser})

    

}

module.exports = {
    createUser
}