const express = require('express');
const router = express.Router();
const Review = require('../Models/ReviewModel');
const ReviewCotroller = require('../Controllers/ReviewController');

router.get('/', ReviewCotroller.getAllReview);
router.post('/', ReviewCotroller.DisReview);
router.get('/:id', ReviewCotroller.getById);
router.put('/:id', ReviewCotroller.updateReview);
router.delete('/:id', ReviewCotroller.deleteReview);

module.exports = router;
