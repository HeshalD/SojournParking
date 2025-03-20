import React, { useState }   from 'react'
import './AddServiceProvider.css'
import {useNavigate} from "react-router";
import axios from 'axios';


function AddServiceProvider() {
  const history =useNavigate();
  const[inputs,setInputs] = useState({
      
      fullname:"",
      contactnumber:"",
      specialization:"",
      location:"",
  });


   const handleChange = (e) =>{
    setInputs((prevState)=> ({
       ...prevState,
       [e.target.name]: e.target.value,
    }));
   };

   const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=>history('ServiceProviderProfile'))
   };

   const sendRequest = async()=>{
    await axios.post("http://localhost:4000/ServiceProviders",{
        fullname: String (inputs.fullname),
        contactnumber: Number (inputs.contactnumber),
        specialization: String (inputs.specialization),
        location: String (inputs.location),
    }).then(res => res.data);
   };


  return (
    <div>
     <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Add Mechanic/Medic</title>
  <link rel="stylesheet" href="/addmed_mech.css" />
  <div className="container">
    <div className="header">Add a New Mechanic or Medic</div>
    <form onSubmit={handleSubmit} id="addForm">
      
      <div className="form-group">
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          name="fullname"
          onChange={handleChange}
          value={inputs.fullname}
          placeholder="Enter full name"
          required=""
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact">Contact Number:</label>
        <input
          type="text"
          id="contact"
          name="contactnumber"
          onChange={handleChange}
          value={inputs.contactnumber}
          placeholder="Enter contact number"
          required=""
        />
      </div>
      <div className="form-group">
        <label htmlFor="specialization">Specialization:</label>
        <input
          type="text"
          id="specialization"
          name="specialization"
          onChange={handleChange}
          value={inputs.specialization}
          placeholder="E.g., Engine Repair, First Aid"
          required=""
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          onChange={handleChange}
          value={inputs.location}
          placeholder="Enter location"
          required=""
        />
      </div>
      <button type="submit" className="btn">
        Add to System
      </button>
    </form>
  </div>
</>

    </div>
  )
}

export default AddServiceProvider;
