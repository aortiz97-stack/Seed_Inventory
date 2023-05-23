const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, minLength: 1, required: true },
  description: { type: String },
});

categorySchema.virtual('url').get(function () {
  return `/category/${this._id}`;
});

module.exports = mongoose.model('Category', categorySchema);
