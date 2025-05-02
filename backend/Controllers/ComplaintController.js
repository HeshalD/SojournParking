const Complaint = require('../Models/ComplaintModel'); // Check that the path is correct

const getAllComplaint = async (req, res) => {
	try {
		const complaints = await Complaint.find();
		res.status(200).json(complaints); // Return the array directly
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


const DisComplaint = async (req, res, next) => {
	const { date, email, comp, describe, solution } = req.body;
	let complaint;

	try {
		complaint = new Complaint({ date, email, comp, describe, solution });
		await complaint.save();
	} catch (err) {
		console.log(err);
	}

	if (!complaint) {
		return res.status(404).json({ message: 'unable to add complaint' });
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
	const { date, email, comp, describe, solution } = req.body;

	let complaint;

	try {
		complaint = await Complaint.findByIdAndUpdate(id, {
			date: date,
			email: email,
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
exports.DisComplaint = DisComplaint;
exports.getById = getById;
exports.updateComplaint = updateComplaint;
exports.deleteComplaint = deleteComplaint;

