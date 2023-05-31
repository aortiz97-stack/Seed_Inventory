const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Category = require('../models/category');
const Item = require('../models/item');

exports.home_page = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).exec();
  res.render('index', {
    categoryList: categories,
  });
});

exports.category_page = asyncHandler(async (req, res, next) => {
  const [category, allItems] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }),
  ]);
  res.render('category_page', {
    category: category,
    items: allItems,
  });
});

exports.create_category_get = asyncHandler(async (req, res, next) => {
  res.render('category_form_page', {
    title: 'Add New Category',
  });
});

exports.create_category_post = [
  body('name', 'Name of category must be specified').trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newCategory = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render('category_form_page', {
        title: 'Add New Category',
        category: newCategory,
        errors: errors.array(),
      });
    } else {
      await newCategory.save();
      res.redirect(newCategory.url);
    }
  }),
];
