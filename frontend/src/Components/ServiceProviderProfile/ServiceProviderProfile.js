import React, {useState, useEffect} from 'react';
import axios from "axios";
import ServiceProvider from '../Provider/Provider';
import './ServiceProviderProfile.css'; // We'll create this CSS file with scoped styles
import { Link } from 'react-router-dom';

function ServiceProviderProfile() {
  const [serviceProviders, setServiceProviders] = useState([]);
  
  const URL = "http://localhost:5000/ServiceProviders";
  
  const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
  }
  
  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("API Response:", data);
      setServiceProviders(data.ServiceProviders);
    });
  }, []);
  
  return (
    <div className="service-provider-profile">
      <div className="header">
        <h2>Service Providers Profiles</h2>
      </div>
      
      <div className="providers-container">
        {serviceProviders && serviceProviders.map((serviceProvider, i) => (
          <ServiceProvider 
            key={i} 
            serviceProvider={serviceProvider}
          />
        ))}
      </div>

      <Link to='/addServiceProvider'>Add New Service Provider</Link>
    </div>
  )
}

export default ServiceProviderProfile;