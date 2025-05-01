import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentRecipt.css";

function PaymentReceipt() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user || {};
  const { 
    _id = "N/A", 
    LicensePlateNo = "Unknown", 
    EntryTime = "Not available", 
    ExitTime = "Not available"
  } = user;

  // Calculate duration and total amount
  const ratePerHour = 3; // $3 per hour
  let durationHours = 0;
  let totalAmount = 0;

  if (EntryTime !== "Not available" && ExitTime !== "Not available") {
    const entryTime = new Date(EntryTime);
    const exitTime = new Date(ExitTime);
    durationHours = (exitTime - entryTime) / (1000 * 60 * 60); // Convert milliseconds to hours
    totalAmount = Math.ceil(durationHours) * ratePerHour; // Round up to nearest hour
  }

  if (!location.state || !user) {
    return (
      <div className="payment-receipt-container">
        <div className="error-message">
          <h2>Error: No payment data available</h2>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const payNow = () => {
    // Prepare parking details for PaymentConfirmation
    const parkingDetails = {
      licensePlate: LicensePlateNo,
      entryTime: EntryTime,
      exitTime: ExitTime,
      duration: `${durationHours.toFixed(2)} hours`,
      rate: ratePerHour,
      totalAmount: totalAmount
    };

    navigate("/paymentPortal", { 
      state: { 
        user,
        amount: totalAmount,
        duration: `${durationHours.toFixed(2)} hours`,
        rate: ratePerHour,
        parkingDetails // Pass parking details to payment portal
      } 
    });
  };

  return (
    <div className="payment-receipt-container">
      <div className="receipt-card">
        <div className="receipt-header">
          <h1>Parking Payment Receipt</h1>
          <p>Thank you for using Sojourn Parking</p>
        </div>

        <div className="receipt-details">
          <div className="detail-row">
            <span className="label">ID:</span>
            <span className="value">{_id}</span>
          </div>
          <div className="detail-row">
            <span className="label">License Plate No:</span>
            <span className="value">{LicensePlateNo}</span>
          </div>
          <div className="detail-row">
            <span className="label">Entry Time:</span>
            <span className="value">{formatDate(EntryTime)}</span>
          </div>
          <div className="detail-row">
            <span className="label">Exit Time:</span>
            <span className="value">{formatDate(ExitTime)}</span>
          </div>
          <div className="detail-row">
            <span className="label">Duration:</span>
            <span className="value">{`${durationHours.toFixed(2)} hours`}</span>
          </div>
          <div className="detail-row">
            <span className="label">Rate:</span>
            <span className="value">${ratePerHour.toFixed(2)} per hour</span>
          </div>
          <div className="detail-row total">
            <span className="label">Total Amount:</span>
            <span className="value">${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="receipt-actions">
          <button className="pay-button" onClick={payNow}>Pay Now</button>
        </div>
      </div>
    </div>
  );
}

export default PaymentReceipt;
