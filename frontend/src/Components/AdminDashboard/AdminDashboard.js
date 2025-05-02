/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/admin/summary", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setSummary(res.data.data);
      } catch (err) {
        console.error("Error fetching user summary:", err);
      }
    };

    fetchSummary();
  }, []);

  const statCards = summary ? [
    {
      title: 'Total Users',
      value: summary.totalUsers,
      color: 'card-total'
    },
    {
      title: 'Live Users',
      value: summary.liveUsers,
      color: 'card-live'
    },
    {
      title: 'Deleted Users',
      value: summary.deletedUsers,
      color: 'card-deleted'
    }
  ] : [];

  const nextSlide = () => {
    setSlideIndex((slideIndex + 1) % statCards.length);
  };

  const prevSlide = () => {
    setSlideIndex((slideIndex - 1 + statCards.length) % statCards.length);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </header>

      {summary ? (
        <div className="dashboard-content">


          <div className="slider">
            <button className="slider-btn" onClick={prevSlide}>‹</button>
            <div className={`card ${statCards[slideIndex].color}`}>
              <h2>{statCards[slideIndex].title}</h2>
              <p>{statCards[slideIndex].value}</p>
            </div>
            <button className="slider-btn" onClick={nextSlide}>›</button>
          </div>


          <div className="cards-grid">
            {statCards.map((stat, idx) => (
              <div className={`card ${stat.color}`} key={idx}>
                <h2>{stat.title}</h2>
                <p>{stat.value}</p>
              </div>
            ))}
          </div>


          <div className="user-table-container">
            <h2>User Details</h2>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Registered At</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {summary.userDetails.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      {user.isDeleted
                        ? <span className="status deleted">Deleted</span>
                        : user.isOnline
                          ? <span className="status online">Online</span>
                          : <span className="status offline">Offline</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      ) : (
        <p className="loading">Loading user summary...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
*/



/*

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/admin/summary", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setSummary(res.data.data);
    } catch (err) {
      console.error("Error fetching user summary:", err);
    }
  };

  const handleEditClick = (user, idx) => {
    setEditIndex(idx);
    setEditForm({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (userId) => {
    try {
      await axios.put(`http://localhost:5001/api/admin/edit-user/${userId}`, editForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setEditIndex(null);
      fetchSummary();
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5001/api/admin/delete-user/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchSummary();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const statCards = summary ? [
    { title: 'Total Users', value: summary.totalUsers, color: 'card-total' },
    { title: 'Live Users', value: summary.liveUsers, color: 'card-live' },
    { title: 'Deleted Users', value: summary.deletedUsers, color: 'card-deleted' }
  ] : [];

  const nextSlide = () => setSlideIndex((slideIndex + 1) % statCards.length);
  const prevSlide = () => setSlideIndex((slideIndex - 1 + statCards.length) % statCards.length);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </header>

      {summary ? (
        <div className="dashboard-content">


          <div className="slider">
            <button className="slider-btn" onClick={prevSlide}>‹</button>
            <div className={`card ${statCards[slideIndex].color}`}>
              <h2>{statCards[slideIndex].title}</h2>
              <p>{statCards[slideIndex].value}</p>
            </div>
            <button className="slider-btn" onClick={nextSlide}>›</button>
          </div>


          <div className="cards-grid">
            {statCards.map((stat, idx) => (
              <div className={`card ${stat.color}`} key={idx}>
                <h2>{stat.title}</h2>
                <p>{stat.value}</p>
              </div>
            ))}
          </div>


          <div className="user-table-container">
            <h2>User Details</h2>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Registered</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {summary.userDetails.map((user, idx) => (
                  <tr key={user._id}>
                    <td>
                      {editIndex === idx ? (
                        <input name="fullName" value={editForm.fullName} onChange={handleEditChange} />
                      ) : user.fullName}
                    </td>
                    <td>
                      {editIndex === idx ? (
                        <input name="email" value={editForm.email} onChange={handleEditChange} />
                      ) : user.email}
                    </td>
                    <td>
                      {editIndex === idx ? (
                        <input name="phone" value={editForm.phone} onChange={handleEditChange} />
                      ) : user.phone}
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      {user.isDeleted
                        ? <span className="status deleted">Deleted</span>
                        : user.isOnline
                          ? <span className="status online">Online</span>
                          : <span className="status offline">Offline</span>}
                    </td>
                    <td>
                      {editIndex === idx ? (
                        <>
                          <button className="action-btn save" onClick={() => handleEditSave(user._id)}>Save</button>
                          <button className="action-btn cancel" onClick={() => setEditIndex(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="action-btn edit" onClick={() => handleEditClick(user, idx)}>Edit</button>
                          <button className="action-btn delete" onClick={() => handleDelete(user._id)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      ) : (
        <p className="loading">Loading user summary...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
*/
/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);  // state to store fetched summary
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();  // Initialize navigate hook for routing

  // UseEffect to fetch summary data on component mount
  useEffect(() => {
    const fetchSummary = async () => {
      const token = localStorage.getItem("adminToken");  // Get the token from localStorage
      if (!token) {
        // If no token, redirect to login page
        navigate("/admin/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5001/api/admin/summary", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSummary(response.data.data);  // Set the fetched data into state
        console.log("Summary:", response.data);
      } catch (error) {
        console.error("Error fetching user summary:", error);
        // Handle Unauthorized or other errors gracefully
        if (error.response && error.response.status === 401) {
          navigate("/admin/login");  // Redirect to login if unauthorized
        }
      }
    };

    fetchSummary();
  }, [navigate]);  // Adding navigate as dependency to avoid stale state

  // Check if summary is available to render
  const statCards = summary ? [
    {
      title: 'Total Users',
      value: summary.totalUsers,
      color: 'card-total',
    },
    {
      title: 'Live Users',
      value: summary.liveUsers,
      color: 'card-live',
    },
    {
      title: 'Deleted Users',
      value: summary.deletedUsers,
      color: 'card-deleted',
    },
  ] : [];

  // Slider functionality
  const nextSlide = () => {
    setSlideIndex((slideIndex + 1) % statCards.length);
  };

  const prevSlide = () => {
    setSlideIndex((slideIndex - 1 + statCards.length) % statCards.length);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </header>

      {summary ? (
        <div className="dashboard-content">

          <div className="slider">
            <button className="slider-btn" onClick={prevSlide}>‹</button>
            <div className={`card ${statCards[slideIndex].color}`}>
              <h2>{statCards[slideIndex].title}</h2>
              <p>{statCards[slideIndex].value}</p>
            </div>
            <button className="slider-btn" onClick={nextSlide}>›</button>
          </div>


          <div className="cards-grid">
            {statCards.map((stat, idx) => (
              <div className={`card ${stat.color}`} key={idx}>
                <h2>{stat.title}</h2>
                <p>{stat.value}</p>
              </div>
            ))}
          </div>


          <div className="user-table-container">
            <h2>User Details</h2>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Registered At</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {summary.userDetails.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      {user.isDeleted
                        ? <span className="status deleted">Deleted</span>
                        : user.isOnline
                          ? <span className="status online">Online</span>
                          : <span className="status offline">Offline</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="loading">Loading user summary...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
*/


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FaTimes,

  FaBars,

  FaSignOutAlt
} from 'react-icons/fa';
import './AdminDashboard.css';


const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [sidebarActive, setSidebarActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/admin/summary", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSummary(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/admin/login");
        }
      }
    };

    fetchSummary();
  }, [navigate]);

  const statCards = summary ? [
    { title: 'Total Users', value: summary.totalUsers, color: 'card-total' },
    { title: 'Live Users', value: summary.liveUsers, color: 'card-live' },
    { title: 'Deleted Users', value: summary.deletedUsers, color: 'card-deleted' },
  ] : [];

  const nextSlide = () => setSlideIndex((slideIndex + 1) % statCards.length);
  const prevSlide = () => setSlideIndex((slideIndex - 1 + statCards.length) % statCards.length);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className={`admin-wrapper ${sidebarActive ? "sidebar-open" : ""}`}>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
        <FaTimes className="userdash-close-icon" onClick={() => setSidebarActive(false)} />
          
        </div>
        <ul className="admin-sidebar-nav">
          <li className="admin-sidebar-item active">Dashboard</li>
          <li className="admin-sidebar-item">Users</li>
          <li className="admin-sidebar-item">Reports</li>
          <li className="admin-sidebar-item">Logs</li>
          <li className="admin-sidebar-item admin-logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </aside>

      <div className="admin-main-content">
        <header className="admin-header">
          <FaBars className="admin-menu-icon" onClick={() => setSidebarActive(true)} />
          <h1>Admin Dashboard</h1>
        </header>

        <div className="dashboard-container">
         
          {summary ? (
            <div className="dashboard-content">
              <div className="slider">
                <button className="slider-btn" onClick={prevSlide}>‹</button>
                <div className={`card ${statCards[slideIndex].color}`}>
                  <h2>{statCards[slideIndex].title}</h2>
                  <p>{statCards[slideIndex].value}</p>
                </div>
                <button className="slider-btn" onClick={nextSlide}>›</button>
              </div>

              <div className="cards-grid">
                {statCards.map((stat, idx) => (
                  <div className={`card ${stat.color}`} key={idx}>
                    <h2>{stat.title}</h2>
                    <p>{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="user-table-container">
                <h2>User Details</h2>
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Registered At</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.userDetails.map((user, idx) => (
                      <tr key={idx}>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          {user.isDeleted ? (
                            <span className="status deleted">Deleted</span>
                          ) : user.isOnline ? (
                            <span className="status online">Online</span>
                          ) : (
                            <span className="status offline">Offline</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="loading">Loading user summary...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
