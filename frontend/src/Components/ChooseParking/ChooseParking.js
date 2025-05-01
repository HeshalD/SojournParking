import React, { useState, useEffect } from 'react';
import './ChooseParking.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "../Header/Header"
import Footer from "../Footer/Footer"

function ChooseParking() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        licensePlate: '',
        entryDateTime: ''
    });
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSlots();
    }, []);

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

        if (name === "name") {
            if (!/^[A-Za-z\s]*$/.test(value)) return;
        }

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
                userName: formData.name,
                email: formData.email,
                licensePlate: formData.licensePlate,
                entryTime: entryDateTime,
                isReserved: true
            };

            const response = await axios.post("http://Localhost:5000/slots", reservationData);

            await axios.post("http://localhost:5000/sessions", {
                name: formData.name,
                licensePlate: formData.licensePlate
            });

            return response.data;

        } catch (err) {
            console.error("Error making reservation:", err);
            setError("Failed to reserve parking slot");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const submitForm = async (e) => {
        e.preventDefault();

        const { name, email, licensePlate, entryDateTime } = formData;

        if (!name.trim()) {
            setError("Name cannot be empty.");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
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
            navigate('/madeReservations');
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <><Header />
            <div className="parking-container">
                <h2>CHOOSE A PARKING SLOT</h2>
                <p className="parking-instructions">Select an available parking slot to make your reservation. Reserved slots are marked in red.</p>
                {error && <p className="error-message">{error}</p>}
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
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        id="name"
                                        placeholder="Enter your full name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email address"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange} />
                                </div>
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