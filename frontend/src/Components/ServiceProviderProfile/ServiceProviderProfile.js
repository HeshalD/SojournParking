import React, {useState,useEffect} from 'react'
import './ServiceProviderProfile.css'
import axios from "axios"
import ServiceProvider from '../Provider/Provider'


const URL ="http://localhost:4000/ServiceProviders";

const fetchHandler = async () =>{
  return await axios.get(URL).then((res) => res.data);

}

function ServiceProviderProfile() {
  const [serviceProviders, setServiceProviders] = useState([]);

 
  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("API Response:", data);
      setServiceProviders(data.ServiceProviders);
    });
  }, []);
  


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
      {serviceProviders && serviceProviders.map((serviceProvider, i) => (
        <div key={i}>
          <ServiceProvider serviceProvider={serviceProvider}/>
        </div>
      ))}
    </div>

    {/* Profile Example */}
    <div className="profile-card">
      <h3>John Doe</h3>
      
      
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
