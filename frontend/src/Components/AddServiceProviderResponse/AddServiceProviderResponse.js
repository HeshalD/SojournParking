import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddServiceProviderResponse.css';

function AddServiceProviderResponse() {
  const navigate = useNavigate();

  const handleAddAnother = () => {
    navigate('/serviceproviderprofile'); 
  };

  const handleGoToDashboard = () => {
    navigate('/ServiceProviderProfile'); 
  };

  return (
    <div className="service-provider-response">
      <div className="service-provider-response__card">
        <h1 className="service-provider-response__title">Service Provider Added Successfully!</h1>
        <p className="service-provider-response__message">
          The new service provider has been successfully added to the system. 
          They are now available to respond to emergency requests.
        </p>
        
        
        
        <div className="service-provider-response__actions">
          <button 
            className="service-provider-response__button service-provider-response__button--add"
            onClick={handleAddAnother}
          >
            Edit Service Provider
          </button>
          <button 
            className="service-provider-response__button service-provider-response__button--dashboard"
            onClick={handleGoToDashboard}
          >
            View Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddServiceProviderResponse;