#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require('mongoose');
const Item = require('./models/item');
const Category = require('./models/category');

const items = [];
const categories = [];

mongoose.set('strictQuery', false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createItems();
  await createCategories();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function itemCreate(name, description, category, price, number_in_stock) {
  const itemDetail = { name, category, price, number_in_stock };
  if (description != false) itemDetail.description = description;

  const item = new Item(itemDetail);
  await item.save();
  items.push(item);
  console.log(`Added item: ${name}`);
}

async function categoryCreate(name, description) {
  const categoryDetail = { name };
  if (description != false) categoryDetail.description = description;

  const category = new Category(categoryDetail);

  await category.save();
  categories.push(category);
  console.log(`Added category: ${name}`);
}

async function createItems() {
  console.log('Adding items');
  await Promise.all([
    itemCreate('Tomatoes', 'A packet containing 30 small tomato seeds.', [Category.find({ name: 'Nightshades' }).exec()._id], 3.50, 30),
    itemCreate('Potatoes', 'About 10 small potatoes ready to plant into the ground.', [Category.find({ name: 'Nightshades' }).exec()._id, Category.find({ name: 'Root vegetables' }).exec()._id], 7.00, 10),
    itemCreate('Onion seeds', 'A packet of onion seeds, NOT onion bulbs', [Category.find({ name: 'Alliums' }).exec()._id, Category.find({ name: 'Root vegetables' }).exec()._id], 4.00, 10),
  ]);
}

async function createCategories() {
  console.log('Adding categories');
  await Promise.all([
    categoryCreate('Nightshades', false),
    categoryCreate('Legumes', false),
    categoryCreate('Cucurbits', false),
    categoryCreate('Brassicas', false),
    categoryCreate('Alliums', false),
    categoryCreate('Root vegetables', false),
    categoryCreate('Salad Greens', false),
    categoryCreate('Other', 'Vegetable seeds that are uncategorized'),
  ]);
}
