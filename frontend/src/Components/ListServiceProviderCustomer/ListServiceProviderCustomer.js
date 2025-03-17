import React from 'react'
import './ListServiceProviderCustomer.css'

function ListServiceProviderCustomer() {
  return (
    <div>
      <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Emergency Assistance - Mechanics &amp; Medics</title>
  <link rel="stylesheet" href="/list_mc.css" />
  <div className="container">
    <h2>Available Service Providers</h2>
    <div className="tab">
      <button className="active" onclick="switchTab('mechanics')">
        Mechanics
      </button>
      <button onclick="switchTab('medics')">Medics</button>
    </div>
    <div id="mechanics-list" className="list">
      <h3>Mechanics</h3>
      <div className="list-item">John Doe - Engine Specialist </div>
    </div>
    <div id="medics-list" className="list" style={{ display: "none" }}>
      <h3>Medics</h3>
      <div className="list-item">Jane Smith - Paramedic </div>
    </div>
  </div>
</>

    </div>
  )
}

export default ListServiceProviderCustomer
