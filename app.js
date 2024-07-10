const express = require('express')
const dotenv = require('dotenv')

const sequelize = require('./utils/database')

//ROUTES
const productRoutes = require('./routes/productRoutes')

dotenv.config()

const app = express()

app.use(express.json())

app.use('/api/products', productRoutes)

// Synchronizing all models at once, 
// creates the table if it doesn't exist (and does nothing if it already exists)
sequelize
    .sync()
    .then(() => {
        console.log('Created default table');
    })
    .catch(error => {
        console.log(error);
    })

module.exports = app