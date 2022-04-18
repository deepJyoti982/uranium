const developerModel = require('../models/developerModel')
const devModel = require('../models/developerModel')

const createDevData = async function(req,res) {
    let devData = req.body
    let saveDevData = await devModel.create(devData)
    res.send({saveDevData})
}

const scholarDevFemale = async function(req,res) {
    let selectDev = await devModel.find({gender:"female",percentage:{$gte:70}}).select({name:1,_id:0})
    if (selectDev){
        res.send({selectDev})
    } else{
        res.send({msg: "No such candidate exists"})
    }
}

const developers = async function(req,res){
    let percent = req.query.percentage;
    let prm = req.query.program;
    let developer = await devModel.find({ $and: [{ percentage: { $gte: percent } }, { program: prm }] })
    res.send({msg:developer})
}


module.exports = {
    createDevData,
    scholarDevFemale,
    developers
}