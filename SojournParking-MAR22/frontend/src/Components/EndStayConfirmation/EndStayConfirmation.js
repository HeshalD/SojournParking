import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EndStayConfirmation() {
    const { licensePlate } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const updateReservation = async () => {
            try {
                
                const { exitTime } = location.state || {};

                console.log("Received state:", location.state);

                if (!exitTime) {
                    return <p>Error: Exit time not received.</p>;
                }

                const response = await axios.put(`http://localhost:5000/slots/endstay/${licensePlate}`, {
                    exitTime: exitTime
                });

                console.log("Response:", response.data);
                setSuccess(true);
            } catch (err) {
                console.error("Error:", err.response?.data || err.message);
                setError('Failed to update reservation. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        updateReservation();
    }, [licensePlate, location.state]);

    const handleToPayment = () => {
        navigate('/paymentForm', { state: { licensePlate } });
    };
    

    if (loading) {
        return (
            <div className="end-stay-confirmation">
                <h2>Processing...</h2>
                <p>Please wait while we update your reservation.</p>
            </div>
        );
    }

    return (
        <div className="end-stay-confirmation">
            <h2>{success ? 'Reservation Ended Successfully' : 'Error'}</h2>

            {success ? (
                <div className="success-message">
                    <p>Your parking stay has been ended successfully.</p>
                    <p>License Plate: <strong>{licensePlate}</strong></p>
                    <p>Exit Time: <strong>{location.state?.exitTime}</strong></p>
                    <button onClick={handleToPayment}>Proceed to Payment</button>

                </div>
            ) : (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={() => navigate('/endStay')}>Try Again</button>
                </div>
            )}
        </div>
    );
}

export default EndStayConfirmation;
