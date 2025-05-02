import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Review.css';

function AddReview() {
	const navigate = useNavigate();
	const [inputs, setInputs] = useState({
		rating: 0,
		RService: '',
		RThought: '',
		parkingLocation: '',
		parkingDuration: '',
		vehicleType: '',
		paymentMethod: '',
		date: new Date().toISOString().split('T')[0]
	});
	const [errors, setErrors] = useState({});
	const [hoverRating, setHoverRating] = useState(0);

	const validateForm = () => {
		const newErrors = {};
		
		// Rating validation
		if (inputs.rating === 0) {
			newErrors.rating = 'Please provide a rating';
		}

		// Parking Location validation
		if (!inputs.parkingLocation) {
			newErrors.parkingLocation = 'Please select a parking location';
		}

		// Parking Duration validation
		if (!inputs.parkingDuration) {
			newErrors.parkingDuration = 'Please select parking duration';
		}

		// Vehicle Type validation
		if (!inputs.vehicleType) {
			newErrors.vehicleType = 'Please select your vehicle type';
		}

		// Payment Method validation
		if (!inputs.paymentMethod) {
			newErrors.paymentMethod = 'Please select payment method';
		}

		// Date validation
		if (!inputs.date) {
			newErrors.date = 'Please select parking date';
		} else {
			const selectedDate = new Date(inputs.date);
			const today = new Date();
			if (selectedDate > today) {
				newErrors.date = 'Date cannot be in the future';
			}
		}

		// Recommendation validation
		if (!inputs.RService) {
			newErrors.RService = 'Please select if you would recommend our service';
		}

		// Comments validation
		if (!inputs.RThought.trim()) {
			newErrors.RThought = 'Please provide your feedback';
		} else if (inputs.RThought.length < 10) {
			newErrors.RThought = 'Feedback must be at least 10 characters long';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs((prevState) => ({
			...prevState,
			[name]: value,
		}));
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors(prev => ({ ...prev, [name]: '' }));
		}
	};

	const handleStarClick = (rating) => {
		setInputs(prev => ({ ...prev, rating }));
		if (errors.rating) {
			setErrors(prev => ({ ...prev, rating: '' }));
		}
	};

	const handleStarHover = (rating) => {
		setHoverRating(rating);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			console.log(inputs);
			sendRequest().then(() => navigate('/displayReview'));
		}
	};

	const sendRequest = async () => {
		await axios
			.post('http://localhost:5000/Review', {
				rating: Number(inputs.rating),
				RService: String(inputs.RService),
				RThought: String(inputs.RThought),
				parkingLocation: inputs.parkingLocation,
				parkingDuration: inputs.parkingDuration,
				vehicleType: inputs.vehicleType,
				paymentMethod: inputs.paymentMethod,
				date: inputs.date
			})
			.then((res) => res.data);
	};

	return (
		<div className="review-component-container">
			<div className="container">
				<h1>Parking Service Review</h1>
				<form id="serviceReviewForm" onSubmit={handleSubmit}>
					<div className="form-group">
						<div className="parking-details">
							<div className="form-field">
								<label htmlFor="parkingLocation">Parking Location *</label>
								<select
									id="parkingLocation"
									name="parkingLocation"
									value={inputs.parkingLocation}
									onChange={handleChange}
									className={errors.parkingLocation ? 'error' : ''}
								>
									<option value="">Select Location</option>
									<option value="Main Parking Lot">Main Parking Lot</option>
									<option value="Underground Parking">Underground Parking</option>
									<option value="VIP Parking">VIP Parking</option>
									<option value="Disabled Parking">Disabled Parking</option>
								</select>
								{errors.parkingLocation && <span className="error-message">{errors.parkingLocation}</span>}
							</div>

							<div className="form-field">
								<label htmlFor="parkingDuration">Parking Duration *</label>
								<select
									id="parkingDuration"
									name="parkingDuration"
									value={inputs.parkingDuration}
									onChange={handleChange}
									className={errors.parkingDuration ? 'error' : ''}
								>
									<option value="">Select Duration</option>
									<option value="Less than 1 hour">Less than 1 hour</option>
									<option value="1-3 hours">1-3 hours</option>
									<option value="3-6 hours">3-6 hours</option>
									<option value="6-12 hours">6-12 hours</option>
									<option value="More than 12 hours">More than 12 hours</option>
								</select>
								{errors.parkingDuration && <span className="error-message">{errors.parkingDuration}</span>}
							</div>

							<div className="form-field">
								<label htmlFor="vehicleType">Vehicle Type *</label>
								<select
									id="vehicleType"
									name="vehicleType"
									value={inputs.vehicleType}
									onChange={handleChange}
									className={errors.vehicleType ? 'error' : ''}
								>
									<option value="">Select Vehicle Type</option>
									<option value="Car">Car</option>
									<option value="SUV">SUV</option>
									<option value="Motorcycle">Motorcycle</option>
									<option value="Van">Van</option>
									<option value="Truck">Truck</option>
								</select>
								{errors.vehicleType && <span className="error-message">{errors.vehicleType}</span>}
							</div>

							<div className="form-field">
								<label htmlFor="paymentMethod">Payment Method *</label>
								<select
									id="paymentMethod"
									name="paymentMethod"
									value={inputs.paymentMethod}
									onChange={handleChange}
									className={errors.paymentMethod ? 'error' : ''}
								>
									<option value="">Select Payment Method</option>
									<option value="Cash">Cash</option>
									<option value="Credit Card">Credit Card</option>
									<option value="Mobile Payment">Mobile Payment</option>
									<option value="Monthly Pass">Monthly Pass</option>
								</select>
								{errors.paymentMethod && <span className="error-message">{errors.paymentMethod}</span>}
							</div>

							<div className="form-field">
								<label htmlFor="date">Date of Parking *</label>
								<input
									type="date"
									id="date"
									name="date"
									value={inputs.date}
									onChange={handleChange}
									max={new Date().toISOString().split('T')[0]}
									className={errors.date ? 'error' : ''}
								/>
								{errors.date && <span className="error-message">{errors.date}</span>}
							</div>
						</div>

						<div className="rating-section">
							<div className="rating-title">
								How would you rate your parking experience? *
							</div>
							<div className="stars-container">
								{[1, 2, 3, 4, 5].map((star) => (
									<span
										key={star}
										className={`star ${(hoverRating || inputs.rating) >= star ? 'active' : ''}`}
										onClick={() => handleStarClick(star)}
										onMouseEnter={() => handleStarHover(star)}
										onMouseLeave={() => handleStarHover(0)}
									>
										★
									</span>
								))}
							</div>
							{errors.rating && <span className="error-message">{errors.rating}</span>}
							<div className="rating-text">
								{inputs.rating === 0 ? 'Select a rating' : `${inputs.rating} out of 5 stars`}
							</div>
						</div>

						<div className="recommendation">
							<div className="rating-title">
								Would you recommend our parking service to others? *
							</div>
							<div className="radio-group">
								<div className="radio-option">
									<input
										type="radio"
										id="recommend-yes"
										name="RService"
										onChange={handleChange}
										value="yes"
									/>
									<label htmlFor="recommend-yes">Yes, definitely!</label>
								</div>
								<div className="radio-option">
									<input
										type="radio"
										id="recommend-no"
										name="RService"
										onChange={handleChange}
										value="no"
									/>
									<label htmlFor="recommend-no">No, not really</label>
								</div>
								<div className="radio-option">
									<input
										type="radio"
										id="recommend-maybe"
										name="RService"
										onChange={handleChange}
										value="maybe"
									/>
									<label htmlFor="recommend-maybe">Maybe</label>
								</div>
							</div>
							{errors.RService && <span className="error-message">{errors.RService}</span>}
						</div>

						<div className="thoughts">
							<div className="rating-title">
								Share your parking experience with us *
							</div>
							<textarea
								name="RThought"
								placeholder="Tell us about your parking experience, including any specific feedback about security, cleanliness, or staff assistance..."
								onChange={handleChange}
								value={inputs.RThought}
								className={errors.RThought ? 'error' : ''}
							/>
							{errors.RThought && <span className="error-message">{errors.RThought}</span>}
						</div>

						<button type="submit" className="submit-btn">
							Submit Review
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddReview;