import React, { useState, useEffect } from 'react'
import './LandingPage.css'
import {Link} from "react-router-dom"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Lottie from 'lottie-react'
import parkingAnimation from '../../Assets/Animations/parkingAnimation.json'
import whyChooseAnimation from '../../Assets/Animations/whyChooseAnimation.json'
import axios from 'axios'

function LandingPage() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      console.log("LandingPage: Fetching current user session...");
      const response = await axios.get('http://localhost:5000/sessions/current');
      console.log("LandingPage: Session response:", response.data);
      if (response.data.user) {
        console.log("LandingPage: Setting current user:", response.data.user);
        setCurrentUser(response.data.user);
      } else {
        console.log("LandingPage: No user session found");
      }
    } catch (err) {
      console.error("LandingPage: Error fetching user session:", err);
    }
  };

  // Add console log for currentUser state changes
  useEffect(() => {
    console.log("LandingPage: Current user state updated:", currentUser);
  }, [currentUser]);

  return (
    <div className="landing-page">
      <Header/>
      
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <div className="landing-hero-text">
            <h1>Welcome to Sojourn Parking</h1>
            <p>
              Find the perfect parking spot with ease. Our smart parking system
              helps you save time and reduce stress by quickly finding available
              parking spaces. Reserve your spot in advance and enjoy a hassle-free
              parking experience.
            </p>
            <Link 
              to="/chooseParking" 
              className="landing-btn landing-btn-primary"
              state={{ currentUser }}
            >
              Reserve Now
            </Link>
          </div>
          <div className="landing-hero-animation">
            <Lottie animationData={parkingAnimation} loop={true} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="landing-features-container">
          <div className="landing-features-content">
            <div className="landing-features-animation">
              <Lottie animationData={whyChooseAnimation} loop={true} />
            </div>
            <div className="landing-features-text">
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
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="landing-about">
        <div className="landing-about-container">
          <h2>About Sojourn Parking</h2>
          <div className="landing-about-content">
            <div className="landing-about-text">
              <h3>Our Story</h3>
              <p>
                Founded in 2024, Sojourn Parking emerged from a simple observation: finding parking in urban areas shouldn't be a stressful experience. 
                We've revolutionized the parking industry by combining cutting-edge technology with exceptional customer service.
              </p>
              <h3>Our Mission</h3>
              <p>
                We're committed to making parking simple, secure, and stress-free. Our mission is to provide innovative parking solutions that save time, 
                reduce environmental impact, and enhance the overall parking experience for everyone.
              </p>
              <h3>Our Values</h3>
              <ul>
                <li>Customer Satisfaction: We prioritize your convenience and peace of mind</li>
                <li>Innovation: Constantly evolving to provide better parking solutions</li>
                <li>Sustainability: Committed to reducing environmental impact</li>
                <li>Security: Ensuring the safety of your vehicle is our top priority</li>
              </ul>
            </div>
            <div className="landing-about-stats">
              <div className="landing-stat-item">
                <h3>10,000+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="landing-stat-item">
                <h3>50+</h3>
                <p>Parking Locations</p>
              </div>
              <div className="landing-stat-item">
                <h3>24/7</h3>
                <p>Customer Support</p>
              </div>
              <div className="landing-stat-item">
                <h3>99%</h3>
                <p>Satisfaction Rate</p>
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