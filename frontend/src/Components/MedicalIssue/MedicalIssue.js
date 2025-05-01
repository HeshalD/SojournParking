import React, { useState } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import './MedicalIssue.css';

function MedicalIssue() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    lpname: "",
    email: "",
    etype: "",
    pcon: "",
    anote: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/medIssues", {
        lpname: inputs.lpname,
        email: inputs.email,
        etype: inputs.etype,
        pcon: inputs.pcon,
        anote: inputs.anote,
      });
      navigate('/response');
    } catch (err) {
      console.error("Submission error:", err);
      // Add user feedback here
    }
  };

  return (
    <div className="medical-emergency">
      <div className="medical-emergency__card">
        <h2 className="medical-emergency__title">Medical Emergency Report</h2>
        
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
                onChange={handleChange}
                value={inputs.email}
                placeholder="Enter your email"
                className="medical-emergency__input"
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