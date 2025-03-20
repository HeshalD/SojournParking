const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
	date: {
		type: date,
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

Module.export = mongoose.model('ComplaintModel', complaintSchema);
