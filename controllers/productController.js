const Product = require('../models/productModel')

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
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}

exports.createProduct = async (req, res, next) => {
    try {
        const name = req.body.name
        const price = req.body.price
        const description = req.body.description
        const product = await Product.create({
            name,
            price,
            description
        })
        res.status(201).json({
            status: 'success',
            data: {
                product
            }
        })
    } catch (error) {
        res.status(404).json({
            message: {
                error: error.errors[0].message
            }
        })
    }
}
