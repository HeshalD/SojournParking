import React, { useState } from 'react';
import './Complaint.css';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Complaint() {
	const history = useNavigate();
	const [inputs, setInputs] = useState({
		date: '',
		comp: '',
		describe: '',
		solution: '',
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
		sendRequest().then(() => history('DisplayComplaint'));
	};

	const sendRequest = async () => {
		await axios
			.post('http://localhost:5000/complaint', {
				date: date(inputs.date),
				comp: String(inputs.comp),
				describe: String(inputs.describe),
				solution: String(inputs.solution),
			})
			.then((res) => res.data);
	};
	return (
		<div>
			<>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Customer Complaint Form</title>
				<link rel="stylesheet" href="../Project/Complaint.css" />
				<div className="container">
					<h1>Customer Complaint Form</h1>
					<p className="subtitle">
						We're sorry to hear about your experience. Please provide us with
						details of your complaint so that we can address it promptly.
					</p>
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label>Date of Complaint</label>
							<input
								type="date"
								name="date"
								onChange={handleChange}
								vaue={inputs.date}
								required=""
							/>
						</div>
						<div className="section-title">Complaint Details</div>
						<div className="form-group">
							<label>What is the nature of your complaint?</label>
							<input
								type="text"
								name="comp"
								onChange={handleChange}
								value={inputs.comp}
								required=""
							/>
						</div>
						<div className="form-group">
							<label>Please describe the incident or issue</label>
							<textarea
								required=""
								name="describe"
								onChange={handleChange}
								value={inputs.describe}
								defaultValue={''}
							/>
						</div>
						<div className="form-group">
							<label>What resolution are you seeking?</label>
							<textarea
								required=""
								name="solution"
								onChange={handleChange}
								value={inputs.solution}
								defaultValue={''}
							/>
						</div>
						<button type="submit">Submit</button>
					</form>
				</div>
			</>
		</div>
	);
}

export default Complaint;
