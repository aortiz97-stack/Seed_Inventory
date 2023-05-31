const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Item = require('../models/item');
const Category = require('../models/category');

exports.item_page = asyncHandler(async (req, res, next) => {
  // const item = await Item.findById(req.params.id).exec();
  // const allCategoryObjects = item.category.map(async (id) => Category.findById(id));

  let [item, allCategoryObjects] = await Promise.all([
    Item.findById(req.params.id).exec(),
    Item.findById(req.params.id).exec(),
  ]);

  allCategoryObjects = await Promise.all(
    allCategoryObjects.category.map(async (id) => {
      const foundCategory = await Category.findById(id);
      return foundCategory;
    }),
  );

  res.render('item_page', {
    item,
    categoryObjectList: allCategoryObjects,
  });
});
