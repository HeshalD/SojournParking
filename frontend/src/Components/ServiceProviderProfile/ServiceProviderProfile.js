import React from 'react'
import './ServiceProviderProfile.css'

function ServiceProviderProfile() {
  return (
    <div>
      <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Service Providers Profiles</title>
  <link rel="stylesheet" href="/medmech_profile.css" />
  <div className="container">
    <h2>Service Providers Profiles</h2>
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
          <strong>Role:</strong> Mechanic
        </p>
        <p>
          <strong>Specialization:</strong> Engine Repair
        </p>
        <p>
          <strong>Location:</strong> Downtown Garage
        </p>
        <p>
          <strong>Contact:</strong> +123456789
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
