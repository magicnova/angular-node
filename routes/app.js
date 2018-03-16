var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
	res.render('node');
});

router.post('/', userController.createUser);

module.exports = router;
