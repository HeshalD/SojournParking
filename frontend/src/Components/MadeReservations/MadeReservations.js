import React from 'react'
import './MadeReservations.css'

function MadeReservations() {
    return (
        <div>
            <>
                <link rel="stylesheet" href="MadeReservations.css" />
                <div className="sidebar-reservation">
                    <div className="sidebar-reservation-header">
                        <div className="sidebar-header-content">
                            <h3>Reservation</h3>
                            <span className="sidebar-status active">Active</span>
                        </div>
                        <div className="sidebar-reservation-id">A1</div>
                    </div>
                    <div className="sidebar-reservation-details">
                        <div className="sidebar-detail-item">
                            <span className="label">License:</span>
                            <span className="value">ABC-1234</span>
                        </div>
                        <div className="sidebar-detail-item">
                            <span className="label">Location:</span>
                            <span className="value">Downtown Garage</span>
                        </div>
                        <div className="sidebar-detail-item">
                            <span className="label">Spot:</span>
                            <span className="value">Level 2 - B27</span>
                        </div>
                        <div className="sidebar-time-details">
                            <div className="sidebar-detail-item">
                                <span className="label">Entry:</span>
                                <span className="value">10:30 AM</span>
                            </div>
                            <div className="sidebar-qr-preview">
                                <img
                                    src="https://placehold.co/50x50/50B087/FFFFFF/?text=QR"
                                    alt="QR Preview"
                                />
                                <div className="qr-text">
                                    Scan for entry/exit
                                    <br />
                                    <a href="#" className="qr-link">
                                        View Full QR
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar-reservation-actions">
                            <button className="sidebar-btn sidebar-btn-secondary">Edit</button>
                            <button className="sidebar-btn sidebar-btn-primary">
                                Find Location
                            </button>
                        </div>
                    </div>
                    {/* Alternate view when no active reservation */}
                    <div className="sidebar-reservation" style={{ display: "none" }}>
                        <div className="sidebar-reservation-header">
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
                </div>
            </>

        </div>
    )
}

export default MadeReservations
