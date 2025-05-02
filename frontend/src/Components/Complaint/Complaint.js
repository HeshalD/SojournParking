import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Complaint({complaint ={}}) {
	const { _id ="N/A", date="N/A", email="N/A", comp="N/A", describe="N/A", solution="N/A" } = complaint;
    console.log("Complaint Data:", complaint);

	const history = useNavigate();

	const deleteHandler = async () => {
        if (!_id || _id === "N/A") {
            console.error("Invalid complaint ID");
            return;
        }

        if (window.confirm('Are you sure you want to delete this complaint?')) {
            try {
                const response = await axios.delete(`http://localhost:5000/complaint/${_id}`);
                if (response.status === 200) {
                    console.log("Deletion Successful");
                    window.location.reload();
                }
            } catch (err) {
                console.error("Error deleting complaint:", err);
                alert("Failed to delete complaint. Please try again.");
            }
        }
    }

    const sendConfirmationEmail = async () => {
        // Validate email
        if (email === "N/A" || !email.includes('@')) {
            alert('Invalid email address. Cannot send confirmation email.');
            return;
        }

        try {
            // Format the date to ensure it's in a valid format
            const formattedDate = date === "N/A" ? new Date().toISOString() : new Date(date).toISOString();
            
            const response = await axios.post('http://localhost:5000/complaint/send-confirmation', {
                email: email,
                complaintDetails: {
                    date: formattedDate,
                    comp: comp,
                    describe: describe
                }
            });
            
            if (response.data.success) {
                alert('Confirmation email sent successfully');
            } else {
                alert('Failed to send confirmation email');
            }
        } catch (error) {
            console.error('Error sending confirmation email:', error);
            alert('Error sending confirmation email. Please try again later.');
        }
    };

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
						<span className="label">Email:{email}</span>
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
					<button onClick={sendConfirmationEmail} className="btn btn-primary">
						Send Confirmation Email
					</button>
				</div>
			</div>
		</div>
	);
}

export default Complaint;
