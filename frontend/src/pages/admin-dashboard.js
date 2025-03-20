/*import React from "react";
import { FaBell } from "react-icons/fa";
import "../styles/dashboard.css";
import profilepic from "../assests/1.png";

const Dashboard = () => {
 

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <h2 className="logo">WorkSync</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>User Reservations</li>
          <li>Employee Reservation</li>
          <li>Complaints</li>
          <li>Emergency Reports</li>
          <li>Financial</li>
        </ul>
      </aside>
      <main className="content">
        <header className="header">
          <input type="text" placeholder="Search" className="search-bar" />
          <div className="header-right">
            <FaBell className="icon" />
            <div className="profile">
              <img src={profilepic} alt="User" />
              <span>Minduli Nureka</span>
            </div>
          </div>
        </header>
        <section className="stats">
          <div className="stat-card">
            <div className="progress-circle" style={{ "--percentage": "10%" }}></div>
            <div className="stat-info">
              <h4>New Employees</h4>
              <p>1203</p>
              <span className="increase">10% Increase</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="progress-circle" style={{ "--percentage": "20%" }}></div>
            <div className="stat-info">
              <h4>Total Employees</h4>
              <p>12300</p>
              <span className="increase">20% Increase</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="progress-circle" style={{ "--percentage": "30%" }}></div>
            <div className="stat-info">
              <h4>Average Salary</h4>
              <p>65865k</p>
              <span className="decrease">20% Decrease</span>
            </div>
          </div>
        </section>
      
      </main>
    </div>
  );
};

export default Dashboard;
*/


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaBars } from "react-icons/fa";  // Added FaBars for sidebar toggle
import "../styles/dashboard.css";
import profilepic from "../assests/1.png";

const Dashboard = () => {
  const [sidebarActive, setSidebarActive] = useState(false);  // State to toggle sidebar visibility
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      navigate("/"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return (
    <div className={`dashboard-wrapper ${sidebarActive ? "sidebar-active" : ""}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarActive ? "active" : ""}`}>
        <h2 className="logo">WorkSync</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>User Reservations</li>
          <li>Employee Reservation</li>
          <li>Complaints</li>
          <li>Emergency Reports</li>
          <li>Financial</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        {/* Header */}
        <header className="header">
          <FaBars className="icon" onClick={() => setSidebarActive(!sidebarActive)} /> {/* Sidebar toggle */}
          <input type="text" placeholder="Search" className="search-bar" />
          <div className="header-right">
            <FaBell className="icon" />
            <div className="profile">
              <img src={profilepic} alt="User" />
              <span>Minduli Nureka</span>
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <section className="stats">
          <div className="stat-card">
            <div className="progress-circle" style={{ "--percentage": "10%" }}></div>
            <div className="stat-info">
              <h4>New Employees</h4>
              <p>1203</p>
              <span className="increase">10% Increase</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="progress-circle" style={{ "--percentage": "20%" }}></div>
            <div className="stat-info">
              <h4>Total Employees</h4>
              <p>12300</p>
              <span className="increase">20% Increase</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="progress-circle" style={{ "--percentage": "30%" }}></div>
            <div className="stat-info">
              <h4>Average Salary</h4>
              <p>65865k</p>
              <span className="decrease">20% Decrease</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
