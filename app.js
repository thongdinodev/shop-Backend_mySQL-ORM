const express = require('express')
const dotenv = require('dotenv')

// DATABASE AND MODEL
const sequelize = require('./utils/database')
const Product = require('./models/productModel')
const User = require('./models/userModel')
const Cart = require('./models/cartModel')
const CartItem = require('./models/cart-ItemModel')

// ROUTES
const productRoutes = require('./routes/productRoutes')

dotenv.config()

const app = express()

app.use(express.json())

app.use('/api/products', productRoutes)

// set RELATIONAL to table
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' }) //mqh: 1-1, FOREIN KEY ở Product
User.hasMany(Product) //mqh: 1-N, FOREIN KEY ở Product

User.hasOne(Cart) //mqh: 1-1, FOREIN KEY ở Cart
Cart.belongsTo(User) //mqh: 1-1, FOREIN KEY ở Cart

Cart.belongsToMany(Product) //mqh: 1-N, FOREIN KEY ở Cart
Product.belongsToMany(Cart) //mqh: 1-N, FOREIN KEY ở Product

// Synchronizing all models at once, 
// creates the table if it doesn't exist (and does nothing if it already exists)
sequelize
    .sync({force: true})
    .then(() => {
        console.log('Created default table');
    })
    .catch(error => {
        console.log(error);
    })

module.exports = app