import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Complaint({complaint ={}}) {
	const { _id ="N/A", date="N/A", comp="N/A", describe="N/A", solution="N/A" } = complaint;
    console.log("Complaint Data:", complaint);

	const history = useNavigate();

	const deleteHandler = async(_id) => {
        console.log(_id);
        try {
          const response = await axios.delete(`http://localhost:5000/complaint/${_id}`);
          if (response.status === 200) {
            console.log({message:"Deletion Successful"})
            window.location.reload();
          } else {
            console.log({message:""})
          }
        } catch (err) {
          console.error("Error deleting service provider:", err);
        }
    }


	return (
		<div>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Issue Tracker</title>
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
					<Link to={`/updateComplaint/${_id}`}>Update</Link>
					<button onClick={deleteHandler} className="btn btn-primary">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default Complaint;
