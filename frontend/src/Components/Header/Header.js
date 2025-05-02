import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="app-header-component">
      <header className="header">
        <div className="logo">
          <img src="/logo-white.png" alt="Logo" width={50} />
        </div>
        <nav className="nav-links">
          <Link to="/chooseParking">Reservations</Link>
          <Link to="/select-emergency">Emergency Services</Link>
          <Link to="/displayReview">Reviews</Link>
          <Link to="/chooseParking">Customer Care</Link>
        </nav>
        
        <div className="profile-icon">
        <Link to={`/userDashboard`}>
            <img
              src="/Icons/user-regular.svg"
              alt="user"
              width={25}
              className="usericon"
            />
        </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;