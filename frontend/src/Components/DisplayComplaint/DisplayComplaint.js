import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Complaint from '../Complaint/Complaint';

const URL = 'http://localhost:5000/complaint';

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
};

function DisplayComplaint() {
    const [complaint, setCompaint] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchHandler()
            .then((data) => {
                console.log("API Response:", data);
                setCompaint(data.complaints || []); // Ensure it matches API response
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching complaints:", err);
                setError(err.message);
                setLoading(false);
            });
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

export default DisplayComplaint;
