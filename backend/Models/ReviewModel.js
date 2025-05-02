const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5
	},
	RService: {
		type: String,
		required: true,
	},
	RThought: {
		type: String,
		required: true,
	},
	parkingLocation: {
		type: String,
		required: true,
	},
	parkingDuration: {
		type: String,
		required: true,
	},
	vehicleType: {
		type: String,
		required: true,
	},
	paymentMethod: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('ReviewModel', reviewSchema);
