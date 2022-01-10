const express = require('express')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 5001


app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))