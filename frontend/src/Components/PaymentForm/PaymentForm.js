import React, { useEffect, useState } from "react";
import './PaymentForm.css'; 
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function PaymentForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { licensePlate, entryTime, exitTime, slotId } = location.state || {};

  const [reservation, setReservation] = useState({
    LicensePlateNo: "",
    EntryTime: "",
    ExitTime: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!licensePlate || !entryTime || !exitTime) {
      setError("Missing reservation data. Please try again.");
      setLoading(false);
      return;
    }

    // Format the times for display
    const formatTime = (time) => {
      if (!time) return "";
      const date = new Date(time);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    setReservation({
      LicensePlateNo: licensePlate,
      EntryTime: formatTime(entryTime),
      ExitTime: formatTime(exitTime)
    });
    setLoading(false);
  }, [licensePlate, entryTime, exitTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use the passed slot data to create payment
      const response = await axios.post("http://localhost:5000/api/payments", {
        slotId: slotId
      });

      console.log("Payment creation response:", response.data);

      if (response.data.success) {
        navigate("/paymentReceipt", { 
          state: { 
            payment: response.data.data,
            user: reservation 
          } 
        });
      } else {
        throw new Error(response.data.message || "Payment processing failed");
      }
    } catch (err) {
      console.error("Payment error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        config: err.config
      });
      const errorMessage = err.response?.data?.message || err.message || "Payment processing failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="payment-form-container">
          <form onSubmit={handleSubmit} className="payment-parking-form">
            <h1>Parking Payment Form</h1>
            <div className="payment-form-group">
              <label htmlFor="licensePlate">License Plate Number</label>
              <input
                type="text"
                name="LicensePlateNo"
                id="licensePlate"
                value={reservation.LicensePlateNo}
                readOnly
              />
            </div>
            <div className="payment-form-group">
              <label htmlFor="entryTime">Entry Time</label>
              <input 
                type="text" 
                name="EntryTime" 
                id="entryTime" 
                value={reservation.EntryTime} 
                readOnly
              />
            </div>
            <div className="payment-form-group">
              <label htmlFor="exitTime">Exit Time</label>
              <input 
                type="text" 
                name="ExitTime" 
                id="exitTime" 
                value={reservation.ExitTime} 
                readOnly
              />
            </div>
            <button type="submit" className="payment-submit-btn">
              Proceed to Payment
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PaymentForm;
