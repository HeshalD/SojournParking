import React, { useState, useEffect } from 'react';
import './UpdateReservations.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import for navigation
import { useParams } from 'react-router';


function UpdateReservations() {

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
    const lp = useParams().licensePlate
    
    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/slots/${lp}`);
                setFormData(res.data.user || {}); // Ensure safe assignment
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Failed to fetch user data.");
            }
        };
        fetchHandler();
    }, [lp]);

    const sendRequest = async ()=>{
        await axios
        .put(`http://localhost:5000/slots/${lp}`,{
            slotId: selectedSlot,
                userName: formData.name,
                licensePlate: formData.licensePlate,
                entryTime: new Date(`2023-01-01T${formData.entryTime}:00`), // Convert time to Date object
                isReserved: true,
        })
        .then((res)=>res.data);
    }

    // Fetch all slots on component mount
    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const response = await fetch(`http://localhost:5000/slots`);
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
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // Check if a slot is reserved
    const isSlotReserved = (slotId) => {
        return slots.some(slot => slot.slotId === slotId && slot.isReserved);
    };

    const isSlotReservedByCurrentUser = (slotId) => {
    return slots.some(slot => slot.slotId === slotId && slot.licensePlate === lp);
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

    const submitForm = async (e) => {
        e.preventDefault(); // Corrected from prevDefault()
        try {
            await sendRequest();
            // On successful reservation
            closeForm();
            fetchSlots(); // Refresh slots to show updated status
            navigate('/madeReservations'); // Navigate to the same page to refresh
        } catch (err) {
            // Error is already set in sendRequest
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
                            <h3>Update Reeservation</h3>
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

export default UpdateReservations;