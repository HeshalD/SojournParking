import React from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Provider.css'; 

function Provider({ serviceProvider = {} }) {
  const {
    _id = "N/A", 
    fullname = "N/A", 
    contactnumber = "N/A", 
    specialization = "N/A", 
    location = "N/A" 
  } = serviceProvider;
  
  const navigate = useNavigate();
  
  const deleteHandler = async(_id) => {
    console.log(_id);
    try {
      const response = await axios.delete(`http://localhost:5000/ServiceProviders/${_id}`);
      if (response.status === 200) {
        console.log({message:"Deletion Successful"})
        window.location.reload();
      } else {
        console.log({message:""})
      }
    } catch (err) {
      console.error("Error deleting service provider:", err);
    }
  }
  
  return (
    <div className="provider-card">
      <div className="provider-id">Id:{_id}</div>
      <div className="provider-name">{fullname}</div>
      
      <div className="provider-details">
        <div className="detail-row">
          <span className="detail-label">Role:</span>
          <span className="detail-value">Id:{_id}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Specialization:</span>
          <span className="detail-value">{specialization}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Location:</span>
          <span className="detail-value">{location}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Contact:</span>
          <span className="detail-value">{contactnumber}</span>
        </div>
      </div>
      
      <div className="provider-actions">
        <Link to={`/UpdateServiceProvider/${_id}`} className="btn btn-update">Update</Link>
        <button 
          className="btn-delete" 
          onClick={() => deleteHandler(_id)}
        >
          DELETE
        </button>
      </div>
    </div>
  )
}

export default Provider;