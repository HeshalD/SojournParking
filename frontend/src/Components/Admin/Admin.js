import React from "react";
import { FaUserShield, FaUsers, FaCar, FaDollarSign } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AuthStyles.css"; 

const AdminDashboard = () => {
  return (
    <div className="container-fluid d-flex flex-column flex-lg-row vh-100">
      {/* Sidebar */}
      <div className="sidebar p-4 text-white d-flex flex-column">
        <h3 className="text-center mb-4">Admin Panel</h3>
        <ul className="list-unstyled">
          <li className="py-2"><FaUserShield /> Dashboard</li>
          <li className="py-2"><FaUsers /> Manage Users</li>
          <li className="py-2"><FaCar /> Manage Parking</li>
          <li className="py-2"><FaDollarSign /> Revenue</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content p-5 w-100">
        <h2 className="mb-4">Welcome, Admin</h2>
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <div className="dashboard-card">
              <FaUsers className="dashboard-icon" />
              <h5>Total Users</h5>
              <p>250</p>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="dashboard-card">
              <FaCar className="dashboard-icon" />
              <h5>Active Parkings</h5>
              <p>125</p>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="dashboard-card">
              <FaDollarSign className="dashboard-icon" />
              <h5>Revenue</h5>
              <p>$12,500</p>
              <p>HHHHHHHHH</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
