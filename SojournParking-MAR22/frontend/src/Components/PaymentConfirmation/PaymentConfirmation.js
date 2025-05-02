import React from 'react'
import "./PaymentConfirmation.css";

function PaymentConfirmation() {
  return (
    <div className="payment-confirmation-container">
      <div className="container">
        <div className="payment-card">
          <div className="payment-header">
            <span className="success-icon">✔</span>
            <h2>Payment Successful</h2>
            <p>Thank you for using our parking service!</p>
          </div>
          <div className="payment-summary">
            <div className="row">
              <span>Total Amount Paid:</span>
              <span>$10.00</span>
            </div>
            <div className="row">
              <span>Payment Date &amp; Time:</span>
              <span>20/03/2025 14:30</span>
            </div>
            <div className="row">
              <span>Payment Method:</span>
              <span>Credit Card</span>
            </div>
            <div className="row">
              <span>Transaction ID:</span>
              <span>#123456789</span>
            </div>
          </div>
          <hr />
          <h3>Receipt Breakdown</h3>
          <div className="receipt">
            <div className="row">
              <span>Vehicle Number:</span>
              <span>ABC-1234</span>
            </div>
            <div className="row">
              <span>Entry Time:</span>
              <span>20/03/2025 12:00</span>
            </div>
            <div className="row">
              <span>Exit Time:</span>
              <span>20/03/2025 14:30</span>
            </div>
            <div className="row">
              <span>Duration Parked:</span>
              <span>2h 30m</span>
            </div>
            <div className="row">
              <span>Parking Rate:</span>
              <span>$4.00/hr</span>
            </div>
            <div className="row total">
              <span>Subtotal:</span>
              <span>$10.00</span>
            </div>
          </div>
          <hr />
          <div className="buttons">
            <button className="btn">Download</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentConfirmation