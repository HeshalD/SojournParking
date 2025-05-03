import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FaTimes,
  FaBars,
  FaSignOutAlt,
  FaSpinner,
  FaExclamationTriangle,
  FaFileDownload
} from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import ReservationTable from '../ReservationTable/ReservationTable';
import ReviewTable from '../ReviewTable/ReviewTable';
import ComplaintTable from '../ComplaintTable/ComplaintTable';
import EmergencyReports from '../EmergencyReports/EmergencyReports';
import PaymentTable from '../PaymentTable/PaymentTable';
import ProfitLossStatement from '../ProfitLossStatement/ProfitLossStatement';
import MembershipTable from '../MembershipTable/MembershipTable';
import ServiceProviderTable from '../ServiceProviderTable/ServiceProviderTable';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:5000/api/admin";
  const REFRESH_INTERVAL = 30000; // 30 seconds

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_BASE_URL}/summary`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSummary(response.data.data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            localStorage.removeItem("adminToken");
            navigate("/admin/login");
          } else {
            setError(error.response.data.message || "Failed to fetch dashboard data");
          }
        } else {
          setError("Network error. Please check your connection.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
    const intervalId = setInterval(fetchSummary, REFRESH_INTERVAL);
    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("Authentication token not found");
      return;
    }

    try {
      const response = await axios.delete(`${API_BASE_URL}/user/${userId}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        // Refresh the summary after successful deletion
        await refreshSummary(token);
      } else {
        setError(response.data.message || "Failed to delete user");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Failed to delete user");
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  const handleRestore = async (userId) => {
    if (!window.confirm("Are you sure you want to restore this user?")) return;
    
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("Authentication token not found");
      return;
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/user/restore/${userId}`, {}, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        // Refresh the summary after successful restoration
        await refreshSummary(token);
      } else {
        setError(response.data.message || "Failed to restore user");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Failed to restore user");
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  const refreshSummary = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/summary`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        setSummary(response.data.data);
        setError(null);
      } else {
        setError(response.data.message || "Failed to refresh data");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Failed to refresh data");
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const statCards = summary ? [
    { title: 'Total Users', value: summary.totalUsers || 0, color: 'card-total' },
    { title: 'Live Users', value: summary.liveUsers || 0, color: 'card-live' },
    { title: 'Deleted Users', value: summary.deletedUsers || 0, color: 'card-deleted' },
  ] : [];

  const nextSlide = () => setSlideIndex((slideIndex + 1) % statCards.length);
  const prevSlide = () => setSlideIndex((slideIndex - 1 + statCards.length) % statCards.length);

  const generateUserDetailsPDF = () => {
    if (!summary || !summary.userDetails || summary.userDetails.length === 0) {
      alert('No user data available to export');
      return;
    }

    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text('User Details Report', 14, 15);
    
    // Add date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);
    
    // Prepare table data
    const tableData = summary.userDetails.map(user => [
      user.fullName || 'N/A',
      user.email || 'N/A',
      user.phone || 'N/A',
      new Date(user.createdAt).toLocaleDateString(),
      user.isDeleted ? 'Deleted' : (user.isOnline ? 'Online' : 'Offline')
    ]);
    
    // Add table using autoTable
    autoTable(doc, {
      head: [['Name', 'Email', 'Phone', 'Registered At', 'Status']],
      body: tableData,
      startY: 35,
      theme: 'grid',
      headStyles: { fillColor: [80, 176, 135] },
      styles: { fontSize: 8 }
    });
    
    // Save the PDF
    doc.save('user_details_report.pdf');
  };

  const getFilteredUsers = () => {
    if (!summary || !summary.userDetails) return [];
    
    // Get the current stat card type based on slideIndex
    const currentStatType = statCards[slideIndex]?.color;
    
    // Filter users based on the selected stat card
    return summary.userDetails.filter(user => {
      if (currentStatType === 'card-live') {
        return !user.isDeleted && user.isOnline;
      } else if (currentStatType === 'card-deleted') {
        return user.isDeleted;
      } else {
        return true; // Show all users for total users card
      }
    });
  };

  return (
    <div className={`admin-dashboard-page admin-wrapper ${sidebarActive ? "sidebar-open" : ""}`}>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <FaTimes className="userdash-close-icon" onClick={() => setSidebarActive(false)} />
        </div>
        <ul className="admin-sidebar-nav">
          <li 
            className={`admin-sidebar-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            Dashboard
          </li>
          <li 
            className={`admin-sidebar-item ${activeSection === 'reservations' ? 'active' : ''}`}
            onClick={() => setActiveSection('reservations')}
          >
            Reservations
          </li>
          <li 
            className={`admin-sidebar-item ${activeSection === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveSection('reviews')}
          >
            Reviews
          </li>
          <li 
            className={`admin-sidebar-item ${activeSection === 'complaints' ? 'active' : ''}`}
            onClick={() => setActiveSection('complaints')}
          >
            Complaints
          </li>
          <li 
            className={`admin-sidebar-item ${activeSection === 'emergencies' ? 'active' : ''}`}
            onClick={() => setActiveSection('emergencies')}
          >
            Emergencies
          </li>
          <li 
            className={`admin-sidebar-item ${activeSection === 'finances' ? 'active' : ''}`}
            onClick={() => setActiveSection('finances')}
          >
            Finances
          </li>
          <li 
            className={`admin-sidebar-item ${activeSection === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveSection('payments')}
          >
            Payments
          </li>
          <li 
            className={`admin-sidebar-item ${activeSection === 'memberships' ? 'active' : ''}`}
            onClick={() => setActiveSection('memberships')}
          >
            Memberships
          </li>
          <li 
            className={`admin-sidebar-item ${activeSection === 'service-providers' ? 'active' : ''}`}
            onClick={() => setActiveSection('service-providers')}
          >
            Service Providers
          </li>
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
          {error && (
            <div className="error-message">
              <FaExclamationTriangle /> {error}
            </div>
          )}
          
          {loading ? (
            <div className="loading-container">
              <FaSpinner className="spinner" />
              <p>Loading dashboard data...</p>
            </div>
          ) : activeSection === 'dashboard' ? (
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
                <div className="table-header">
                  <h2>User Details</h2>
                  <button className="download-btn" onClick={generateUserDetailsPDF}>
                    <FaFileDownload /> Download PDF
                  </button>
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
                      {getFilteredUsers().map((user, idx) => (
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
          ) : activeSection === 'reservations' ? (
            <ReservationTable />
          ) : activeSection === 'reviews' ? (
            <ReviewTable />
          ) : activeSection === 'complaints' ? (
            <ComplaintTable />
          ) : activeSection === 'emergencies' ? (
            <EmergencyReports />
          ) : activeSection === 'finances' ? (
            <ProfitLossStatement />
          ) : activeSection === 'payments' ? (
            <PaymentTable />
          ) : activeSection === 'memberships' ? (
            <MembershipTable />
          ) : activeSection === 'service-providers' ? (
            <ServiceProviderTable />
          ) : (
            <p className="no-data">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
