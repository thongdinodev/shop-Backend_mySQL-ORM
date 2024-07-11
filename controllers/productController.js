const { where } = require('sequelize')
const Product = require('../models/productModel')

const handleTryCatchError = require('../utils/handleTryCatchError')

exports.getAllProducts = async (req, res, next) => {
    
    try {
        const products = await Product.findAll()
        res.status(200).json({
            status: 'success',
            data: {
                products
            }
        })
    } catch (error) {
        handleTryCatchError(res, 400, error.errors[0].message)
    }
}

exports.createProduct = async (req, res, next) => {
    const name = req.body.name
    const price = req.body.price
    const description = req.body.description
    const imageUrl = req.body.imageUrl

    const inputData = {name, price, description, imageUrl}
    try {    
        const newProduct = await Product.create(inputData)

        res.status(201).json({
            status: 'success',
            newProduct: {
                newProduct
            }
        })
    } catch (error) {
        handleTryCatchError(res, 400, error.errors[0].message)
    }
}

exports.getProduct = async (req, res, next) => {
    const prodId = parseInt(req.params.productId)
    try {
        const product = await Product.findByPk(prodId)
        if (!product) {
            handleTryCatchError(res, 400, `Can't find any product with id: ${prodId}`)
        } else {
            res.status(200).json({
                status: 'success',
                data: {
                    product
                }
            })
        }
        
    } catch (error) {
        handleTryCatchError(res, 400, error)
    }
}

exports.updateProduct = async (req, res, next) => {
    const prodId = parseInt(req.params.productId)

    const updateName = req.body.name
    const updatePrice = req.body.price
    const updateDescription = req.body.description
    const updateImageUrl = req.body.imageUrl

    try {
        const product = await Product.findByPk(prodId)
        if (!product) {
            handleTryCatchError(res, 400, `Can't find any product with id: ${prodId} to edit`)
        } else {
            product.name = updateName ? updateName : product.name
            product.price = updatePrice ? updatePrice : product.price
            product.description = updateDescription ? updateDescription : product.description
            product.imageUrl = updateImageUrl ? updateImageUrl : product.imageUrl
            await product.save()

            res.status(200).json({
                status: 'success',
                message: 'success to update product id: ' + prodId,
                data: {
                    product
                }
            })
        }
    } catch (error) {
        handleTryCatchError(res, 400, error)
    }

}

exports.deleteProduct = async (req, res, next) => {
    const prodId = parseInt(req.params.productId)
    try {
        const productDeleted = await Product.destroy({where: {id: prodId}})
        if (!productDeleted) {
            handleTryCatchError(res, 400, `Can't find any product with id: ${prodId}`)
        } else {
            res.status(204).json({
                status: 'success',
                message: 'Success delete product'
            })
        }
    } catch (error) {
        handleTryCatchError(res, 400, error)
    }
}
