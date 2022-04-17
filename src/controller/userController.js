const userModel = require('../models/userModel')

const creatUser = async function(req,res) {
    let data = req.body
    let saveData = await userModel.create(data)
    res.send({saveData})
};

const getUserData = async function(req,res) {
    let allUsers = await userModel.find()
    res.send({allUsers})
};


module.exports = {
    creatUser,
    getUserData
};

// module.exports.creatUser = creatUser
// module.exports.getUserData = getUserData
// module.exports.creatBooks = creatBooks
// module.exports.getBooksData = getBooksData