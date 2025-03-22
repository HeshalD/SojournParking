import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaBars, FaEdit, FaSave, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import "./userdash.css";
import profilepic from "../../Assets/ProfilePic.png";

const UserDashboard = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    createdAt: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user details", err);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/user/profile",
        { name: user.name, email: user.email, phone: user.phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating user profile", err);
      alert("Failed to update profile.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={`dashboard-wrapper ${sidebarActive ? "sidebar-active" : ""}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarActive ? "active" : ""}`}>
        <h2 className="logo">WorkSync</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>User Reservations</li>
          <li>Employee Reservations</li>
          <li>Complaints</li>
          <li>Emergency Reports</li>
          <li>Financial</li>
          <li onClick={handleLogout} className="logout">
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        {/* Header */}
        <header className="header">
          <FaBars className="icon menu-icon" onClick={() => setSidebarActive(!sidebarActive)} />
          <div className="search-container">
            <input type="text" placeholder="Search" className="search-bar" />
          </div>
          <div className="header-right">
            <div className="notification-icon">
              <FaBell className="icon" />
            </div>
            <div className="profile-header">
              <img src={profilepic} alt="User" />
              <span>{user.name || "User"}</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {/* User Profile Section */}
          <section className="user-profile">
            {loading ? (
              <p className="loading">Loading profile...</p>
            ) : (
              <div className="profile-card">
                <img src={profilepic} alt="User" className="profile-pic" />
                <h3>{user.name || "User Name"}</h3>
                <p>Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Invalid Date"}</p>
              </div>
            )}

            <div className="profile-info">
              <h4>Profile Details</h4>
              <div className="user-details">
                <div className="detail-item">
                  <label>Name:</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={user.name} 
                      onChange={(e) => setUser({ ...user, name: e.target.value })} 
                    />
                  ) : (
                    <p>{user.name}</p>
                  )}
                </div>

                <div className="detail-item">
                  <label>Email:</label>
                  {isEditing ? (
                    <input 
                      type="email" 
                      value={user.email} 
                      onChange={(e) => setUser({ ...user, email: e.target.value })} 
                    />
                  ) : (
                    <p>{user.email}</p>
                  )}
                </div>

                <div className="detail-item">
                  <label>Phone:</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={user.phone} 
                      onChange={(e) => setUser({ ...user, phone: e.target.value })} 
                    />
                  ) : (
                    <p>{user.phone}</p>
                  )}
                </div>
              </div>

              {/* Edit & Save Buttons */}
              {isEditing ? (
                <button className="btn btn-save" onClick={handleSave}>
                  <FaSave /> Save
                </button>
              ) : (
                <button className="btn btn-edit" onClick={handleEdit}>
                  <FaEdit /> Edit
                </button>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;