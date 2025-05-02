const Review = require('../Models/ReviewModel');

const getAllReview = async (req, res, next) => {
	let review;

	try {
		review = await Review.find().sort({ createdAt: -1 });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Error fetching reviews' });
	}

	if (!review) {
		return res.status(404).json({ message: 'No reviews found' });
	}
	return res.status(200).json({ review });
};

const DisReview = async (req, res, next) => {
	const { 
		rating, 
		RService, 
		RThought, 
		parkingLocation, 
		parkingDuration, 
		vehicleType, 
		paymentMethod, 
		date 
	} = req.body;

	let review;

	try {
		review = new Review({
			rating,
			RService,
			RThought,
			parkingLocation,
			parkingDuration,
			vehicleType,
			paymentMethod,
			date: new Date(date)
		});
		await review.save();
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Error saving review' });
	}

	if (!review) {
		return res.status(404).json({ message: 'Unable to add review' });
	}
	return res.status(201).json({ review });
};

const getById = async (req, res, next) => {
	const id = req.params.id;
	let review;

	try {
		review = await Review.findById(id);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Error fetching review' });
	}

	if (!review) {
		return res.status(404).json({ message: 'Review not found' });
	}
	return res.status(200).json({ review });
};

const updateReview = async (req, res, next) => {
	const id = req.params.id;
	const { 
		rating, 
		RService, 
		RThought, 
		parkingLocation, 
		parkingDuration, 
		vehicleType, 
		paymentMethod, 
		date 
	} = req.body;

	let review;

	try {
		review = await Review.findByIdAndUpdate(id, {
			rating,
			RService,
			RThought,
			parkingLocation,
			parkingDuration,
			vehicleType,
			paymentMethod,
			date: new Date(date)
		}, { new: true });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Error updating review' });
	}

	if (!review) {
		return res.status(404).json({ message: 'Unable to update review' });
	}
	return res.status(200).json({ review });
};

const deleteReview = async (req, res, next) => {
	const id = req.params.id;

	let review;

	try {
		review = await Review.findByIdAndDelete(id);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Error deleting review' });
	}

	if (!review) {
		return res.status(404).json({ message: 'Unable to delete review' });
	}
	return res.status(200).json({ review });
};

exports.getAllReview = getAllReview;
exports.DisReview = DisReview;
exports.getById = getById;
exports.updateReview = updateReview;
exports.deleteReview = deleteReview;
