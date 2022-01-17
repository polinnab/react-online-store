const express = require('express')
const cors = require('cors')
const {v4} = require('uuid')
const path = require('path')
const app = express()
const fs = require('fs');
const brandsFile = './database/categories/brands.json';
const typesFile = './database/categories/types.json';
const colorsFile = './database/categories/colors.json';
const productsFile = './database/products/products.json';
const usersFile = './database/users/users.json';
const brands = JSON.parse(fs.readFileSync(brandsFile));
const types = JSON.parse(fs.readFileSync(typesFile));
const colors = JSON.parse(fs.readFileSync(colorsFile));
const users = JSON.parse(fs.readFileSync(usersFile));
const products = JSON.parse(fs.readFileSync(productsFile))
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5001

let PRODUCTS = [
    {
        id: v4(),
        name: "Sneakers",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        price: "300.99",
        images: [
            {
                big: "./upload/image-product-1.jpg",
                thumb: "./upload/image-product-1-thumbnail.jpg"
            },
            {
                big: "./upload/image-product-2.jpg",
                thumb: "./upload/image-product-2-thumbnail.jpg"
            }
        ],
        isFavourable: false

    },
    {
        id: v4(),
        name: "Sneakers",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        price: "300.99",
        images: [
            {
                big: "./upload/image-product-1.jpg",
                thumb: "./upload/image-product-1-thumbnail.jpg"
            },
            {
                big: "./upload/image-product-2.jpg",
                thumb: "./upload/image-product-2-thumbnail.jpg"
            }
        ],
        isFavourable: false

    }
]

// GET

app.get('/api/products', (req, res) => {
    res.status(200).json(products)
})

app.get('/api/types', (req, res) => {
    res.status(200).json(types)
})

app.get('/api/brands', (req, res) => {
    res.status(200).json(brands)
})

app.get('/api/colors', (req, res) => {
    res.status(200).json(colors)
})

// POST

app.post('/api/types', (req, res) => {
    const type = {...req.body, id: v4()}
    fs.writeFileSync(productsFile, type)
    res.status(201).json(type)
})

app.post('/api/products', (req, res) => {
    const product = {...req.body, id: v4()}
    fs.writeFileSync(productsFile, product)
    res.status(201).json(product)
})

// DELETE

app.delete('/api/products', (req, res) => {
    PRODUCTS = PRODUCTS.filter(product => product.id !== req.params.id)
    res.status(200).json({massage: 'Product has deleted'})
})

// PUT

app.put('/api/products/:id', (req, res) => {
    const index = PRODUCTS.findIndex(product => product.id === req.params.id)
    PRODUCTS[index] = req.body
    res.status(200).json(PRODUCTS[index])
})



app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))