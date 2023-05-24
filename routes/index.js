var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController');

/* GET home page. */
router.get('/', categoryController.home_page);

router.get('/category/:id', categoryController.category_page);

module.exports = router;
