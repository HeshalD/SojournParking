import React from 'react'
import './MechanicalIssue.css'

function MechanicalIssue() {
  return (
    <div>
      <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mechanical Issue Form</title>
  <link rel="stylesheet" href="/mechanical.css" />
  <img src="photos/mechanical.png" alt="" />
  <div className="container">
    <div className="header">
      <div className="header-icon">🔧</div>
      <div className="header-text">Mechanical Issue</div>
    </div>
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
            <option value="breakdown">Breakdown</option>
            <option value="malfunction">Malfunction</option>
            <option value="noise">Unusual Noise</option>
            <option value="fluid_leak">Fluid Leak</option>
            <option value="warning_light">Warning Light</option>
            <option value="other">Other</option>
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
      <div className="button-group">
        <button type="button" className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  </div>
</>

    </div>
  )
}

export default MechanicalIssue
