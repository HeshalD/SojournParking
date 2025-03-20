import React from 'react';
import './Complaint.css';

function Complaint() {
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
					<form>
						<div className="form-group">
							<label>Date of Complaint</label>
							<input type="date" required="" />
						</div>
						<div className="section-title">Complaint Details</div>
						<div className="form-group">
							<label>What is the nature of your complaint?</label>
							<input type="text" required="" />
						</div>
						<div className="form-group">
							<label>Please describe the incident or issue</label>
							<textarea required="" defaultValue={''} />
						</div>
						<div className="form-group">
							<label>What resolution are you seeking?</label>
							<textarea required="" defaultValue={''} />
						</div>
						<button type="submit">Submit</button>
					</form>
				</div>
			</>
		</div>
	);
}

export default Complaint;
