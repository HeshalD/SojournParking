import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import './ServiceProviderTable.css';

const ServiceProviderTable = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get('http://localhost:5000/ServiceProviders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServiceProviders(response.data.ServiceProviders);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch service providers");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceProviders();
  }, []);

  if (loading) {
    return (
      <div className="service-provider-loading">
        <FaSpinner className="spinner" />
        <p>Loading service providers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="service-provider-error">
        <FaExclamationTriangle /> {error}
      </div>
    );
  }

  return (
    <div className="service-provider-container">
      <h1>Service Providers</h1>
      <div className="table-container">
        <table className="service-provider-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Specialization</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {serviceProviders.length > 0 ? (
              serviceProviders.map((provider) => (
                <tr key={provider._id}>
                  <td>{provider.fullname}</td>
                  <td>{provider.contactnumber}</td>
                  <td>{provider.specialization}</td>
                  <td>{provider.location}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-providers">
                  No service providers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceProviderTable; 