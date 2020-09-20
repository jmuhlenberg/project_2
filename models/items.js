const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String},
  image: {type: String}
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
