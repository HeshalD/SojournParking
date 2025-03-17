import React from 'react'
import './SecurityIssue.css'

function SecurityIssue() {
  return (
    <div>
      <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Security Issue Form</title>
  <link rel="stylesheet" href="/security.css" />
  <img src="photos/secuirty.png" alt="" />
  <div className="container">
    <div className="header">
      <div className="header-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      </div>
      <div className="header-text">Security Issue</div>
    </div>
    <div className="form-title">Fill the form</div>
    <form>
      <div className="form-group">
        <label className="form-label">License Plate Number:</label>
        <div className="dropdown3">
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
            <option value="intrusion">Intrusion</option>
            <option value="suspicious">Suspicious Activity</option>
            <option value="theft">Theft</option>
            <option value="vandalism">Vandalism</option>
            <option value="device">Security Device Malfunction</option>
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

export default SecurityIssue
