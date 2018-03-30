const User = require('../models/user');

exports.GetUserById = id => {
	return User.findById(id);
};

exports.AddMessage = (user, message) => {
	user.messages.push(message);
	user.save();
};
