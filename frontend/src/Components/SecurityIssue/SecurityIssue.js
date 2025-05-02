import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router";
import axios from 'axios';
import './SecurityIssue.css';

function SecurityIssue() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    lpname: '',
    email: '',
    etype: '',
    anote: ''
  });

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      console.log("SecurityIssue: Fetching current user session...");
      const response = await axios.get('http://localhost:5000/sessions/current');
      console.log("SecurityIssue: Session response:", response.data);
      if (response.data.user) {
        console.log("SecurityIssue: Setting current user:", response.data.user);
        setCurrentUser(response.data.user);
        setInputs(prev => ({
          ...prev,
          email: response.data.user.email
        }));
      } else {
        console.log("SecurityIssue: No user session found");
        setError("Please login to access emergency services.");
      }
    } catch (err) {
      console.error("SecurityIssue: Error fetching user session:", err);
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
      const response = await axios.post('http://localhost:5000/SecIssues/', inputs);
      console.log("Security issue submitted:", response.data);
      navigate('/responseS');
    } catch (err) {
      console.error("Error submitting security issue:", err);
      setError("Failed to submit security emergency report. Please try again.");
    }
  };

  return (
    <div className="security-issue">
      <div className="security-issue__card">
        <h2 className="security-issue__title">Security Issue Report</h2>
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => navigate('/login')} className="login-btn">
              Login
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="security-issue__form">
          <div className="security-issue__form-group">
            <label className="security-issue__label">
              License Plate Number:
              <input
                type="text"
                name="lpname"
                onChange={handleChange}
                value={inputs.lpname}
                placeholder="Enter license plate number"
                className="security-issue__input"
                required
              />
            </label>
          </div>

          <div className="security-issue__form-group">
            <label className="security-issue__label">
              Email:
              <input
                type="email"
                name="email"
                value={inputs.email}
                className="security-issue__input"
                readOnly
                required
              />
            </label>
          </div>

          <div className="security-issue__form-group">
            <label className="security-issue__label">
              Emergency Type
              <select
                name="etype"
                className="security-issue__select"
                onChange={handleChange}
                value={inputs.etype}
                required
              >
                <option value="" disabled>Select emergency type</option>
                <option value="theft">Theft</option>
                <option value="vandalism">Vandalism</option>
                <option value="suspicious_activity">Suspicious Activity</option>
                <option value="accident">Accident</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          <div className="security-issue__form-group">
            <label className="security-issue__label">
              Additional Notes
              <textarea
                name="anote"
                onChange={handleChange}
                value={inputs.anote}
                placeholder="Enter additional notes"
                className="security-issue__textarea"
                required
              />
            </label>
          </div>

          <div className="security-issue__actions">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="security-issue__button security-issue__button--secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="security-issue__button security-issue__button--primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SecurityIssue;