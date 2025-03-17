import React from "react";
import './PaymentGateway.css'

function PaymentGateway() {
  return (
    <div>
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Payment Gateway</title>
        <link rel="stylesheet" href="./payment gateway.css" />
        <div className="payment-container">
          <h1 className="form-title">Secure Payment</h1>
          <form>
            <div className="form-group">
              <label htmlFor="cardholder">Cardholder Name</label>
              <input
                type="text"
                id="cardholder"
                placeholder="John Doe"
                required=""
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardnumber">Card Number</label>
              <input
                type="text"
                id="cardnumber"
                placeholder="1234 5678 9012 3456"
                required=""
              />
            </div>
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="expiry">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  placeholder="MM/YY"
                  required=""
                />
              </div>
              <div className="form-group half">
                <label htmlFor="cvv">CVV</label>
                <input type="password" id="cvv" placeholder="***" required="" />
              </div>
            </div>
            <button type="submit" className="pay-btn">
              Pay Now
            </button>
          </form>
        </div>
      </>
    </div>
  );
}

export default PaymentGateway;
