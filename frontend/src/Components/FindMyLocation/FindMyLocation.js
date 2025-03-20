import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './FindMyLocation.css'

function FindMyLocation() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();  // Initialize navigate hook
  const params = useParams()
  const id = params.id;
  console.log("ID", id);

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/slots/id/${id}`);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchHandler();
  }, [id]);

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
    }
  };

  const openForm = (slotId) => {
    setSelectedSlot(slotId);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  // Check if a slot is reserved
  const isSlotReserved = (slotId) => {
    return slots.some(slot => slot.slotId === slotId && slot.isReserved);
  };

  const isSlotReservedByCurrentUser = (slotId) => {
    return slots.some(slot => slot.slotId === slotId && slot._id === id);
  };

  // Generate slot element with appropriate class based on reservation status
  const renderSlot = (slotId) => {
    const reserved = isSlotReserved(slotId);
    const reservedByCurrentUser = isSlotReservedByCurrentUser(slotId);
    const isSelected = selectedSlot === slotId;

    return (
      <div
        key={slotId}
        className={`slot ${reserved ? 'reserved' : ''} ${reservedByCurrentUser ? 'your-reservation' : ''} ${isSelected ? 'selected' : ''}`}
        onClick={() => !reserved && openForm(slotId)}
      >
        {slotId} {reservedByCurrentUser ? " " : ""}
      </div>
    );
  };



  return (
    <div className="parking-container">
      <h2>FIND MY PARKING LOCATION</h2>
      
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
      
      <div className="legend">
                <div className="legendItem">
                    <div className="yourSpot"></div>
                    <span>Your Spot</span>
                </div>
                <div className="legendItem">
                    <div className="reserved"></div>
                    <span>Reserved</span>
                </div>
                <div className="legendItem">
                    <div className="legendBox available"></div>
                    <span>Available</span>
                </div>
      </div>
      </div>
    </div>
  );
}

export default FindMyLocation;