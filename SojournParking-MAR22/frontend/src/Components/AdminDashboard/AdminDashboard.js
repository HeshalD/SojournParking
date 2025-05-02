/*import React, { useEffect, useState } from 'react';
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
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/adminLogin");
      return;
    }

    const fetchSummary = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/admin/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/adminLogin");
        }
      }
    };

    fetchSummary();
    const intervalId = setInterval(fetchSummary, 5000);
    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`http://localhost:5001/api/admin/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshSummary(token);
    } catch (error) {
      alert("Failed to delete user.");
      console.error(error);
    }
  };

  const handleRestore = async (userId) => {
    if (!window.confirm("Are you sure you want to restore this user?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      await axios.put(`http://localhost:5001/api/admin/restore/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshSummary(token);
    } catch (error) {
      alert("Failed to restore user.");
      console.error(error);
    }
  };

  const refreshSummary = async (token) => {
    try {
      const updatedSummary = await axios.get("http://localhost:5001/api/admin/summary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummary(updatedSummary.data.data);
    } catch (error) {
      console.error("Failed to refresh summary", error);
    }
  };

  const statCards = summary ? [
    { title: 'Total Users', value: summary.totalUsers || 0, color: 'card-total' },
    { title: 'Live Users', value: summary.liveUsers || 0, color: 'card-live' },
    { title: 'Deleted Users', value: summary.deletedUsers || 0, color: 'card-deleted' },
  ] : [];

  const nextSlide = () => setSlideIndex((slideIndex + 1) % statCards.length);
  const prevSlide = () => setSlideIndex((slideIndex - 1 + statCards.length) % statCards.length);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/adminLogin");
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
                <div className="table-wrapper">
                  <table className="user-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Registered At</th>
                        <th>Status</th>
                        <th>Action</th>
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
                          <td>
                            {user.isDeleted ? (
                              <button className="restore-btn" onClick={() => handleRestore(user._id)}>
                                Restore
                              </button>
                            ) : (
                              <button className="delete-btn" onClick={() => handleDelete(user._id)}>
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
*/



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FaTimes,
  FaBars,
  FaSignOutAlt
} from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './AdminDashboard.css';
import autoTable from 'jspdf-autotable';



const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [sidebarActive, setSidebarActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchSummary = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/admin/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/adminLogin");
        }
      }
    };

    fetchSummary();
    const intervalId = setInterval(fetchSummary, 5000);
    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`http://localhost:5001/api/admin/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshSummary(token);
    } catch (error) {
      alert("Failed to delete user.");
      console.error(error);
    }
  };

  const handleRestore = async (userId) => {
    if (!window.confirm("Are you sure you want to restore this user?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      await axios.put(`http://localhost:5001/api/admin/restore/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshSummary(token);
    } catch (error) {
      alert("Failed to restore user.");
      console.error(error);
    }
  };

  const refreshSummary = async (token) => {
    try {
      const updatedSummary = await axios.get("http://localhost:5001/api/admin/summary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummary(updatedSummary.data.data);
    } catch (error) {
      console.error("Failed to refresh summary", error);
    }
  };

  const statCards = summary ? [
    { title: 'Total Users', value: summary.totalUsers || 0, color: 'card-total' },
    { title: 'Live Users', value: summary.liveUsers || 0, color: 'card-live' },
    { title: 'Deleted Users', value: summary.deletedUsers || 0, color: 'card-deleted' },
  ] : [];

  const nextSlide = () => setSlideIndex((slideIndex + 1) % statCards.length);
  const prevSlide = () => setSlideIndex((slideIndex - 1 + statCards.length) % statCards.length);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/adminLogin");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("User Details", 14, 15);
  
    const tableColumn = ["Name", "Email", "Phone", "Registered At", "Status"];
    const tableRows = [];
  
    summary.userDetails.forEach(user => {
      const userData = [
        user.fullName,
        user.email,
        user.phone,
        new Date(user.createdAt).toLocaleDateString(),
        user.isDeleted ? "Deleted" : (user.isOnline ? "Online" : "Offline")
      ];
      tableRows.push(userData);
    });
  
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
  
    doc.save("user-details.pdf");
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
  <div className="user-table-header">
    <h2>User Details</h2>
  </div>
  <div className="table-wrapper">
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Registered At</th>
          <th>Status</th>
          <th>Action</th>
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
            <td>
              {user.isDeleted ? (
                <button className="restore-btn" onClick={() => handleRestore(user._id)}>
                  Restore
                </button>
              ) : (
                <button className="delete-btn" onClick={() => handleDelete(user._id)}>
                  Delete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div style={{ marginTop: '20px', textAlign: 'right' }}>
    <button className="download-btn" onClick={downloadPDF}>Download PDF</button>
  </div>
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
