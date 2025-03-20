import './DisplayComplaint.css';

function DisplayComplaint() {
	return (
		<>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Issue Tracker</title>
			<link rel="stylesheet" href="../Project/DisplayComplaintStyle.css" />
			<div className="issue-container">
				<div className="issue-header">
					<h3>Issue Details</h3>
					<div className="issue-id">ID: 001</div>
				</div>
				<div className="issue-details">
					<div className="detail-item">
						<span className="label">Issue:</span>
						<span className="value">Login Failure</span>
					</div>
					<div className="detail-item">
						<span className="label">Description:</span>
						<span className="value">
							Users are unable to log in due to incorrect password validation.
						</span>
					</div>
					<div className="detail-item">
						<span className="label">Solution:</span>
						<span className="value">
							Updated password validation logic to allow case-sensitive inputs.
						</span>
					</div>
				</div>
				<div className="issue-actions">
					<button className="btn btn-secondary">Edit</button>
					<button className="btn btn-primary">Resolve</button>
				</div>
			</div>
		</>
	);
}
