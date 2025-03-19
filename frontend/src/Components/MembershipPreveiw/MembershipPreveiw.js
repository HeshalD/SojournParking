import React, { useEffect, useState } from "react";
import "./MembershipPreveiw.css";
import axios from "axios";

function MembershipPreveiw() {
  return (
      <>
        <link rel="stylesheet" href="MadeReservations.css" />
        <div className="sidebar-membership">
          <div className="sidebar-membership-header">
            <div className="sidebar-header-content">
              <h3>Membership</h3>
              <span className="sidebar-status active">Active</span>
            </div>
            <div className="sidebar-membership-id">A1</div>
          </div>
          <div className="sidebar-membership-details">
            <div className="sidebar-detail-item">
              <span className="label">Employee ID:</span>
              <span className="value">EMP-5678</span>
            </div>
            <div className="sidebar-detail-item">
              <span className="label">License Plate No:</span>
              <span className="value">ABC-1234</span>
            </div>
            <div className="sidebar-detail-item">
              <span className="label">Slip:</span>
              <span className="value">Level 2 - B27</span>
            </div>
            <div className="sidebar-slip-preview">
              <a href="#" className="qr-link">
                View Full Slip
              </a>
            </div>
          </div>
          <div className="sidebar-membership-actions">
            <button className="sidebar-btn sidebar-btn-secondary">Edit</button>
            <button className="sidebar-btn sidebar-btn-primary">Delete</button>
          </div>
        </div>
        {/* Alternate view when no active reservation */}
        <div className="sidebar-membership" style={{ display: "none" }}>
          <div className="sidebar-membership-header">
            <div className="sidebar-header-content">
              <h3>PARKING SPOT</h3>
            </div>
          </div>
          <div className="sidebar-no-reservation">
            <h4>No Active Reservation</h4>
            <p>You don't have any active parking reservation.</p>
            <a href="#" className="sidebar-btn sidebar-btn-primary">
              Reserve Now
            </a>
          </div>
        </div>
      </>
  );
}

export default MembershipPreveiw;
