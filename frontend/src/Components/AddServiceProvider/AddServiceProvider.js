import React, { useEffect, useState } from 'react'
import './AddServiceProvider.css'



function AddServiceProvider(props) {
  const {fullname,contactnumber,specialozation,location} =props.ServiceProvider;
  return (
    <div>
     <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Add Mechanic/Medic</title>
  <link rel="stylesheet" href="/addmed_mech.css" />
  <div className="container">
    <div className="header">Add a New Mechanic or Medic</div>
    <form id="addForm">
      <div className="form-group">
        <label htmlFor="role">Select Role:</label>
        <select id="role" name="role" required="">
          <option value="mechanic">Mechanic</option>
          <option value="medic">Medic</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="name">Full Name:{fullname}</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter full name"
          required=""
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact">Contact Number:{contactnumber}</label>
        <input
          type="text"
          id="contact"
          name="contact"
          placeholder="Enter contact number"
          required=""
        />
      </div>
      <div className="form-group">
        <label htmlFor="specialization">Specialization:{specialozation}</label>
        <input
          type="text"
          id="specialization"
          name="specialization"
          placeholder="E.g., Engine Repair, First Aid"
          required=""
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location:{location}</label>
        <input
          type="text"
          id="location"
          name="location"
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

export default AddServiceProvider
