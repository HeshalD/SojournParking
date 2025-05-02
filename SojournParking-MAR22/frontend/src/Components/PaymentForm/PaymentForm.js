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

    const fetchReservation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/slots/license/${licensePlate}`);
        const { slot } = response.data;

        setReservation({
          LicensePlateNo: slot.licensePlate,
          EntryTime: new Date(slot.entryTime).toISOString().slice(0, 16), // Convert to input datetime format
          ExitTime: new Date(slot.exitTime).toISOString().slice(0, 16)
        });
      } catch (err) {
        setError("Failed to fetch reservation details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [licensePlate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/pay", {
        LicensePlateNo: reservation.LicensePlateNo,
        EntryTime: reservation.EntryTime,
        ExitTime: reservation.ExitTime
      });

      navigate("/paymentReceipt", { state: { user: reservation } });
    } catch (err) {
      setError("Payment processing failed. Please try again.");
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
