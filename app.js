const express = require('express')
const dotenv = require('dotenv')

//ROUTES
const productRoutes = require('./routes/productRoutes')

dotenv.config()

const app = express()


app.use('/products', productRoutes)

app.get('/', (req, res, next) => {
    res.send('Hello world')
})

module.exports = app