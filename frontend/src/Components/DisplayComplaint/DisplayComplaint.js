import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Complaint from '../Complaint/Complaint';
import './DisplayComplaint.css';

const URL = 'http://localhost:5000/complaint';

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
};

function DisplayComplaint() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchHandler()
            .then((data) => {
                console.log("API Response:", data);
                // Check if data.complaints exists, otherwise use data directly
                setComplaints(Array.isArray(data.complaints) ? data.complaints : (Array.isArray(data) ? data : []));
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching complaints:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="display-review-container">Loading...</div>;
    if (error) return <div className="display-review-container">Error: {error}</div>;

    return (
        <div className="display-review-container">
            <h1>Complaint Details Display Page</h1>
            <div className="complaints-list">
                {complaints.length > 0 ? (
                    complaints.map((complaint, i) => (
                        <div key={i} className="complaint-item">
                            <Complaint complaint={complaint} />
                        </div>
                    ))
                ) : (
                    <p>No complaints found</p>
                )}
            </div>
        </div>
    );
}

export default DisplayComplaint;
