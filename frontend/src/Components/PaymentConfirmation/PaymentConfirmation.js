import React from 'react';
import { useLocation } from 'react-router-dom';
import "./PaymentConfirmation.css";

function PaymentConfirmation() {
  const location = useLocation();
  const { receipt, paymentMethod, cardLastFour, parkingDetails } = location.state || {};

  if (!receipt) {
    return (
      <div className="payment-confirmation-container">
        <div className="container">
          <div className="payment-card">
            <div className="payment-header">
              <span className="error-icon">⚠</span>
              <h2>Error</h2>
              <p>No payment information available</p>
            </div>
          </div>
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
              <span>${receipt.amount.toFixed(2)}</span>
            </div>
            <div className="row">
              <span>Payment Date & Time:</span>
              <span>{formatDate(receipt.paymentDate)}</span>
            </div>
            <div className="row">
              <span>Payment Method:</span>
              <span>{paymentMethod} ending in {cardLastFour}</span>
            </div>
            <div className="row">
              <span>Transaction ID:</span>
              <span>#{receipt.paymentId}</span>
            </div>
            <div className="row">
              <span>Status:</span>
              <span className={`status-${receipt.status}`}>{receipt.status}</span>
            </div>
          </div>
          <hr />
          <h3>Parking Details</h3>
          <div className="parking-details">
            <div className="row">
              <span>License Plate:</span>
              <span>{parkingDetails?.licensePlate || 'N/A'}</span>
            </div>
            <div className="row">
              <span>Entry Time:</span>
              <span>{parkingDetails?.entryTime ? formatDate(parkingDetails.entryTime) : 'N/A'}</span>
            </div>
            <div className="row">
              <span>Exit Time:</span>
              <span>{parkingDetails?.exitTime ? formatDate(parkingDetails.exitTime) : 'N/A'}</span>
            </div>
            <div className="row">
              <span>Duration:</span>
              <span>{parkingDetails?.duration || 'N/A'}</span>
            </div>
            <div className="row">
              <span>Rate:</span>
              <span>${parkingDetails?.rate?.toFixed(2) || '0.00'} per hour</span>
            </div>
            <div className="row total">
              <span>Parking Fee:</span>
              <span>${parkingDetails?.totalAmount?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
          <hr />
          <div className="buttons">
            <button className="btn" onClick={() => window.print()}>Download Receipt</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentConfirmation;