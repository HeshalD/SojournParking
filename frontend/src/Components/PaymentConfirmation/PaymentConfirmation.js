import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./PaymentConfirmation.css";

function PaymentConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { receipt, paymentMethod, cardLastFour, parkingDetails } = location.state || {};

  if (!receipt) {
    return (
      <div className="payment-confirmation">
        <div className="confirmation-card">
          <h2 className="confirmation-title">Error</h2>
          <div className="error-message">
            <p>No payment information available</p>
          </div>
          <div className="confirmation-actions">
            <button 
              className="confirmation-button button-secondary"
              onClick={() => navigate('/')}
            >
              Return Home
            </button>
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
    <div className="payment-confirmation">
      <div className="confirmation-card">
        <h2 className="confirmation-title">Payment Successful</h2>
        <p className="confirmation-message">Thank you for using our parking service!</p>
        
        <div className="confirmation-details">
          <div className="detail-item">
            <span className="detail-label">Total Amount Paid:</span>
            <span className="detail-value">${receipt.amount.toFixed(2)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Payment Date & Time:</span>
            <span className="detail-value">{formatDate(receipt.paymentDate)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Payment Method:</span>
            <span className="detail-value">{paymentMethod} ending in {cardLastFour}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Transaction ID:</span>
            <span className="detail-value">#{receipt.paymentId}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Status:</span>
            <span className="detail-value">{receipt.status}</span>
          </div>
        </div>

        <h3 className="confirmation-title">Parking Details</h3>
        <div className="confirmation-details">
          <div className="detail-item">
            <span className="detail-label">License Plate:</span>
            <span className="detail-value">{parkingDetails?.licensePlate || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Entry Time:</span>
            <span className="detail-value">{parkingDetails?.entryTime ? formatDate(parkingDetails.entryTime) : 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Exit Time:</span>
            <span className="detail-value">{parkingDetails?.exitTime ? formatDate(parkingDetails.exitTime) : 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Duration:</span>
            <span className="detail-value">{parkingDetails?.duration || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Rate:</span>
            <span className="detail-value">${parkingDetails?.rate?.toFixed(2) || '0.00'} per hour</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Parking Fee:</span>
            <span className="detail-value">${parkingDetails?.totalAmount?.toFixed(2) || '0.00'}</span>
          </div>
        </div>

        <div className="confirmation-actions">
          <button 
            className="confirmation-button button-primary"
            onClick={() => window.print()}
          >
            Download Receipt
          </button>
          <button 
            className="confirmation-button button-secondary"
            onClick={() => navigate('/')}
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentConfirmation;