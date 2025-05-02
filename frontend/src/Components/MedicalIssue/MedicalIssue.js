import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router";
import axios from 'axios';
import './MedicalIssue.css';

function MedicalIssue() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    lpname: '',
    email: '',
    etype: '',
    pcon: '',
    anote: ''
  });

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      console.log("MedicalIssue: Fetching current user session...");
      const response = await axios.get('http://localhost:5000/sessions/current');
      console.log("MedicalIssue: Session response:", response.data);
      if (response.data.user) {
        console.log("MedicalIssue: Setting current user:", response.data.user);
        setCurrentUser(response.data.user);
        setInputs(prev => ({
          ...prev,
          email: response.data.user.email
        }));
      } else {
        console.log("MedicalIssue: No user session found");
        setError("Please login to access emergency services.");
      }
    } catch (err) {
      console.error("MedicalIssue: Error fetching user session:", err);
      setError("Please login to access emergency services.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/MedIssues/', inputs);
      console.log("Medical issue submitted:", response.data);
      navigate('/response');
    } catch (err) {
      console.error("Error submitting medical issue:", err);
      setError("Failed to submit medical emergency report. Please try again.");
    }
  };

  return (
    <div className="medical-emergency">
      <div className="medical-emergency__card">
        <h2 className="medical-emergency__title">Medical Emergency Report</h2>
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => navigate('/login')} className="login-btn">
              Login
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="medical-emergency__form">
          <div className="medical-emergency__form-group">
            <label className="medical-emergency__label">
              License Plate Number:
              <input
                type="text"
                name="lpname"
                onChange={handleChange}
                value={inputs.lpname}
                placeholder="Enter license plate number"
                className="medical-emergency__input"
                required
              />
            </label>
          </div>

          <div className="medical-emergency__form-group">
            <label className="medical-emergency__label">
              Email:
              <input
                type="email"
                name="email"
                value={inputs.email}
                className="medical-emergency__input"
                readOnly
                required
              />
            </label>
          </div>

          <div className="medical-emergency__form-group">
            <label className="medical-emergency__label">
              Emergency Type
              <select
                name="etype"
                className="medical-emergency__select"
                onChange={handleChange}
                value={inputs.etype}
                required
              >
                <option value="" disabled>Select emergency type</option>
                <option value="cardiac">Cardiac</option>
                <option value="respiratory">Respiratory</option>
                <option value="trauma">Trauma</option>
                <option value="neurological">Neurological</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          <div className="medical-emergency__form-group">
            <label className="medical-emergency__label">
              Patient's Condition
              <select
                name="pcon"
                className="medical-emergency__select"
                onChange={handleChange}
                value={inputs.pcon}
                required
              >
                <option value="" disabled>Select condition</option>
                <option value="critical">Critical</option>
                <option value="unstable">Unstable</option>
                <option value="stable">Stable</option>
                <option value="improving">Improving</option>
                <option value="deteriorating">Deteriorating</option>
              </select>
            </label>
          </div>

          <div className="medical-emergency__form-group">
            <label className="medical-emergency__label">
              Additional Notes
              <textarea
                name="anote"
                onChange={handleChange}
                value={inputs.anote}
                placeholder="Enter additional notes"
                className="medical-emergency__textarea"
                required
              />
            </label>
          </div>

          <div className="medical-emergency__actions">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="medical-emergency__button medical-emergency__button--secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="medical-emergency__button medical-emergency__button--primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MedicalIssue;