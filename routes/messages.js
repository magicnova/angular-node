const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/', messageController.CreateMessage);
router.get('/', messageController.GetMessages);
router.patch('/:id', messageController.UpdateMessage);
router.delete('/:id', messageController.DeleteMessage);
module.exports = router;
