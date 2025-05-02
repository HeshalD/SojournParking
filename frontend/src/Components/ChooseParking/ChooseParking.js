import React, { useState, useEffect } from 'react';
import './ChooseParking.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from "../Header/Header"
import Footer from "../Footer/Footer"

function ChooseParking() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [formData, setFormData] = useState({
        licensePlate: '',
        entryDateTime: ''
    });
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check for passed session data from landing page
        console.log("ChooseParking: Location state:", location.state);
        if (location.state?.currentUser) {
            console.log("ChooseParking: Using passed session data:", location.state.currentUser);
            setCurrentUser(location.state.currentUser);
        } else {
            console.log("ChooseParking: No passed session data, fetching...");
            fetchCurrentUser();
        }
        fetchSlots();
    }, [location.state]);

    const fetchCurrentUser = async () => {
        try {
            console.log("ChooseParking: Fetching current user session...");
            const response = await axios.get('http://localhost:5000/sessions/current');
            console.log("ChooseParking: Session response:", response.data);
            if (response.data.user) {
                console.log("ChooseParking: Setting current user:", response.data.user);
                setCurrentUser(response.data.user);
            } else {
                console.log("ChooseParking: No user session found");
                setError("Please login to make a reservation.");
            }
        } catch (err) {
            console.error("ChooseParking: Error fetching user session:", err);
            setError("Please login to make a reservation.");
        }
    };

    // Add console log for currentUser state changes
    useEffect(() => {
        console.log("ChooseParking: Current user state updated:", currentUser);
    }, [currentUser]);

    const fetchSlots = async () => {
        try {
            console.log("Fetching slots...");
            const response = await fetch('http://localhost:5000/slots');
            console.log("Response status:", response.status);
            const data = await response.json();
            console.log("Received data:", data);
            
            if (data.message === "No reservations found") {
                // Initialize with empty slots if none found
                setSlots([]);
            } else {
                setSlots(data.slots || []);
            }
        } catch (err) {
            console.error("Error fetching slots:", err);
            setError("Failed to load parking slots");
        }
    };

    const openForm = (slotId) => {
        setSelectedSlot(slotId);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "licensePlate") {
            const upperValue = value.toUpperCase();
            e.target.value = upperValue;
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const isSlotReserved = (slotId) => {
        return slots.some(slot => slot.slotId === slotId && slot.isReserved);
    };

    const renderSlot = (slotId) => {
        const reserved = isSlotReserved(slotId);
        return (
            <div
                key={slotId}
                className={`slot ${reserved ? 'reserved' : ''}`}
                onClick={() => !reserved && openForm(slotId)}
            >
                {slotId}
            </div>
        );
    };

    const sendRequest = async () => {
        try {
            setLoading(true);
            
            // Create Date object from the datetime-local input
            const entryDateTime = new Date(formData.entryDateTime);
            
            const reservationData = {
                slotId: selectedSlot,
                userName: currentUser.name,
                email: currentUser.email,
                licensePlate: formData.licensePlate,
                entryTime: entryDateTime,
                isReserved: true
            };

            console.log("Sending reservation data:", reservationData);
            const response = await axios.post("http://localhost:5000/slots", reservationData);
            console.log("Reservation response:", response.data);

            return response.data;

        } catch (err) {
            console.error("Error making reservation:", err);
            if (err.response) {
                console.error("Server response:", err.response.data);
                setError(err.response.data.message || "Failed to reserve parking slot");
            } else {
                setError("Failed to reserve parking slot");
            }
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const submitForm = async (e) => {
        e.preventDefault();

        const { licensePlate, entryDateTime } = formData;

        if (!currentUser) {
            setError("User session not found. Please login again.");
            navigate('/login');
            return;
        }

        const licenseRegex = /^[A-Z]{2,3}-\d{4}$/;
        if (!licenseRegex.test(licensePlate)) {
            setError("Invalid license plate format. Use 'XXX-0000' or 'XX-0000'.");
            return;
        }

        if (!entryDateTime) {
            setError("Please select entry date and time.");
            return;
        }

        const selectedDateTime = new Date(entryDateTime);
        const currentDateTime = new Date();
        
        if (selectedDateTime < currentDateTime) {
            setError("Entry time cannot be in the past.");
            return;
        }

        setError(null);

        try {
            await sendRequest();
            closeForm();
            fetchSlots();
            // Redirect to UserDashboard with reservations section active
            navigate('/userDashboard', { state: { activeSection: 'reservations' } });
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <><Header />
            <div className="parking-container">
                <h2>CHOOSE A PARKING SLOT</h2>
                <p className="parking-instructions">Select an available parking slot to make your reservation. Reserved slots are marked in red.</p>
                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                        <button onClick={() => navigate('/login')} className="login-btn">
                            Login
                        </button>
                    </div>
                )}
                <div className="icon">
                    <img src="/Icons/door.png" alt="Building" />
                    <p>Building Entrance</p>
                </div>
                <div className="parking-layout">
                    {/* First Row */}
                    <div className="row">
                        <div className="icon entrance">
                            <img src="/Icons/gate.png" alt="Entrance" />
                            <p>Entrance</p>
                        </div>
                        {["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"].map(slot => renderSlot(slot))}
                    </div>

                    {/* Second Row */}
                    <div className="row arrows">
                        <span>➡</span>
                        <span>➡</span>
                        <span>➡</span>
                    </div>
                    <div className="row">
                        {["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"].map(slot => renderSlot(slot))}
                    </div>

                    {/* Third Row */}
                    <div className="row arrows">
                        <span>⬅</span>
                        <span>⬅</span>
                        <span>⬅</span>
                    </div>
                    <div className="row">
                        <div className="icon exit">
                            <img src="/Icons/gate.png" alt="Exit" />
                            <p>Exit</p>
                        </div>
                        {["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"].map(slot => renderSlot(slot))}
                    </div>

                    {/* Form popup */}
                    {isFormOpen && (
                    <div className="form-container">
                        <div className="form-box">
                            <span className="close-btn" onClick={closeForm}>
                                X
                            </span>
                            <h3>Reserve Parking Slot</h3>
                            <p className="selected-slot-info">Selected Slot: {selectedSlot}</p>
                            <p className="form-instructions">Please fill in your details to complete the reservation.</p>
                            <form onSubmit={submitForm}>
                                <div className="form-group">
                                    <label htmlFor="licensePlate">License Plate Number</label>
                                    <input
                                        name="licensePlate"
                                        type="text"
                                        id="licensePlate"
                                        placeholder="Format: XXX-0000 or XX-0000"
                                        required
                                        value={formData.licensePlate}
                                        onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="entryDateTime">Entry Date & Time</label>
                                    <input
                                        name="entryDateTime"
                                        type="datetime-local"
                                        id="entryDateTime"
                                        required
                                        value={formData.entryDateTime}
                                        onChange={handleInputChange} />
                                </div>
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Processing Reservation...' : 'Confirm Reservation'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default ChooseParking;