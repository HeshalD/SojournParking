import React, { useState } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import './SecurityIssue.css';

function SecurityIssue() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    lpname: "",
    email: "",
    etype: "",
    anote: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/secIssues", {
        lpname: inputs.lpname,
        email: inputs.email,
        etype: inputs.etype,
        anote: inputs.anote,
      });
      navigate('/responseS');
    } catch (err) {
      console.error("Submission error:", err);
      // Add user feedback here
    }
  };

  return (
    <div className="security-issue">
      <div className="security-issue__card">
        <h2 className="security-issue__title">Security Issue Report</h2>
        
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
                onChange={handleChange}
                value={inputs.email}
                placeholder="Enter your email"
                className="security-issue__input"
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