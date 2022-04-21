const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const productController = require('../controllers/productController')
const orderController = require('../controllers/orderController')


router.post('/create-products',productController.createProduct)
router.post('/create-users',userController.createUser)



module.exports = router;