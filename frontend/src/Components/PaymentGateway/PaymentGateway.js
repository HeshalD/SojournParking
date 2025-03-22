import React from "react";
import './PaymentGateway.css'
import { useNavigate } from "react-router-dom";

function PaymentGateway() {

  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    
    // Simulating payment processing
    alert("Processing Payment...");

    // Navigate to payment confirmation
    navigate("/paymentConfirmation");
  };

  return (
    <div>
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Payment Gateway</title>
        <div className="pg-payment-container">
          <h1 className="pg-form-title">Secure Payment</h1>
          <form>
            <div className="pg-form-group">
              <label htmlFor="cardholder" className="pg-label">Cardholder Name</label>
              <input
                type="text"
                id="cardholder"
                className="pg-input"
                placeholder="John Doe"
                required=""
              />
            </div>
            <div className="pg-form-group">
              <label htmlFor="cardnumber" className="pg-label">Card Number</label>
              <input
                type="text"
                id="cardnumber"
                className="pg-input"
                placeholder="1234 5678 9012 3456"
                required=""
              />
            </div>
            <div className="pg-form-row">
              <div className="pg-form-group pg-half">
                <label htmlFor="expiry" className="pg-label">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  className="pg-input"
                  placeholder="MM/YY"
                  required=""
                />
              </div>
              <div className="pg-form-group pg-half">
                <label htmlFor="cvv" className="pg-label">CVV</label>
                <input 
                  type="password" 
                  id="cvv" 
                  className="pg-input"
                  placeholder="***" 
                  required="" 
                />
              </div>
            </div>
            <button type="submit" className="pg-pay-btn">
              Pay Now
            </button>
          </form>
        </div>
      </>
    </div>
  );
}

export default PaymentGateway;