const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router
    .route('/')
    .get(productController.getAllProducts)

router
    .route('/')
    .post(productController.createProduct)
    
router
    .route('/:productId')
    .get(productController.getProduct)

router
    .route('/:productId')
    .patch(productController.updateProduct)    

router
    .route('/:productId')
    .delete(productController.deleteProduct)   

module.exports = router