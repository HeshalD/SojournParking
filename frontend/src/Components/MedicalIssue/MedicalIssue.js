import React from 'react'
import './MedicalIssue.css'

function MedicalIssue() {
  return (
    <div>
      <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Medical Emergency Form</title>
  <link rel="stylesheet" href="/medical.css" />
  <img className="img1" src="photos/medicalbackgroun.png" alt="" />
  <div className="container">
    <div className="header">
      <div className="header-icon">✚</div>
      <div className="header-text">Medical Emergency</div>
    </div>
    <div className="border">
      <div className="form-title">Fill the form</div>
      <form>
        <div className="form-group">
          <label className="form-label">License Plate Number:</label>
          <div className="dropdown1">
            <input
              type="text"
              placeholder="Enter The License Plate Number"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Emergency Type</label>
          <div className="dropdown">
            <select className="form-control">
              <option value="" selected="" disabled="">
                Select emergency type
              </option>
              <option value="cardiac">Cardiac</option>
              <option value="respiratory">Respiratory</option>
              <option value="trauma">Trauma</option>
              <option value="neurological">Neurological</option>
              <option value="burn">Burn</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Patient's Condition</label>
          <div className="dropdown">
            <select className="form-control">
              <option value="" selected="" disabled="">
                Select condition
              </option>
              <option value="critical">Critical</option>
              <option value="unstable">Unstable</option>
              <option value="stable">Stable</option>
              <option value="improving">Improving</option>
              <option value="deteriorating">Deteriorating</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Additional Notes</label>
          <textarea
            className="form-control"
            placeholder="Enter any additional information here..."
            defaultValue={""}
          />
        </div>
      </form>
    </div>
    <div className="button-group">
      <button type="button" className="btn btn-secondary">
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </div>
  </div>
</>

    </div>
  )
}

export default MedicalIssue
