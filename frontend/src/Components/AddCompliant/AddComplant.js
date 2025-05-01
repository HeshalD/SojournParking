import React, { useState } from 'react';
import './Compliant.css';
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
		sendRequest().then(() => history('/displayComplaint'));
	};

	const sendRequest = async () => {
        try {
            const response = await axios.post("http://localhost:5000/complaint", {
                date: inputs.date,
                comp: inputs.comp,
                describe: inputs.describe,
                solution: inputs.solution,
            });
    
            console.log("Response:", response.data); // Debugging
            return response.data;
        } catch (error) {
            console.error("Error submitting complaint:", error.response ? error.response.data : error.message);
            alert("Failed to submit complaint. Please try again.");
        }
    };
    
	return (
		<div className="complaint-page-wrapper">
			<div className="complaint-container">
				<h1 className="complaint-heading">Customer Complaint Form</h1>
				<p className="complaint-subtitle">
					We're sorry to hear about your experience. Please provide us with
					details of your complaint so that we can address it promptly.
				</p>
				<form onSubmit={handleSubmit} className="complaint-form">
					<div className="complaint-form-group">
						<label className="complaint-label">Date of Complaint</label>
						<input
							type="date"
							name="date"
							onChange={handleChange}
							value={inputs.date}
							required=""
							className="complaint-input"
						/>
					</div>
					<div className="complaint-section-title">Complaint Details</div>
					<div className="complaint-form-group">
						<label className="complaint-label">What is the nature of your complaint?</label>
						<input
							type="text"
							name="comp"
							onChange={handleChange}
							value={inputs.comp}
							required=""
							className="complaint-input"
						/>
					</div>
					<div className="complaint-form-group">
						<label className="complaint-label">Please describe the incident or issue</label>
						<textarea
							required=""
							name="describe"
							onChange={handleChange}
							value={inputs.describe}
							className="complaint-textarea"
						/>
					</div>
					<div className="complaint-form-group">
						<label className="complaint-label">What resolution are you seeking?</label>
						<textarea
							required=""
							name="solution"
							onChange={handleChange}
							value={inputs.solution}
							className="complaint-textarea"
						/>
					</div>
					<button type="submit" className="complaint-button">Submit</button>
				</form>
			</div>
		</div>
	);
}

export default Complaint;