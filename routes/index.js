var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');

/* GET home page. */
router.get('/', categoryController.home_page);

router.get('/category/create', categoryController.create_category_get);

router.post('/category/create', categoryController.create_category_post);

router.get('/category/:id', categoryController.category_page);

router.get('/category/:id/revise', categoryController.revise_category_get);

router.get('/item/:id', itemController.item_page);

module.exports = router;
