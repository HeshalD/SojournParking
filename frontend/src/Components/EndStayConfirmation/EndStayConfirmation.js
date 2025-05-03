import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EndStayConfirmation.css';

function EndStayConfirmation() {
    const { licensePlate } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reservationData, setReservationData] = useState(null);

    useEffect(() => {
        const updateReservation = async () => {
            try {
                const { exitTime } = location.state || {};
                console.log("Received state:", location.state);

                if (!exitTime) {
                    setError("Error: Exit time not received.");
                    setLoading(false);
                    return;
                }

                // Encode the license plate to handle special characters
                const encodedLicensePlate = encodeURIComponent(licensePlate);
                console.log("Making request to end stay for license plate:", encodedLicensePlate);
                
                const response = await axios.put(`http://localhost:5000/slots/endstay/${encodedLicensePlate}`, {
                    exitTime: exitTime
                });

                console.log("Response:", response.data);
                setSuccess(true);
                setReservationData(response.data.slot);
                
            } catch (err) {
                console.error("Error:", err.response?.data || err.message);
                setError(err.response?.data?.message || 'Failed to update reservation. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        updateReservation();
    }, [licensePlate, location.state]);

    const handleToPayment = () => {
        if (!reservationData) {
            setError("No reservation data available");
            return;
        }

        navigate('/paymentForm', { 
            state: { 
                licensePlate,
                entryTime: reservationData.entryTime,
                exitTime: reservationData.exitTime,
                slotId: reservationData._id
            } 
        });
    };

    if (loading) {
        return (
            <div className="end-stay-confirmation">
                <div className="confirmation-card">
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <h2 className="confirmation-title">Processing...</h2>
                        <p className="confirmation-message">Please wait while we update your reservation.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="end-stay-confirmation">
            <div className="confirmation-card">
                <h2 className="confirmation-title">
                    {success ? 'Reservation Ended Successfully' : 'Error'}
                </h2>

                {success ? (
                    <>
                        <p className="confirmation-message">
                            Your parking stay has been ended successfully.
                        </p>
                        <div className="confirmation-details">
                            <div className="detail-item">
                                <span className="detail-label">License Plate</span>
                                <span className="detail-value">{licensePlate}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Entry Time</span>
                                <span className="detail-value">
                                    {reservationData?.entryTime ? new Date(reservationData.entryTime).toLocaleTimeString() : 'N/A'}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Exit Time</span>
                                <span className="detail-value">
                                    {reservationData?.exitTime ? new Date(reservationData.exitTime).toLocaleTimeString() : 'N/A'}
                                </span>
                            </div>
                        </div>
                        <div className="confirmation-actions">
                            <button 
                                className="confirmation-button button-primary"
                                onClick={handleToPayment}
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="error-message">
                            <p>{error}</p>
                        </div>
                        <div className="confirmation-actions">
                            <button 
                                className="confirmation-button button-secondary"
                                onClick={() => navigate('/endStay')}
                            >
                                Try Again
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default EndStayConfirmation;
