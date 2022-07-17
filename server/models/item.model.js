const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, "Name is required"]
  },
  price: {
    type: Number, 
    required: [true, "Price is required"]
  },
  isAvailable: {
    type: Boolean, 
    required: [true, "isAvailable is required"],
  },
  comments: {
    type: String
  },
  category: {
    type: String,
    required: [true, "Category is required"]
  }
}, { timestamps: true })

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;