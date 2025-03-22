import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaBars } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import profilepic from "../../Assets/ProfilePic.png";
import "./AdminDashboard.css";
import ServiceProviderProfile from "../ServiceProviderProfile/ServiceProviderProfile";

const Dashboard = () => {
    const [sidebarActive, setSidebarActive] = useState(false);
    const [activeSection, setActiveSection] = useState("dashboard"); // Track active section
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
        if (!isAuthenticated) {
            navigate("/"); // Redirect to login if not authenticated
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
        navigate("/adminLogin");
    };

    return (
        <div className={`dashboard-wrapper ${sidebarActive ? "sidebar-active" : ""}`}>
            {/* Sidebar */}
            <aside className={`sidebar ${sidebarActive ? "active" : ""}`}>
                <h2 className="logo">Admin</h2>
                <ul>
                    <li className={activeSection === "dashboard" ? "active" : ""} onClick={() => setActiveSection("dashboard")}>
                        Dashboard
                    </li>
                    <li>User Reservations</li>
                    <li>Employee Reservations</li>
                    <li>Complaints</li>
                    <li className={activeSection === "serviceProviders" ? "active" : ""} onClick={() => setActiveSection("serviceProviders")}>
                        Service Providers
                    </li>
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
                        </div>
                    </div>
                </header>

                {/* Main Display Area */}
                <section className="mid">
                    {activeSection === "dashboard" ? (
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
                    ) : (
                        <ServiceProviderProfile />
                    )}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
