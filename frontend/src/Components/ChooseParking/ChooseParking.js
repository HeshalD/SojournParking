import React, { useState, useEffect } from 'react';
import './ChooseParking.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import for navigation

function ChooseParking() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        licensePlate: '',
        entryTime: ''
    });
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Initialize navigate hook

    // Fetch all slots on component mount
    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const response = await fetch('http://localhost:5000/slots');
            const data = await response.json();
            setSlots(data.slots || []);
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
    

    // Check if a slot is reserved
    const isSlotReserved = (slotId) => {
        return slots.some(slot => slot.slotId === slotId && slot.isReserved);
    };

    // Generate slot element with appropriate class based on reservation status
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
            // Prepare the data to match the server schema
            const reservationData = {
                slotId: selectedSlot,
                userName: formData.name,
                licensePlate: formData.licensePlate,
                entryTime: new Date(`2023-01-01T${formData.entryTime}:00`),
                exitTime: new Date(`2023-01-01T${formData.exitTime}:00`),
                isReserved: true
            };
            
            // Send the data to the server
            const response = await axios.post("http://localhost:5000/slots", reservationData);

            await axios.post("http://localhost:5000/sessions",{
                name: formData.name,
                licensePlate: formData.licensePlate
            })

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
    
        const { name, licensePlate, entryTime } = formData;
    
        if (!name.trim()) {
            setError("Name cannot be empty.");
            return;
        }

        const licenseRegex = /^[A-Z]{2,3}-\d{4}$/;
        if (!licenseRegex.test(licensePlate)) {
            setError("Invalid license plate format. Use 'XXX-0000' or 'XX-0000'.");
            return;
        }
    
        const currentTime = new Date();
        const selectedTime = new Date(`2023-01-01T${entryTime}:00`);
        if (selectedTime > currentTime) {
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
        <div className="parking-container">
            <h2>CHOOSE A PARKING SLOT</h2>
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
                    {["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"].map(slot => 
                        renderSlot(slot)
                    )}
                </div>
                
                {/* Second Row */}
                <div className="row arrows">
                    <span>➡</span>
                    <span>➡</span>
                    <span>➡</span>
                </div>
                <div className="row">
                    {["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"].map(slot => 
                        renderSlot(slot)
                    )}
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
                    {["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"].map(slot => 
                        renderSlot(slot)
                    )}
                </div>
                
                {/* Form popup */}
                {isFormOpen && (
                    <div className="form-container">
                        <div className="form-box">
                            <span className="close-btn" onClick={closeForm}>
                                X
                            </span>
                            <h3>Reserve Parking Slot</h3>
                            <p>Slot: {selectedSlot}</p>
                            <form onSubmit={submitForm}>
                                <input 
                                    name="name"
                                    type="text" 
                                    id="name" 
                                    placeholder="Your Name" 
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                                <input
                                    name="licensePlate"
                                    type="text"
                                    id="licensePlate"
                                    placeholder="License Plate Number"
                                    required
                                    value={formData.licensePlate}
                                    onChange={handleInputChange}
                                />
                                <input 
                                    name="entryTime"
                                    type="time" 
                                    id="entryTime" 
                                    required
                                    value={formData.entryTime}
                                    onChange={handleInputChange}
                                />
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Reserving...' : 'Reserve'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChooseParking;