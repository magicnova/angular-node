const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.SignUp = (req, res) => {
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

exports.SignIn = (req, res) => {
	User.findOne(
		{ email: req.body.email },

		function(err, user) {
			if (err) {
				return res.status(500).json({
					title: 'An error ocurred',
					error: err
				});
			}

			if (!user) {
				return res.status(500).json({
					title: 'Login failed',
					error: { message: 'Invalid credentials' }
				});
			}

			if (!bcrypt.compareSync(req.body.password, user.password)) {
				return res.status(401).json({
					title: 'Login failed',
					error: { message: 'Invalid credentials' }
				});
			}

			const token = jwt.sign({ user: user }, 'secret', {
				expiresIn: 7200
			});
			res.status(200).json({
				message: 'Succesfully logged in',
				token: token,
				userId: user._id
			});
		}
	);
};
