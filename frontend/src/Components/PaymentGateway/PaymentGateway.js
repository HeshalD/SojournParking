import React, { useState } from "react";
import './PaymentGateway.css'
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

function PaymentGateway() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, amount, duration, rate, parkingDetails } = location.state || {};

  const [formData, setFormData] = useState({
    cardholder: '',
    cardnumber: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Cardholder name validation
    if (!formData.cardholder.trim()) {
      newErrors.cardholder = 'Cardholder name is required';
    } else if (formData.cardholder.length < 3) {
      newErrors.cardholder = 'Cardholder name must be at least 3 characters';
    }

    // Card number validation
    if (!formData.cardnumber.trim()) {
      newErrors.cardnumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardnumber.replace(/\s/g, ''))) {
      newErrors.cardnumber = 'Card number must be 16 digits';
    }

    // Expiry date validation
    if (!formData.expiry.trim()) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiry)) {
      newErrors.expiry = 'Expiry date must be in MM/YY format';
    } else {
      const [month, year] = formData.expiry.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      if (parseInt(year) < currentYear || 
          (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiry = 'Card has expired';
      }
    }

    // CVV validation
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardnumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    // Format expiry date
    else if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '')
        .replace(/^(\d{2})/, '$1/')
        .substr(0, 5);
    }
    // Format CVV
    else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substr(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    setIsSubmitting(true);
    try {
        // Format the data before sending
        const paymentData = {
            cardholder: formData.cardholder.trim(),
            cardnumber: formData.cardnumber.replace(/\s/g, ''), // Remove spaces from card number
            expiry: formData.expiry,
            cvv: formData.cvv,
            amount: amount || 0,
            parkingDetails: parkingDetails || {
                licensePlate: user?.LicensePlateNo || 'N/A',
                entryTime: user?.EntryTime || new Date().toISOString(),
                exitTime: user?.ExitTime || new Date().toISOString(),
                duration: duration || '0 hours',
                rate: rate || 0,
                totalAmount: amount || 0
            }
        };

        console.log('Sending payment data:', {
            ...paymentData,
            cardnumber: '**** **** **** ' + paymentData.cardnumber.slice(-4),
            cvv: '***'
        });

        const response = await axios.post('http://localhost:5000/payment', paymentData);

        if (response.data.success) {
            // Pass receipt details to the confirmation page
            navigate("/paymentConfirmation", { 
                state: { 
                    receipt: response.data.receipt,
                    paymentMethod: 'Credit Card',
                    cardLastFour: response.data.receipt.cardLastFour,
                    parkingDetails: paymentData.parkingDetails
                } 
            });
        } else {
            alert("Payment failed. Please try again.");
        }
    } catch (error) {
        console.error('Payment error:', error);
        if (error.response) {
      
            alert(error.response.data.message || "Payment failed. Please try again.");
        } else if (error.request) {
      
            alert("No response from server. Please try again.");
        } else {
           
            alert("An error occurred. Please try again.");
        }
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div>
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Payment Gateway</title>
        <div className="pg-payment-container">
          <h1 className="pg-form-title">Secure Payment</h1>
          <form onSubmit={handleSubmit}>
            <div className="pg-form-group">
              <label htmlFor="cardholder" className="pg-label">Cardholder Name</label>
              <input
                type="text"
                id="cardholder"
                name="cardholder"
                className={`pg-input ${errors.cardholder ? 'error' : ''}`}
                placeholder="John Doe"
                value={formData.cardholder}
                onChange={handleChange}
              />
              {errors.cardholder && <span className="error-message">{errors.cardholder}</span>}
            </div>
            <div className="pg-form-group">
              <label htmlFor="cardnumber" className="pg-label">Card Number</label>
              <input
                type="text"
                id="cardnumber"
                name="cardnumber"
                className={`pg-input ${errors.cardnumber ? 'error' : ''}`}
                placeholder="1234 5678 9012 3456"
                value={formData.cardnumber}
                onChange={handleChange}
              />
              {errors.cardnumber && <span className="error-message">{errors.cardnumber}</span>}
            </div>
            <div className="pg-form-row">
              <div className="pg-form-group pg-half">
                <label htmlFor="expiry" className="pg-label">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  className={`pg-input ${errors.expiry ? 'error' : ''}`}
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                />
                {errors.expiry && <span className="error-message">{errors.expiry}</span>}
              </div>
              <div className="pg-form-group pg-half">
                <label htmlFor="cvv" className="pg-label">CVV</label>
                <input 
                  type="password" 
                  id="cvv" 
                  name="cvv"
                  className={`pg-input ${errors.cvv ? 'error' : ''}`}
                  placeholder="***" 
                  value={formData.cvv}
                  onChange={handleChange}
                />
                {errors.cvv && <span className="error-message">{errors.cvv}</span>}
              </div>
            </div>
            <button 
              type="submit" 
              className="pg-pay-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </div>
      </>
    </div>
  );
}

export default PaymentGateway;