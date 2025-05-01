import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Fixed import
import axios from 'axios';
import './Review.css';

function AddReview() {
	const navigate = useNavigate(); // Fixed variable name
	const [inputs, setInputs] = useState({
		RService: '',
		RThought: '',
	});

	const handleChange = (e) => {
		setInputs((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(inputs);
		sendRequest().then(() => navigate('/displayReview')); // Fixed function call
	};

	const sendRequest = async () => {
		await axios
			.post('http://localhost:5000/Review', {
				RService: String(inputs.RService),
				RThought: String(inputs.RThought),
			})
			.then((res) => res.data);
	};
	
	return (
		<div className="review-component-container">
			<div className="container">
				<h1>Service Review Form</h1>
				<form id="serviceReviewForm" onSubmit={handleSubmit}>
					<div className="form-group">
						<div className="recommendation">
							<div className="rating-title">
								5. Would you recommend the service to your friends?
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
									<label htmlFor="recommend-yes">Of course!</label>
								</div>
								<div className="radio-option">
									<input
										type="radio"
										id="recommend-no"
										name="RService"
										onChange={handleChange}
										value="no"
									/>
									<label htmlFor="recommend-no">Never</label>
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
						</div>
						<div className="thoughts">
							<div className="rating-title">
								6. Let us know your thoughts!
							</div>
							<textarea
								name="RThought"
								placeholder="Type here..."
								onChange={handleChange}
								value={inputs.RThought}
							/>
						</div>
						<button type="submit" className="submit-btn">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddReview;