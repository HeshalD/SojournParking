import React from 'react';
import './RealTimeReservationMade.css';

function RealTimeReservationMade() {
  return (
    <div className="rt-reservation-container">
      <h1 className="rt-heading">Your reservation is placed successfully!</h1>
      <img src="/Images/Tick.png" className="rt-tick" alt="Success Tick" width={100} />
      <p className="rt-message">
        We will let you know the parking fee when you leave the establishment.  
        <br /> Have a nice day!
      </p>
    </div>
  );
}

export default RealTimeReservationMade;
