const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, minLength: 1, required: true },
  description: { type: String },
  url: { type: String, required: true },
});

module.exports = mongoose.model('Category', categorySchema);
