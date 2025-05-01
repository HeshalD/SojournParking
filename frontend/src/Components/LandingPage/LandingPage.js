import React from 'react'
import './LandingPage.css'
import {Link} from "react-router-dom"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function LandingPage() {
  return (
    <div className="landing-page">
      <Header/>
      
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <h1>Welcome to Sojourn Parking</h1>
          <p>
            Find the perfect parking spot with ease. Our smart parking system
            helps you save time and reduce stress by quickly finding available
            parking spaces. Reserve your spot in advance and enjoy a hassle-free
            parking experience.
          </p>
          <Link to="/chooseParking" className="landing-btn landing-btn-primary">
            Reserve Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="landing-features-container">
          <h2>Why Choose Sojourn Parking?</h2>
          <div className="landing-features-grid">
            <div className="landing-feature-card">
              <h3>Smart Parking</h3>
              <p>Real-time availability tracking and smart reservation system for a seamless parking experience.</p>
            </div>
            <div className="landing-feature-card">
              <h3>24/7 Security</h3>
              <p>State-of-the-art surveillance and security measures to ensure your vehicle's safety.</p>
            </div>
            <div className="landing-feature-card">
              <h3>Easy Payment</h3>
              <p>Multiple payment options and automated billing for your convenience.</p>
            </div>
            <div className="landing-feature-card">
              <h3>Emergency Services</h3>
              <p>24/7 emergency assistance for jump starts, flat tires, and other vehicle issues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="landing-contact">
        <div className="landing-contact-container">
          <h2>Get in Touch</h2>
          <div className="landing-contact-grid">
            <div className="landing-contact-form">
              <h3>Send Us a Message</h3>
              <form>
                <div className="landing-form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" placeholder="Your name" />
                </div>
                <div className="landing-form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="Your email" />
                </div>
                <div className="landing-form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" placeholder="Your message"></textarea>
                </div>
                <button type="submit" className="landing-btn landing-btn-primary">Send Message</button>
              </form>
            </div>
            <div className="landing-contact-info">
              <div className="landing-info-item">
                <i className="fas fa-map-marker-alt"></i>
                <p>123 Parking Avenue, Downtown, City, 10001</p>
              </div>
              <div className="landing-info-item">
                <i className="fas fa-phone"></i>
                <p>(555) 123-4567</p>
              </div>
              <div className="landing-info-item">
                <i className="fas fa-envelope"></i>
                <p>info@sojournparking.com</p>
              </div>
              <div className="landing-info-item">
                <i className="fas fa-clock"></i>
                <p>24/7 Operation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  )
}

export default LandingPage