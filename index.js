require('dotenv').config()
const express = require('express')
const app = express()
require('./server/config/mongo')

// Settings 
app.use(express.static(__dirname + '/public'))
app.use(express.json())

// Routes
app.use('/api/products', require('./server/routes/product'))

// Server
const PORT = 3000
app.listen(PORT, () => {
  console.log('Server listen on port', PORT)
})