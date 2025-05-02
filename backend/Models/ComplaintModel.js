const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
	date: {
		type: Date,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	comp: {
		type: String,
		required: true,
	},
	describe: {
		type: String,
		required: true,
	},
	solution: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Complaint', complaintSchema);
