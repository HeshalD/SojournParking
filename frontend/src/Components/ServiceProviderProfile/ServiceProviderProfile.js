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

    
  </div>
</>

    </div>
  )
}

export default ServiceProviderProfile
