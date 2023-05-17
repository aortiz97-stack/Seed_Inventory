const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, minLength: 1, required: true },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, default: 'Other' },
  price: { type: Number, min: 0, required: true },
  number_in_stock: { type: Number, min: 0, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model('Item', itemSchema);
