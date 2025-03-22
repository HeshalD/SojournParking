import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './UpdateServiceProvider.css'; // Will contain scoped styles

function UpdateServiceProvider() {
  const [inputs, setInputs] = useState({
    fullname: "",
    contactnumber: "",
    specialization: "",
    location: "",
  });
  
  const navigate = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/ServiceProviders/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.ServiceProviders));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/ServiceProviders/${id}`, {
        fullname: String(inputs.fullname),
        contactnumber: Number(inputs.contactnumber),
        specialization: String(inputs.specialization),
        location: String(inputs.location),
      })
      .then((res) => res.data);
  };
  
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() =>
      navigate('/ServiceProviderProfile'));
  };

  return (
    <div className="update-page">
      <div className="update-container">
        <div className="update-header">
          <h2>Add a New Mechanic or Medic</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="update-form">
          <div className="form-field">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullname"
              value={inputs?.fullname || ""}
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
              value={inputs?.contactnumber || ""}
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
              value={inputs?.specialization || ""}
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
              value={inputs?.location || ""}
              onChange={handleChange}
              placeholder="Enter location"
              required
            />
          </div>
          
          <button type="submit" className="update-button">
            UPDATE
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateServiceProvider;