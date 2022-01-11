const express = require('express')
const cors = require('cors')
const {v4} = require('uuid')
const path = require('path')
const app = express()
app.use(cors())
const PORT = process.env.PORT || 5001

const PRODUCTS = [
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
    res.status(200).json(PRODUCTS)
})



app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))