import React from "react";
import "./Member.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Member(props) {
  const { _id,EmployeeID, LicensePlateNo, Slip } = props.user;

  const history = useNavigate();
  const deleteHandler = async() =>{
    await axios.delete(`http://localhost:5000/Members/${_id}`)
    .then(res =>res.data)
    .then(() => history("/"))
    .then(() =>history("/displayMembership"))
  }

  return (
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
      </div>
      <div className="member-actions">
        <Link to={`/UpdateMember/${_id}`} className="member-btn member-btn-primary">Edit</Link>
        <button onClick={deleteHandler} className="member-btn member-btn-secondary">Delete</button>
      </div>
    </div>
  );
}

export default Member;
