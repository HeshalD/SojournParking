import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaBars, FaEdit, FaSave, FaSignOutAlt, FaTrash, FaSearch, FaCamera } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/userdash.css";
import defaultProfilePic from "../assests/1.png";

const UserDashboard = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profilePic: defaultProfilePic,
    createdAt: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("http://localhost:8070/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        Swal.fire("Error", "Failed to fetch user details.", "error");
      } finally {
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

      Swal.fire("Success!", "Profile updated successfully.", "success");
      setIsEditing(false);
    } catch (err) {
      Swal.fire("Error", "Failed to update profile.", "error");
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

  const handleUploadProfilePic = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:8070/user/profile-pic", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire("Success!", "Profile photo updated successfully.", "success");
      setUser((prev) => ({ ...prev, profilePic: res.data.profilePic }));
    } catch (err) {
      Swal.fire("Error", "Failed to upload profile photo.", "error");
    }
  };

  return (
    <div className={`dashboard-wrapper ${sidebarActive ? "sidebar-active" : ""}`}>
      <aside className={`sidebar ${sidebarActive ? "active" : ""}`}>
        <h2 className="logo">User Profile</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>User Reservations</li>
          <li>Employee Reservations</li>
          <li>Complaints</li>
          <li>Emergency Reports</li>
          <li>Financial</li>
          <li onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }} className="logout">
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </aside>

      <main className="content">
        <header className="header">
          <FaBars className="icon" onClick={() => setSidebarActive(!sidebarActive)} />
          <div className="search-container">
            <input type="text" placeholder="Search" className="search-bar" />
            <FaSearch className="search-icon" />
          </div>
          <div className="header-right">
            <FaBell className="icon" />
            <div className="profile">
              <img src={user.profilePic || defaultProfilePic} alt="User" />
              <span>{user.name || "User"}</span>
            </div>
          </div>
        </header>

        <section className="user-profile">
          {loading ? (
            <p className="loading">Loading profile...</p>
          ) : (
            <div className="profile-card">
              <div className="profile-pic-container">
                <img src={user.profilePic || defaultProfilePic} alt="User" className="profile-pic" />
                <label className="upload-icon">
                  <FaCamera />
                  <input type="file" accept="image/*" onChange={handleProfilePicChange} />
                </label>
              </div>
              {selectedFile && (
                <button className="btn btn-upload" onClick={handleUploadProfilePic}>
                  Upload Photo
                </button>
              )}
              <h3>{user.name || "User Name"}</h3>
              <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          )}

          <div className="profile-info">
            <h4>Profile Details</h4>
            <div className="user-details">
              <label>Name:</label>
              {isEditing ? <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} /> : <p>{user.name}</p>}

              <label>Email:</label>
              {isEditing ? <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} /> : <p>{user.email}</p>}

              <label>Phone:</label>
              {isEditing ? <input type="tel" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} /> : <p>{user.phone}</p>}
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

            <button className="btn btn-danger mt-3" onClick={() => Swal.fire("Warning", "Delete functionality here", "warning")}>
              <FaTrash /> Delete Account
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;

