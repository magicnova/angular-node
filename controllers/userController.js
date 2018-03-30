const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.SingUp = (req, res) => {
	const user = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: bcrypt.hashSync(req.body.password, 10),
		email: req.body.email
	});

	user.save(function(err, result) {
		if (err) {
			return res.status(500).json({
				title: 'An error ocurred',
				error: err
			});
		}

		res.status(201).json({
			message: 'user created',
			obj: result
		});
	});
};
