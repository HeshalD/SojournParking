import React, {useState,useEffect} from 'react'
import './ServiceProviderProfile.css'
import axios from "axios";
import ServiceProvider from "../AddServiceProvider/AddServiceProvider"


const URL ="http://Localhost:4000/ServiceProviderProfile";

const fetchHandler = async () =>{
  return await axios.get(URL).then((res) => res.data);

}

function ServiceProviderProfile() {
  const[ServiceProvider, setServiceProviderProfile] =useState();
  useEffect(() =>  {
    fetchHandler().then((data) => setServiceProviderProfile(data.ServiceProviderProfile));
  },[])

  return (
    <div>
      <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Service Providers Profiles</title>
  <link rel="stylesheet" href="/medmech_profile.css" />
  <div className="container">
    <h2>Service Providers Profiles</h2>

    <div>
      {ServiceProvider && ServiceProvider.map((servieProvider, i) => (
        <div key={i}>
          <ServiceProvider servieProvider={servieProvider}/>
        </div>
      ))}
    </div>

    {/* Profile Example */}
    <div className="profile-card">
      <h3>John Doe</h3>
      <img
        className="profile-img"
        src="/photos/logonew.png"
        alt="Profile Picture"
      />
      <div className="profile-info">
        <p>
          <strong>Role:</strong> 
        </p>
        <p>
          <strong>Specialization:</strong> 
        </p>
        <p>
          <strong>Location:</strong> 
        </p>
        <p>
          <strong>Contact:</strong> 
        </p>
      </div>
      <div className="rating">
        <span className="star" data-value={1}>
          ★
        </span>
        <span className="star" data-value={2}>
          ★
        </span>
        <span className="star" data-value={3}>
          ★
        </span>
        <span className="star" data-value={4}>
          ★
        </span>
        <span className="star" data-value={5}>
          ★
        </span>
      </div>
      <button className="btn">Submit Rating</button>
    </div>
  </div>
</>

    </div>
  )
}

export default ServiceProviderProfile
