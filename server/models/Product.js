const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = mongoose.model(
  'Product',
  new Schema({
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    description: { type: String, default: null },
    category: { type: String, default: 'General' },
    createdAt: { type: Date, default: Date.now },
  })
)