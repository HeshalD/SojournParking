import React from 'react';
import './DisplayComplaint.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DisplayComplaint(props) {
	const { _id, date, comp, describe, solution } = props.complaint;

	const history = useNavigate();

	const deleteHandler = async () => {
		await axios
			.delete(`http://localhost:5000/complaint/${_id}`)
			.then((res) => res.data)
			.then(() => history('/'))
			.then(() => history('/DisplayComplaint'));
	};
	return (
		<div>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Issue Tracker</title>
			<link rel="stylesheet" href="../DisplayComplaint.css" />
			<div className="issue-container">
				<div className="issue-header">
					<h3>Issue Details</h3>
					<div className="issue-id">ID:{_id}</div>
				</div>
				<div className="issue-details">
					<div className="detail-item">
						<span className="label">Date:{date}</span>
					</div>
					<div className="detail-item">
						<span className="label">Issue:{comp}</span>
					</div>
					<div className="detail-item">
						<span className="label">Description:{describe}</span>
					</div>
					<div className="detail-item">
						<span className="label">Solution:{solution}</span>
					</div>
				</div>
				<div className="issue-actions">
					<Link to={`/UpdateComplaint/${_id}`}>Update</Link>
					<button onclick={deleteHandler} className="btn btn-primary">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default DisplayComplaint;
