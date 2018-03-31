const MessageModel = require('../models/message');
const userRepository = require('../repositories/UserRepository');
const jwt = require('jsonwebtoken');

exports.CreateMessage = async (req, res) => {
	const decodedToken = jwt.decode(req.query.token);
	const user = await userRepository.GetUserById(decodedToken.user._id);
	if (user === null) {
		return res.json(500).json({
			title: 'An error ocurred',
			error: `${decodedToken.user._id} User not found`
		});
	}

	message = new MessageModel({
		content: req.body.content,
		user: user._id
	});

	message.save(function(err, result) {
		if (err) {
			return res.status(500).json({
				title: 'An error ocurred',
				error: err
			});
		}

		userRepository.AddMessage(user, result);
		result.populate('user', 'firstName');
		res.status(201).json({
			message: 'Saved',
			obj: result
		});
	});
};

exports.GetMessages = (req, res) => {
	MessageModel.find()
		.populate('user', 'firstName')
		.exec(function(err, messages) {
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

exports.UpdateMessage = async (req, res) => {
	const decodedToken = jwt.decode(req.query.token);
	const user = await userRepository.GetUserById(decodedToken.user._id);

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

		if (!message.user.equals(user._id)) {
			return res.status(401).json({
				title: 'Not authenticated',
				error: { message: 'Users dont match' }
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

exports.DeleteMessage = async (req, res) => {
	const decodedToken = jwt.decode(req.query.token);
	const user = await userRepository.GetUserById(decodedToken.user._id);

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

		if (!message.user.equals(user._id)) {
			return res.status(401).json({
				title: 'Not authenticated',
				error: { message: 'Users dont match' }
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
