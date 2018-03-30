const jwt = require('jsonwebtoken');

exports.CanAccess = (req, res, next) => {
	jwt.verify(req.query.token, 'secret', function(err, decoded) {
		if (err) {
			return res.status(400).json({
				title: 'Not Authenticated',
				error: err
			});
		}
		next();
	});
};
