import React, { useState } from 'react';
import './Compliant.css';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Complaint() {
	const history = useNavigate();
	const [inputs, setInputs] = useState({
		date: '',
		email: '',
		comp: '',
		describe: '',
		solution: '',
	});

	const [errors, setErrors] = useState({
		describe: '',
		solution: '',
	});
	
	const validateForm = () => {
		let isValid = true;
		const newErrors = {
			describe: '',
			solution: '',
		};

		// Validate describe field
		if (inputs.describe.length < 20) {
			newErrors.describe = 'Description must be at least 20 characters long';
			isValid = false;
		} else if (inputs.describe.length > 500) {
			newErrors.describe = 'Description cannot exceed 500 characters';
			isValid = false;
		}

		// Validate solution field
		if (inputs.solution.length < 10) {
			newErrors.solution = 'Solution must be at least 10 characters long';
			isValid = false;
		} else if (inputs.solution.length > 300) {
			newErrors.solution = 'Solution cannot exceed 300 characters';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs((prevState) => ({
			...prevState,
			[name]: value,
		}));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: '',
			}));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			console.log(inputs);
			sendRequest().then(() => history('/displayComplaint'));
		}
	};

	const sendRequest = async () => {
        try {
            const response = await axios.post("http://localhost:5000/complaint", {
                date: inputs.date,
                email: inputs.email,
                comp: inputs.comp,
                describe: inputs.describe,
                solution: inputs.solution,
            });
    
            console.log("Response:", response.data);
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
					<div className="complaint-form-group">
						<label className="complaint-label">Email Address</label>
						<input
							type="email"
							name="email"
							onChange={handleChange}
							value={inputs.email}
							required=""
							className="complaint-input"
							placeholder="Enter your email address"
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
							className={`complaint-textarea ${errors.describe ? 'error' : ''}`}
							placeholder="Please provide a detailed description (minimum 20 characters)"
						/>
						{errors.describe && <div className="error-message">{errors.describe}</div>}
					</div>
					<div className="complaint-form-group">
						<label className="complaint-label">What resolution are you seeking?</label>
						<textarea
							required=""
							name="solution"
							onChange={handleChange}
							value={inputs.solution}
							className={`complaint-textarea ${errors.solution ? 'error' : ''}`}
							placeholder="Please describe your desired resolution (minimum 10 characters)"
						/>
						{errors.solution && <div className="error-message">{errors.solution}</div>}
					</div>
					<button type="submit" className="complaint-button">Submit</button>
				</form>
			</div>
		</div>
	);
}

export default Complaint;