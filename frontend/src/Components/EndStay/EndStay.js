import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EndStay.css';

function EndStay() {
    const navigate = useNavigate();
    const [licensePlate, setLicensePlate] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleEndStay = async (e) => {
        e.preventDefault(); // Prevent form reload

        if (!licensePlate.trim()) {
            setMessage("Please enter a valid license plate.");
            return;
        }

        // Capture the current exit time
        const exitTime = new Date().toTimeString().slice(0, 5); // HH:mm format

        // Navigate to confirmation page and pass data
        console.log("Navigating with:", licensePlate, exitTime);
        navigate(`/endStayConfirmation/${licensePlate}`, {
            state: { exitTime:exitTime }
        });
    };

    return (
        <div className="end-stay-container">
            <h2>End Your Parking Stay</h2>

            <form onSubmit={handleEndStay}>
                <input
                    type="text"
                    placeholder="Enter License Plate"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Verifying...' : 'End Stay'}
                </button>
            </form>

            {message && <p className="status-message">{message}</p>}
        </div>
    );
}

export default EndStay;
