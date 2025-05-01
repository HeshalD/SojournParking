import React, { useState } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import './MechanicalIssue.css';

function MechanicalIssue() {
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
      await axios.post("http://localhost:4000/mecIssues", {
        lpname: inputs.lpname,
        email: inputs.email,
        etype: inputs.etype,
        anote: inputs.anote,
      });
      navigate('/responseM');
    } catch (err) {
      console.error("Submission error:", err);
      // Add user feedback here
    }
  };

  return (
    <div className="mechanical-issue">
      <div className="mechanical-issue__card">
        <h2 className="mechanical-issue__title">Mechanical Issue Report</h2>
        
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
                onChange={handleChange}
                value={inputs.email}
                placeholder="Enter your email"
                className="mechanical-issue__input"
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