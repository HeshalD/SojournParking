import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';

function UpdateReview() {
	const [inputs, setInputs] = useState({
		RService: '',
		RThought: '',
	});

	const history = useNavigate();
	const id = useParams().id;

	useEffect(() => {
		const fetchHandler = async () => {
			await axios
				.get(`http://localhost:5000/Review/${id}`)
				.then((res) => res.data)
				.then((data) => setInputs(data.review));
		};
		fetchHandler();
	}, [id]);

	const sendRequest = async () => {
		await axios
			.put(`http://localhost:5000/Review/${id}`, {
				RService: String(inputs.RService),
				RThought: String(inputs.RThought),
			})
			.then((res) => res.data);
	};

	const handleChange = (e) => {
		setInputs((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(inputs);
		sendRequest().then(() => history('/displayReview'));
	};

	return (
		<div>
			<h1>UpdateReview</h1>

			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Service Review Form</title>
			<link rel="stylesheet" href="../Project/Review.css" />
			<div className="container">
				<h1>Service Review Form</h1>
				<form id="serviceReviewForm">
					<div className="form-group" onSubmit={handleSubmit}>
						<div className="recommendation">
							<div className="rating-title">
								5. Would you recommend the service to your friends?
							</div>
							<div className="radio-group">
								<div className="radio-option">
									<input
										type="radio"
										id="recommend-yes"
										name="recommend"
										onChange={handleChange}
										value={inputs.RService}
										defaultValue="yes"
									/>
									<label htmlFor="recommend-yes">Of course!</label>
								</div>
								<div className="radio-option">
									<input
										type="radio"
										id="recommend-no"
										name="recommend"
										onChange={handleChange}
										value={inputs.RService}
										defaultValue="no"
									/>
									<label htmlFor="recommend-no">Never</label>
								</div>
								<div className="radio-option">
									<input
										type="radio"
										id="recommend-maybe"
										name="recommend"
										onChange={handleChange}
										value={inputs.RService}
										defaultValue="maybe"
									/>
									<label htmlFor="recommend-maybe">Maybe</label>
								</div>
							</div>
						</div>
						<div className="thoughts">
							<div className="rating-title">6. Let us know your thoughts!</div>
							<textarea
								placeholder="Type here..."
								onChange={handleChange}
								value={inputs.RThought}
								defaultValue={''}
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

export default UpdateReview;
