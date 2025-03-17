import React from 'react'
import './ResponsePage.css'


function ResponsePage() {
  return (
    <div>
      <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Emergency Assistance - Response</title>
  <link rel="stylesheet" href="/responsepage.css" />
  <div className="container">
    <div className="header">Your Emergency Request is Received! </div>
    <div className="description">
      Thank you for reaching out. Our team is reviewing your request, and the
      nearest available **medic** or **mechanic** will assist you shortly. Stay
      calm, help is on the way! ⏳
    </div>
    <img className="img1" src="photos/white_tick-removebg-preview.png" alt="" />
    <div className="response-box">
      <strong>Submitted Details</strong>
      <p>
        <b>Lisence Plate Number:</b>{" "}
      </p>
      <p>
        <b>Emergency Type:</b>{" "}
      </p>
      <p>
        <b>Aditional Informations:</b>
      </p>
    </div>
    <button className="btn" onclick="window.history.back()">
      ⬅ Go Back
    </button>
  </div>
</>

    </div>
  )
}

export default ResponsePage
