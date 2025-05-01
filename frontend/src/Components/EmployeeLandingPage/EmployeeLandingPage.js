import React from 'react'
import './LandingPage.css'
import {Link} from "react-router-dom"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function EmployeeLandingPage() {
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
            <Link to="/renewMembership" className="btn btn-primary">
              Renew Membership
            </Link>
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
     
      <Footer/>
    </div>
  )
}

export default EmployeeLandingPage