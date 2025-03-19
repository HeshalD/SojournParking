import React from 'react';
import './MembershipRenewal.css';
import axios from "axios";

const URL ="http://Localhost:5000/Members";

function MembershipRenewal() {
  return (
    <div>
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Membership Renewal</title>
        <link rel="stylesheet" href="./membershi.css" />
        <div className="container">
          <div className="tagline">
            "Stay Parked, Stay Privileged – Renew Your Membership Today!"
          </div>
          <img
            src="/Photos/MembershipRenewal.png"
            alt="How To Use Your Car To Secure A Loan"
            className="car-image"
          />
          <div className="background-card">
            <h1 className="form-title">MEMBERSHIP RENEWAL</h1>
            <div className="form-group">
              <input type="text" placeholder="Employee ID" id="employeeId" />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="License plate no"
                id="licensePlate"
              />
            </div>
            <div className="form-group upload-container">
              <input type="text" placeholder="Add your slip here" id="slip" />
              <span
                className="upload-icon"
                svg=""
                xmlns="http://www.w3.org/2000/svg"
                viewbox="0 0 448 512"
              >
                📎
              </span>
            </div>
            <button id="submitBtn">Submit</button>
          </div>
        </div>
      </>
    </div>
  );
}

export default MembershipRenewal
