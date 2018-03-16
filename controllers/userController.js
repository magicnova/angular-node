const User = require('../models/user');

exports.createUser = (req, res) => {
	const email = req.body.email;

	const user = new User({
		firstName: 'G',
		lastName: 'P',
		password: '123',
		email: email
	});

	user.save();

	res.redirect('/');
};
