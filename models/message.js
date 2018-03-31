const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
	content: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

messageSchema.post('remove', function(message) {
	User.findById(message.user, function(err, user) {
		if (user !== null) {
			user.messages.pull(message._id);
			user.save();
		}
	});
});

module.exports = mongoose.model('Message', messageSchema);
