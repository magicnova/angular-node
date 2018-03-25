const MessageModel = require('../models/message');

exports.CreateMessage = (req, res) => {
	const message = new MessageModel({
		content: req.body.content
	});

	message.save(function(err, result) {
		if (err) {
			return res.status(500).json({
				title: 'An error ocurred',
				error: err
			});
		}
		res.status(201).json({
			message: 'Saved',
			obj: result
		});
	});
};

exports.GetMessages = (req, res) => {
	MessageModel.find().exec(function(err, messages) {
		if (err) {
			return res.status(500).json({
				title: 'An error ocurred',
				error: err
			});
		}
		res.status(200).json({
			message: 'Success',
			obj: messages
		});
	});
};

exports.UpdateMessage = (req, res) => {
	MessageModel.findById(req.params.id, function(err, message) {
		if (err) {
			return res.status(500).json({
				title: 'An Error ocurred',
				error: err
			});
		}
		if (!message) {
			return res.status(404).json({
				title: 'No message found',
				error: { message: 'Message not found' }
			});
		}
		message.content = req.body.content;

		message.save(function(err, result) {
			if (err) {
				return res.status(500).json({
					title: 'An error ocurred',
					error: err
				});
			}
			res.status(200).json({
				message: 'Saved',
				obj: result
			});
		});
	});
};

exports.DeleteMessage = (req, res) => {
	MessageModel.findById(req.params.id, function(err, message) {
		if (err) {
			return res.status(500).json({
				title: 'An Error ocurred',
				error: err
			});
		}
		if (!message) {
			return res.status(404).json({
				title: 'No message found',
				error: { message: 'Message not found' }
			});
		}

		message.remove(function(err, result) {
			if (err) {
				return res.status(500).json({
					title: 'An error ocurred',
					error: err
				});
			}
			res.status(200).json({
				message: 'removed message',
				obj: result
			});
		});
	});
};
