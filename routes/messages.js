const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');
router.post('/', authController.CanAccess, messageController.CreateMessage);
router.get('/', messageController.GetMessages);
router.patch('/:id', authController.CanAccess, messageController.UpdateMessage);
router.delete(
	'/:id',
	authController.CanAccess,
	messageController.DeleteMessage
);
module.exports = router;
