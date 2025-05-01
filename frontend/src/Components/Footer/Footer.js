import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
<>
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-section">
        <h3>Quick Links</h3>
        <Link to="/landingPage">Reservations</Link>
        <a href="#">Emergency Services</a>
        <a href="#">Discounts &amp; Promos</a>
      </div>
      <div className="footer-section">
        <h3>Services</h3>
        <a href="#">Customer Service</a>
        <a href="#">Reviews and Ratings</a>
        <a href="#">Terms &amp; Conditions</a>
      </div>
      <div className="footer-section">
        <h3>Socials</h3>
        {/* Add social icons here */}
      </div>
    </div>
    <div className="footer-bottom">
      <p>2025 Sojourn Parking | All Rights Reserved</p>
    </div>
  </footer>
</>

    </div>
  )
}

export default Footer
