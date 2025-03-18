import React, { useEffect, useState } from 'react';
import './MadeReservations.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const URL = "http://localhost:5000/slots";

axios.defaults.withCredentials = true;

function MadeReservations() {

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('http://localhost:5000/sessions/current');
                setCurrentUser(response.data.user);
            } catch (err) {
                console.error("No active session:", err);
                // Redirect to login if no session is found
                // navigate('/login'); // Uncomment if you have a login page
            }
        };
        fetchCurrentUser();
    }, [navigate]);

    // Define the fetchReservations function
    const fetchReservations = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/slots');

            if (response.data && response.data.slots) {
                // Filter only reserved slots
                let activeReservations = response.data.slots.filter(slot => slot.isReserved);

                // Ensure currentUser exists before filtering
                if (currentUser && currentUser.licensePlate) {
                    activeReservations = activeReservations.filter(
                        reservation => reservation.licensePlate === currentUser.licensePlate
                    );
                }

                setReservations(activeReservations);
            } else {
                setReservations([]);
            }
        } catch (err) {
            console.error("Error fetching reservations:", err);
            setError("Failed to load reservations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentUser) {
            fetchReservations();
        } else {
            setLoading(false);
        }
    }, [currentUser]); // Re-run when currentUser changes

    // Format time from ISO string to readable format
    const formatTime = (isoTime) => {
        if (!isoTime) return "N/A";
        try {
            const date = new Date(isoTime);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (err) {
            console.error("Error formatting time:", err);
            return isoTime;
        }
    };

    const cancelReservation = async (reservationId) => {
        try {
            // Make API call to cancel reservation (use the correct API endpoint)
            const response = await axios.delete(`http://localhost:5000/slots/${reservationId}`);
            // After successful cancellation, refetch the reservations
            if (response.status === 200) {
                console.log({message:"Deletion Successfull"})
                fetchReservations(); // Refresh the reservations
                navigate("/madeReservations"); // Redirect back to the reservation page
            }else{
                console.log({message:""})
            }
        } catch (err) {
            console.error("Error canceling reservation:", err);
            setError("Failed to cancel reservation");
        }
    };

    if (loading) return <div className="loading">Loading reservations...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="reservations-container">
            
            {reservations.length > 0 ? (
                reservations.map((reservation, i) => (
                    <div key={i} className="sidebar-reservation">
                        <div className="sidebar-reservation-header">
                            <div className="sidebar-header-content">
                                <h3>Your Reservation</h3>
                                <span className="sidebar-status active">Active</span>
                            </div>
                            <div className="sidebar-reservation-id">{reservation.slotId}</div>
                        </div>
                        <div className="sidebar-reservation-details">
                            <div className="sidebar-detail-item">
                                <span className="label">License:</span>
                                <span className="value">{reservation.licensePlate}</span>
                            </div>
                            <div className="sidebar-detail-item">
                                <span className="label">Name:</span>
                                <span className="value">{reservation.userName}</span>
                            </div>
                            <div className="sidebar-detail-item">
                                <span className="label">Spot:</span>
                                <span className="value">{reservation.slotId}</span>
                            </div>
                            <div className="sidebar-time-details">
                                <div className="sidebar-detail-item">
                                    <span className="label">Entry:</span>
                                    <span className="value">{formatTime(reservation.entryTime)}</span>
                                </div>
                                <div className="sidebar-qr-preview">
                                    <img src="/api/placeholder/50/50" alt="QR Preview" />
                                    <div className="qr-text">View QR</div>
                                </div>
                            </div>
                            <div className="sidebar-detail-item">
                                <span className="label">Exit:</span>
                                <span className="value">{formatTime(reservation.exitTime)}</span>
                            </div>

                            <Link to={`/madeReservations/${reservation.licensePlate}`} className='sidebar-btn-secondary'>
                                Update Reservation
                            </Link>

                            <button
                                className="sidebar-btn-primary"
                                onClick={() => cancelReservation(reservation._id)} // Pass the reservation ID
                            >
                                Cancel Reservation
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="no-reservations">
                    <p>You have no active reservations</p>
                    <Link to={`/madeReservations`} className='sidebar-btn-secondary'>
                    Make a Reservation
                    </Link>
                </div>
            )}
        </div>
    );
}

export default MadeReservations;
