import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router";
import axios from 'axios';
import './MechanicalIssue.css';

function MechanicalIssue() {
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
      console.log("MechanicalIssue: Fetching current user session...");
      const response = await axios.get('http://localhost:5000/sessions/current');
      console.log("MechanicalIssue: Session response:", response.data);
      if (response.data.user) {
        console.log("MechanicalIssue: Setting current user:", response.data.user);
        setCurrentUser(response.data.user);
        setInputs(prev => ({
          ...prev,
          email: response.data.user.email
        }));
      } else {
        console.log("MechanicalIssue: No user session found");
        setError("Please login to access emergency services.");
      }
    } catch (err) {
      console.error("MechanicalIssue: Error fetching user session:", err);
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
      const response = await axios.post('http://localhost:5000/MecIssues/', inputs);
      console.log("Mechanical issue submitted:", response.data);
      navigate('/responseM');
    } catch (err) {
      console.error("Error submitting mechanical issue:", err);
      setError("Failed to submit mechanical emergency report. Please try again.");
    }
  };

  return (
    <div className="mechanical-issue">
      <div className="mechanical-issue__card">
        <h2 className="mechanical-issue__title">Mechanical Issue Report</h2>
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => navigate('/login')} className="login-btn">
              Login
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="mechanical-issue__form">
          <div className="mechanical-issue__form-group">
            <label className="mechanical-issue__label">
              License Plate Number:
              <input
                type="text"
                name="lpname"
                onChange={handleChange}
                value={inputs.lpname}
                placeholder="Enter license plate number"
                className="mechanical-issue__input"
                required
              />
            </label>
          </div>

          <div className="mechanical-issue__form-group">
            <label className="mechanical-issue__label">
              Email:
              <input
                type="email"
                name="email"
                value={inputs.email}
                className="mechanical-issue__input"
                readOnly
                required
              />
            </label>
          </div>

          <div className="mechanical-issue__form-group">
            <label className="mechanical-issue__label">
              Emergency Type
              <select
                name="etype"
                className="mechanical-issue__select"
                onChange={handleChange}
                value={inputs.etype}
                required
              >
                <option value="" disabled>Select emergency type</option>
                <option value="flat_tire">Flat Tire</option>
                <option value="battery">Battery Issue</option>
                <option value="engine">Engine Problem</option>
                <option value="brakes">Brake System</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          <div className="mechanical-issue__form-group">
            <label className="mechanical-issue__label">
              Additional Notes
              <textarea
                name="anote"
                onChange={handleChange}
                value={inputs.anote}
                placeholder="Enter additional notes"
                className="mechanical-issue__textarea"
                required
              />
            </label>
          </div>

          <div className="mechanical-issue__actions">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="mechanical-issue__button mechanical-issue__button--secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mechanical-issue__button mechanical-issue__button--primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MechanicalIssue;