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
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3000
app.listen(PORT, HOST, () => {
  console.log('Server listen on port', PORT)
})