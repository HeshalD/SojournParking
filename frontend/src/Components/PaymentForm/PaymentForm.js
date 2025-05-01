import React, { useEffect, useState } from "react";
import './PaymentForm.css'; 
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function PaymentForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const licensePlate = location.state?.licensePlate || "";

  const [reservation, setReservation] = useState({
    LicensePlateNo: "",
    EntryTime: "",
    ExitTime: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!licensePlate) {
      setError("No license plate found. Please try again.");
      setLoading(false);
      return;
    }

    // Use the passed reservation data
    setReservation({
      LicensePlateNo: licensePlate,
      EntryTime: location.state?.entryTime || "",
      ExitTime: location.state?.exitTime || ""
    });
    setLoading(false);
  }, [licensePlate, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use the passed slot data to create payment
      const response = await axios.post("http://localhost:5000/api/payments", {
        slotId: location.state?.slotId // Pass the slot ID from the state
      });

      console.log("Payment creation response:", response.data);

      if (response.data.success) {
        alert("Payment processed successfully!");
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
      alert(`Payment Error: ${errorMessage}`);
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
                type="datetime-local" 
                name="EntryTime" 
                id="entryTime" 
                value={reservation.EntryTime} 
                readOnly
              />
            </div>
            <div className="payment-form-group">
              <label htmlFor="exitTime">Exit Time</label>
              <input 
                type="datetime-local" 
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
