import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Review.css';

function UpdateReview() {
	const navigate = useNavigate();
	const { id } = useParams();
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

	useEffect(() => {
		const fetchHandler = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/Review/${id}`);
				const reviewData = response.data.review;
				setInputs({
					rating: reviewData.rating || 0,
					RService: reviewData.RService || '',
					RThought: reviewData.RThought || '',
					parkingLocation: reviewData.parkingLocation || '',
					parkingDuration: reviewData.parkingDuration || '',
					vehicleType: reviewData.vehicleType || '',
					paymentMethod: reviewData.paymentMethod || '',
					date: reviewData.date ? new Date(reviewData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
				});
			} catch (err) {
				console.error('Error fetching review:', err);
			}
		};
		fetchHandler();
	}, [id]);

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			try {
				await axios.put(`http://localhost:5000/Review/${id}`, {
					rating: Number(inputs.rating),
					RService: String(inputs.RService),
					RThought: String(inputs.RThought),
					parkingLocation: inputs.parkingLocation,
					parkingDuration: inputs.parkingDuration,
					vehicleType: inputs.vehicleType,
					paymentMethod: inputs.paymentMethod,
					date: inputs.date
				});
				navigate('/displayReview');
			} catch (err) {
				console.error('Error updating review:', err);
			}
		}
	};

	const renderStars = () => {
		return [...Array(5)].map((_, index) => (
			<span
				key={index}
				className={`star ${index < (hoverRating || inputs.rating) ? 'active' : ''}`}
				onClick={() => handleStarClick(index + 1)}
				onMouseEnter={() => handleStarHover(index + 1)}
				onMouseLeave={() => handleStarHover(0)}
			>
				★
			</span>
		));
	};

	return (
		<div className="review-component-container">
			<div className="container">
				<h1>Update Parking Service Review</h1>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<div className="parking-details">
							<div className="form-field">
								<label>Parking Location</label>
								<select
									name="parkingLocation"
									value={inputs.parkingLocation}
									onChange={handleChange}
									className={errors.parkingLocation ? 'error' : ''}
								>
									<option value="">Select Location</option>
									<option value="Main Lot">Main Lot</option>
									<option value="North Lot">North Lot</option>
									<option value="South Lot">South Lot</option>
									<option value="East Lot">East Lot</option>
									<option value="West Lot">West Lot</option>
								</select>
								{errors.parkingLocation && (
									<span className="error-message">{errors.parkingLocation}</span>
								)}
							</div>

							<div className="form-field">
								<label>Parking Duration</label>
								<select
									name="parkingDuration"
									value={inputs.parkingDuration}
									onChange={handleChange}
									className={errors.parkingDuration ? 'error' : ''}
								>
									<option value="">Select Duration</option>
									<option value="Less than 1 hour">Less than 1 hour</option>
									<option value="1-2 hours">1-2 hours</option>
									<option value="2-4 hours">2-4 hours</option>
									<option value="4-8 hours">4-8 hours</option>
									<option value="More than 8 hours">More than 8 hours</option>
								</select>
								{errors.parkingDuration && (
									<span className="error-message">{errors.parkingDuration}</span>
								)}
							</div>

							<div className="form-field">
								<label>Vehicle Type</label>
								<select
									name="vehicleType"
									value={inputs.vehicleType}
									onChange={handleChange}
									className={errors.vehicleType ? 'error' : ''}
								>
									<option value="">Select Vehicle Type</option>
									<option value="Car">Car</option>
									<option value="SUV">SUV</option>
									<option value="Truck">Truck</option>
									<option value="Motorcycle">Motorcycle</option>
									<option value="Van">Van</option>
								</select>
								{errors.vehicleType && (
									<span className="error-message">{errors.vehicleType}</span>
								)}
							</div>

							<div className="form-field">
								<label>Payment Method</label>
								<select
									name="paymentMethod"
									value={inputs.paymentMethod}
									onChange={handleChange}
									className={errors.paymentMethod ? 'error' : ''}
								>
									<option value="">Select Payment Method</option>
									<option value="Cash">Cash</option>
									<option value="Credit Card">Credit Card</option>
									<option value="Debit Card">Debit Card</option>
									<option value="Mobile Payment">Mobile Payment</option>
								</select>
								{errors.paymentMethod && (
									<span className="error-message">{errors.paymentMethod}</span>
								)}
							</div>

							<div className="form-field">
								<label>Date of Parking</label>
								<input
									type="date"
									name="date"
									value={inputs.date}
									onChange={handleChange}
									className={errors.date ? 'error' : ''}
								/>
								{errors.date && (
									<span className="error-message">{errors.date}</span>
								)}
							</div>
						</div>

						<div className="rating-section">
							<div className="rating-title">Rate Your Experience</div>
							<div className="stars-container">
								{renderStars()}
							</div>
							{errors.rating && (
								<span className="error-message">{errors.rating}</span>
							)}
						</div>

						<div className="form-field">
							<label>Would you recommend our parking service?</label>
							<select
								name="RService"
								value={inputs.RService}
								onChange={handleChange}
								className={errors.RService ? 'error' : ''}
							>
								<option value="">Select Recommendation</option>
								<option value="Yes">Yes</option>
								<option value="No">No</option>
								<option value="Maybe">Maybe</option>
							</select>
							{errors.RService && (
								<span className="error-message">{errors.RService}</span>
							)}
						</div>

						<div className="form-field">
							<label>Your Feedback</label>
							<textarea
								name="RThought"
								value={inputs.RThought}
								onChange={handleChange}
								placeholder="Please share your experience with our parking service..."
								className={errors.RThought ? 'error' : ''}
							/>
							{errors.RThought && (
								<span className="error-message">{errors.RThought}</span>
							)}
						</div>

						<button type="submit" className="submit-btn">
							Update Review
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default UpdateReview;
