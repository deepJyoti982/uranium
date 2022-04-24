const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const productController = require('../controllers/productController')
const orderController = require('../controllers/orderController')
const middleware = require('../middlewares/commonMiddlewares')


router.post('/create-products', productController.createProduct)
router.post('/create-users', middleware.validateHeader, userController.createUser)
router.post('/create-order', middleware.validateHeader, orderController.createOrder)


module.exports = router;