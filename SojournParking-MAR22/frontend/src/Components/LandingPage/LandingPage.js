import React from 'react'
import './LandingPage.css'
import {Link} from "react-router-dom"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function LandingPage() {
  return (
    <div className="sojourn-parking">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Header/>
      {/* Section 1: Hero Section */}
      <section id="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to Sojourn Parking</h1>
            <p>
              Find the perfect parking spot with ease. Our smart parking system
              helps you save time and reduce stress by quickly finding available
              parking spaces. Reserve your spot in advance and enjoy a hassle-free
              parking experience.
            </p>
            <Link to="/chooseParking" className="btn btn-primary">
              Reserve Now
            </Link>
          </div>
        </div>
      </section>
      {/* Section 2: Emergency Services */}
      <section id="emergency">
        <div className="pattern-1" />
        <div className="container">
          <div className="emergency-container">
            <div className="emergency-text">
              <h2>Emergency Services</h2>
              <p>
                We understand that emergencies can happen anytime. Our 24/7
                emergency assistance team is always ready to help you with any
                issues you might face in our parking facility. From battery jumps to
                flat tire assistance, our trained professionals are here to ensure
                your safety and convenience.
              </p>
              <p>Our emergency services include:</p>
              <ul style={{ marginBottom: 20, paddingLeft: 20 }}>
                <li>Jump start services</li>
                <li>Flat tire assistance</li>
                <li>Lockout solutions</li>
                <li>Minor mechanical assistance</li>
                <li>Fuel delivery</li>
              </ul>
              <a href="#" className="btn btn-secondary">
                Contact Emergency Services
              </a>
            </div>
            <div className="emergency-image">
              <img
                src="https://placehold.co/500x400/50B087/FFFFFF/?text=Emergency+Services"
                alt="Emergency Services"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Section 3: Discounts & Promos */}
      <section id="discounts">
        <div className="container">
          <div className="discounts-content">
            <h2>Discounts &amp; Promotions</h2>
            <div className="slider">
              <div className="slider-container">
                <div className="slide">
                  <span className="discount-badge">20% OFF</span>
                  <h3>Monthly Subscription</h3>
                  <p>
                    Sign up for our monthly parking subscription and get 20% off the
                    regular price. Perfect for commuters and regular visitors. Enjoy
                    guaranteed parking and skip the hassle of daily payments.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Get Offer
                  </a>
                </div>
                <div className="slide">
                  <span className="discount-badge">10% OFF</span>
                  <h3>Weekend Special</h3>
                  <p>
                    Planning a weekend visit? Get 10% off on our weekend parking
                    rates. Available from Friday evening to Sunday night. Make your
                    weekend plans worry-free with guaranteed parking.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Get Offer
                  </a>
                </div>
                <div className="slide">
                  <span className="discount-badge">15% OFF</span>
                  <h3>First-Time Users</h3>
                  <p>
                    New to Sojourn Parking? Enjoy 15% off on your first booking
                    with us. Download our app or register on our website to claim
                    this special offer. Experience our premium parking service at
                    a discounted price.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Get Offer
                  </a>
                </div>
                <div className="slide">
                  <span className="discount-badge">25% OFF</span>
                  <h3>Corporate Partnerships</h3>
                  <p>
                    We offer special corporate rates for businesses in the area.
                    Get up to 25% off for your employees with our corporate
                    partnership program. Contact us to discuss a customized
                    parking solution for your organization.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Contact Sales
                  </a>
                </div>
              </div>
              <div className="slider-controls">
                <button className="prev-btn">&lt;</button>
                <button className="next-btn">&gt;</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section 4: Contact Us */}
      <section id="contact">
        <div className="pattern-1" />
        <div className="container">
          <h2>Contact Us</h2>
          <div className="contact-container">
            <div className="contact-form">
              <h3>Send Us a Message</h3>
              <form id="contactForm">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    required=""
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email address"
                    required=""
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    placeholder="Tell us how we can help you"
                    required=""
                    defaultValue={""}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="contact-map">
              <h3>Find Us</h3>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00425!3d40.71278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDAyJzE2LjYiTiA3NMKwMDAnMTUuMyJX!5e0!3m2!1sen!2sus!4v1647886650898!5m2!1sen!2sus"
                  width="100%"
                  height={350}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
              <div className="contact-info">
                <p>
                  <strong>Address:</strong> 123 Parking Avenue, Downtown, City,
                  10001
                </p>
                <p>
                  <strong>Phone:</strong> (555) 123-4567
                </p>
                <p>
                  <strong>Email:</strong> info@sojournparking.com
                </p>
                <p>
                  <strong>Operating Hours:</strong> 24/7
                </p>
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