/*import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaBars, FaEdit, FaSave } from "react-icons/fa"; // Added FaEdit & FaSave
import axios from "axios";
import "../styles/userdash.css";
import profilepic from "../assests/1.png";

const UserDashboard = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/"); // Redirect to login if not authenticated
    }

    // Fetch user details from the backend
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8070/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user details", err);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:8070/user/profile",
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

  return (
    <div className={`dashboard-wrapper ${sidebarActive ? "sidebar-active" : ""}`}>

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


      <main className="content">

        <header className="header">
          <FaBars className="icon" onClick={() => setSidebarActive(!sidebarActive)} />
          <input type="text" placeholder="Search" className="search-bar" />
          <div className="header-right">
            <FaBell className="icon" />
            <div className="profile">
              <img src={profilepic} alt="User" />
              <span>{user.name || "User"}</span>
            </div>
          </div>
        </header>


        <section className="stats">

          <div className="stat-card user-card">
            <h4>User Profile</h4>
            <div className="user-details">
              <label>Name:</label>
              {isEditing ? (
                <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
              ) : (
                <p>{user.name}</p>
              )}

              <label>Email:</label>
              {isEditing ? (
                <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
              ) : (
                <p>{user.email}</p>
              )}

              <label>Phone:</label>
              {isEditing ? (
                <input type="text" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
              ) : (
                <p>{user.phone}</p>
              )}
            </div>


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

export default UserDashboard;
*/


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaBars, FaEdit, FaSave, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import "../styles/userdash.css";
import profilepic from "../assests/1.png";

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
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/user-dashboard"); // Redirect to login if not authenticated
    }

    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8070/user/profile", {
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
        "http://localhost:8070/user/profile",
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
          <FaBars className="icon" onClick={() => setSidebarActive(!sidebarActive)} />
          <input type="text" placeholder="Search" className="search-bar" />
          <div className="header-right">
            <FaBell className="icon" />
            <div className="profile">
              <img src={profilepic} alt="User" />
              <span>{user.name || "User"}</span>
            </div>
          </div>
        </header>

        {/* User Profile Section */}
        <section className="user-profile">
          {loading ? (
            <p className="loading">Loading profile...</p>
          ) : (
            <div className="profile-card">
              <img src={profilepic} alt="User" className="profile-pic" />
              <h3>{user.name || "User Name"}</h3>
              <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          )}

          <div className="profile-info">
            <h4>Profile Details</h4>
            <div className="user-details">
              <label>Name:</label>
              {isEditing ? (
                <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
              ) : (
                <p>{user.name}</p>
              )}

              <label>Email:</label>
              {isEditing ? (
                <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
              ) : (
                <p>{user.email}</p>
              )}

              <label>Phone:</label>
              {isEditing ? (
                <input type="text" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
              ) : (
                <p>{user.phone}</p>
              )}
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
      </main>
    </div>
  );
};

export default UserDashboard;
