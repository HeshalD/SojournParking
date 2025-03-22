import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentReceipt() {
  const location = useLocation();
  const navigate = useNavigate();

 
  const user = location.state?.user || {};

 
  const { _id = "N/A", LicensePlateNo = "Unknown", EntryTime = "Not available", ExitTime = "Not available" } = user;

  
  if (!location.state || !user) {
    return (
      <div>
        <h2>Error: No payment data available</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const payNow = () => {
    navigate("/paymentPortal", { state: { user } });
  };

  return (
    <div>
      <h1>Parking Payment Receipt</h1>
      <p>Thank you for using Sojourn Parking</p>

      <div>
        <p><strong className="label">ID:</strong> {_id}</p>
        <p><strong>License Plate No:</strong> {LicensePlateNo}</p>
        <p><strong>Entry Time:</strong> {EntryTime}</p>
        <p><strong>Exit Time:</strong> {ExitTime}</p>
      </div>

      <button onClick={payNow}>Pay</button>
    </div>
  );
}



export default PaymentReceipt;
