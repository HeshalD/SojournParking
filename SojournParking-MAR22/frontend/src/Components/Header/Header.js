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
          <a href="#">Reservations</a>
          <a href="#">Emergency Services</a>
          <a href="#">Discounts &amp; Promos</a>
          <a href="#">Customer Care</a>
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