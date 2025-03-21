import React from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Provider({ serviceProvider = {} }) {
    const {_id ="N/A", fullname = "N/A", contactnumber = "N/A", specialization = "N/A", location = "N/A" } = serviceProvider;

    const history = useNavigate();

    const deleteHandler = async()=>{
      await axios.delete(`http://localhost:4000/ServiceProviders/${_id}`)
      .then(res=>res.data)
      .then(() =>history("/"))
      .then(() =>history("/ServiceProviderProfile"))
    }
  
  return (
    
  <div>
    <div className="profile-card">
       <p>
          <strong>Id:{_id}</strong>
        </p>
      <h3>{fullname}</h3>
      
      <div className="profile-info">
        <p>
          <strong>Role:</strong> 
        </p>
        <p>
          <strong>Id:{_id}</strong>
        </p>
        <p>
          <strong>Specialization: {specialization}</strong> 
        </p>
        <p>
          <strong>Location: {location}</strong> 
        </p>
        <p>
          <strong>Contact: {contactnumber}</strong> 
        </p>

        <Link to={`/UpdateServiceProvider/${_id}`} className="btn btn-update">Update</Link>
        <button onClick={deleteHandler} className="btn btn-delete">Delete</button>

  </div>
  </div>
  </div>

    
  
  )
}

export default Provider;
