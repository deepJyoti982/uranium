const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
// const BookController= require("../controllers/bookController")
const userController= require("../controllers/userController")
const middWare = require('../middWare/middWare')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.get("/basicRoute", middWare.mid1, userController.basicode)

// router.get("/getUsersData", middWare.mid2, UserController.getBooksData)

// router.post("/createBook", BookController.createBook  )

// router.get("/getBooksData", BookController.getBooksData)

// router.post("/updateBooks", BookController.updateBooks)
// router.post("/deleteBooks", BookController.deleteBooks)

//MOMENT JS
// const moment = require('moment');
// router.get("/dateManipulations", function (req, res) {
    
//     // const today = moment();
//     // let x= today.add(10, "days")

//     // let validOrNot= moment("29-02-1991", "DD-MM-YYYY").isValid()
//     // console.log(validOrNot)
    
//     const dateA = moment('01-01-1900', 'DD-MM-YYYY');
//     const dateB = moment('01-01-2000', 'DD-MM-YYYY');

//     let x= dateB.diff(dateA, "days")
//     console.log(x)

//     res.send({ msg: "all good"})
// })

module.exports = router;