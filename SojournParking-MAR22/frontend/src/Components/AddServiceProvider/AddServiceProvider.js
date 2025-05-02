import React, { useState } from 'react';
import './AddServiceProvider.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function AddServiceProvider() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    fullname: "",
    contactnumber: "",
    specialization: "",
    location: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => navigate('/ServiceProviderProfile'));
  };

  const sendRequest = async () => {
    return await axios.post("http://localhost:5000/ServiceProviders", {
      fullname: String(inputs.fullname),
      contactnumber: Number(inputs.contactnumber),
      specialization: String(inputs.specialization),
      location: String(inputs.location),
    }).then(res => res.data);
  };

  return (
    <div className="add-page">
      <div className="add-container">
        <div className="add-header">
          <h2>Add a New Mechanic or Medic</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-field">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullname"
              value={inputs.fullname}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>
          
          <div className="form-field">
            <label>Contact Number:</label>
            <input
              type="text"
              name="contactnumber"
              value={inputs.contactnumber}
              onChange={handleChange}
              placeholder="Enter contact number"
              required
            />
          </div>
          
          <div className="form-field">
            <label>Specialization:</label>
            <input
              type="text"
              name="specialization"
              value={inputs.specialization}
              onChange={handleChange}
              placeholder="E.g., Engine Repair, First Aid"
              required
            />
          </div>
          
          <div className="form-field">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={inputs.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
            />
          </div>
          
          <button type="submit" className="add-button">
            Add to System
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddServiceProvider;