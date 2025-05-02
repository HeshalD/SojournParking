import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ResponsePageS.css';

function ResponsePageS() {
  const navigate = useNavigate();

  const handleEdit = () => {
    // This will be enhanced to properly handle edit navigation
    navigate('/displaysecissue'); // Goes back to previous page
  };

  const handleGoBack = () => {
    navigate('/'); // Returns to home page
  };

  return (
    <div className="response-confirmation">
      <div className="response-confirmation__card">
        <h1 className="response-confirmation__title">Your Emergency Request is Received!</h1>
        <p className="response-confirmation__message">
          Thank you for reaching out. Our team is reviewing your request, and the
          nearest available responder will assist you shortly. Stay calm, help is on the way!
        </p>
        
        
        
        <div className="response-confirmation__actions">
          <button 
            className="response-confirmation__button response-confirmation__button--edit"
            onClick={handleEdit}
          >
            Edit Request
          </button>
          <button 
            className="response-confirmation__button response-confirmation__button--home"
            onClick={handleGoBack}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResponsePageS;