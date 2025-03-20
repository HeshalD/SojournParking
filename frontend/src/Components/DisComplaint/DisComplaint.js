import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayComplaint from './DisplayComplaint/DisplayComplaint';

const URL = 'http://localhost:5000/complaint';

const fetchHandler = async () => {
	return await axios.get(URL).then((res) => res.data);
};

function DisComplaint() {
	const [complaint, setCompaint] = useState();
	useEffect(() => {
		fetchHandler().then((data) => setCompaint(data.complaint));
	}, []);

	return (
		<div>
			<h1>Complaint Detais display page</h1>
			<div>
				{complaint &&
					complaint.map((complaint, i) => (
						<div key={i}>
							<Complaint complaint={complaint} />
						</div>
					))}
			</div>
		</div>
	);
}

export default DisComplaint;
