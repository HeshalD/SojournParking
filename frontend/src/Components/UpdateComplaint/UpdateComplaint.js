import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

function UpdateComplaint() {
	const [inputs, setInputs] = useState({});
	const history = useNavigate();
	const id = useParams().id;

	useEffect(() => {
		const fetchHandler = async () => {
			await axios
				.get(`http://localhost:5000/complaint/${id}`)
				.then((res) => res.data)
				.then((data) => setInputs(data.complaint));
		};
		fetchHandler();
	}, [id]);

	const sendRequest = async () => {
		await axios
			.put(`http://localhost:5000/complaint/${id}`, {
				date: date(inputs.date),
				comp: String(inputs.comp),
				describe: String(inputs.describe),
				solution: String(inputs.solution),
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
		e.preventDefaut();
		console.log(inputs);
		sendRequest().then(() => history('/DisplayComplaint'));
	};

	return (
		<div>
			<h1>UpdateComplaint</h1>
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
	);
}

export default UpdateComplaint;
