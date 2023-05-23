var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController');

/* GET home page. */
router.get('/', categoryController.home_page);

module.exports = router;
