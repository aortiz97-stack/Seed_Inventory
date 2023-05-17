const mongoose = require('mongoose');
const CategoryModel = require('./category');

const { Schema } = mongoose;

const itemSchema = new Schema({
  name: { type: String, minLength: 1, required: true },
  description: { type: String },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category', default: CategoryModel().find({ name: 'Other' }).exec()._id }],
  price: { type: Number, min: 0, required: true },
  number_in_stock: { type: Number, min: 0, required: true },
});

itemSchema.virtual('url').get(function () {
  return `/category/${this.category[0]._id}/${this._id}`;
});

module.exports = mongoose.model('Item', itemSchema);
