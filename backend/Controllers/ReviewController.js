const Review = require('../Models/ReviewModel');

const getAllReview = async (req, res, next) => {
	let review;

	try {
		review = await Review.find();
	} catch (err) {
		console.log(err);
	}

	if (!review) {
		return res.status(404).json({ message: 'Review ot found' });
	}
	return res.status(200).json({ review });
};

const DisReview = async (req, res, next) => {
	const { RService, RThought } = req.body;

	let review;

	try {
		review = new Review({ RService, RThought });
		await review.save();
	} catch (err) {
		console.log(err);
	}

	if (!review) {
		return res.status(404).json({ message: 'Unable to add review' });
	}
	return res.status(200).json({ review });
};

const getById = async (req, res, next) => {
	const id = req.params.id;
	let review;

	try {
		review = await Review.findById(id);
	} catch (err) {
		console.log(err);
	}

	if (!review) {
		return res.status(404).json({ message: 'review not found' });
	}
	return res.status(200).json({ review });
};

const updateReview = async (req, res, next) => {
	const id = req.params.id;
	const { RService, RThought } = req.body;

	let review;

	try {
		review = await Review.findByIdAndUpdate(id, {
			RService: RService,
			RThought: RThought,
		});
		review = await review.save();
	} catch (err) {
		console.log(err);
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
