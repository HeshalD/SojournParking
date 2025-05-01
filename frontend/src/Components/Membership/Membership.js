import React from "react";
import "./Member.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Membership(props) {
    const { _id, EmployeeID, LicensePlateNo, Slip, Email} = props.user;

    const history = useNavigate();

    const deleteHandler = async(_id) => {
        // Add confirmation dialog
        if (window.confirm("Are you sure you want to delete this membership?")) {
            console.log(_id);
            try {
                const response = await axios.delete(`http://localhost:5000/member/${_id}`);
                if (response.status === 200) {
                    alert("Membership deleted successfully");  // Add success message
                    window.location.reload();
                } else {
                    alert("Failed to delete membership");  // Add failure message
                }
            } catch (err) {
                console.error("Error deleting service provider:", err);
                alert("Error deleting membership");  // Add error message
            }
        }
    }

    return (
        <div className="membership-module">
            <div className="member-card">
                <div className="member-header">
                    <h3>Membership</h3>
                    <span className="member-status">Active</span>
                </div>
                <div className="member-details">
                    <div className="member-detail-item">
                        <span className="label">ID:</span>
                        <span className="value">{_id}</span>
                    </div>
                    <div className="member-detail-item">
                        <span className="label">Employee ID:</span>
                        <span className="value">{EmployeeID}</span>
                    </div>
                    <div className="member-detail-item">
                        <span className="label">License Plate No:</span>
                        <span className="value">{LicensePlateNo}</span>
                    </div>
                    <div className="member-detail-item">
                        <span className="label">Slip:</span>
                        <span className="value">{Slip}</span>
                    </div>
                    <div className="member-detail-item">
                        <span className="label">Email:</span>
                        <span className="value">{Email}</span>
                    </div>
                </div>
                <div className="member-actions">
                    <Link to={`/updateMembership/${_id}`} className="member-btn member-btn-primary">Edit</Link>
                    <button 
                        className="member-btn member-btn-secondary" 
                        onClick={() => deleteHandler(_id)}
                    >
                        DELETE
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Membership;