const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
	RService: {
		type: String,
		required: true,
	},
	RThought: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('ReviewModel', reviewSchema);
