const mongoose = require('mongoose')

const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb://127.0.0.1:27017/crud-products', options)
  .then(() => console.log('Database is connected'))
  .catch(error => console.error(error))