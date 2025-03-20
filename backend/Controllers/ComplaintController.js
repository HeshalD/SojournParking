const Complaint = require('../Models/ComplaintModel');

const getAllComplaint = async (req, res, next) => {
	let Complaint;

	try {
		complaint = await Complaint.find();
	} catch (err) {
		console.log(err);
	}

	if (!complaint) {
		return res.status(404).json({ message: 'Complaint not found' });
	}

	return res.status(200).json({ complaint });
};

const addComplaint = async (req, res, next) => {
	const { date, comp, describe, solution } = req.body;
	let complaint;

	try {
		complaint = new Complaint({ date, comp, describe, solution });
		await complaint.save();
	} catch (err) {
		console.log(err);
	}

	if (!complaint) {
		return res.status(404).json({ message: 'unable to add users' });
	}
	return res.status(200).json({ complaint });
};

const getById = async (req, res, next) => {
	const id = req.params.id;
	let complaint;

	try {
		complaint = await Complaint.findById(id);
	} catch (err) {
		console.log(err);
	}

	if (!complaint) {
		return res.status(404).json({ message: 'complaint not found' });
	}
	return res.status(200).json({ complaint });
};

const updateComplaint = async (req, res, next) => {
	const id = req.params.id;
	const { date, comp, describe, solution } = req.body;

	let complaint;

	try {
		complaint = await Complaint.findByIdAndUpdate(id, {
			date: date,
			comp: comp,
			describe: describe,
			solution: solution,
		});
		complaint = await complaint.save();
	} catch (err) {
		console.log(err);
	}

	if (!complaint) {
		return res.status(404).json({ message: 'Unable to update complaint' });
	}
	return res.status(200).json({ complaint });
};

const deleteComplaint = async (req, res, next) => {
	const id = req.params.id;

	let complaint;

	try {
		complaint = await Complaint.findByIdAndDelete(id);
	} catch (err) {
		console.log(err);
	}
	if (!complaint) {
		return res.status(404).json({ message: 'Unable to delete complaint' });
	}
	return res.status(200).json({ complaint });
};

exports.getAllComplaint = getAllComplaint;
exports.addComplaint = addComplaint;
exports.getById = getById;
exports.updateComplaint = updateComplaint;
exports.deleteComplaint = deleteComplaint;
