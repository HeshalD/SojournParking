// ServiceProviderProfile.js
import React, {useState, useEffect} from 'react';
import './ServiceProviderProfile.css';
import axios from "axios";
import ServiceProviderCard from '../Provider/Provider';

const URL = "http://localhost:4000/ServiceProviders";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ServiceProviderProfile() {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHandler()
      .then((data) => {
        setServiceProviders(data.ServiceProviders || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching service providers:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="service-provider-profile-loading">Loading service providers...</div>;
  if (error) return <div className="service-provider-profile-error">Error: {error}</div>;
  if (!serviceProviders.length) return <div className="service-provider-profile-empty">No service providers found</div>;

  return (
    <div className="service-provider-profile-page">
      <div className="service-provider-profile-container">
        <h1 className="service-provider-profile-header">Service Providers</h1>
        
        <div className="service-provider-profile-list">
          {serviceProviders.map((serviceProvider, i) => (
            <ServiceProviderCard 
              key={serviceProvider._id || i} 
              serviceProvider={serviceProvider} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceProviderProfile;