import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSignOutAlt, FaTrashAlt, FaBars, FaTimes, FaBell, FaEdit, FaSave } from "react-icons/fa";
import "./userdash.css";

// Import the local placeholder image
import placeholderImage from '../../Assets/ProfilePic.png';

const UserDashboardNew = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    createdAt: "",
    profilePhoto: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

const getProfilePhotoUrl = (photoPath) => {

  return photoPath?.startsWith("http") ? photoPath : `http://localhost:5001${photoPath}`;
};

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5001/api/users/profile",
        { name: user.name, email: user.email, phone: user.phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Profile update failed!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files[0];
    const objectUrl = URL.createObjectURL(file);  // Create a local URL for the selected image
    setProfilePhoto(objectUrl);  // Update the profile photo immediately with the new image

    // Form data for uploading the photo to the backend
    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5001/api/users/profile-photo", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      // Use the returned path from the backend to update the profile photo
      setUser((prevUser) => ({ ...prevUser, profilePhoto: res.data.profilePhoto }));
      alert("Profile photo updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Profile photo update failed!");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete("http://localhost:5001/api/users/delete-account", {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Account deleted successfully!");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
        navigate("/login");
      } catch (err) {
        console.error(err);
        alert("Account deletion failed!");
      }
    }
  };

  return (
    <div className={`userdash-wrapper ${sidebarActive ? "sidebar-open" : ""}`}>
      <aside className="userdash-sidebar">
        <div className="userdash-sidebar-header">
          <div className="userdash-logo">WorkSync</div>
          <FaTimes className="userdash-close-icon" onClick={() => setSidebarActive(false)} />
        </div>
        <ul className="userdash-sidebar-nav">
          <li className="userdash-sidebar-item active">Dashboard</li>
          <li className="userdash-sidebar-item">Reservations</li>
          <li className="userdash-sidebar-item">Complaints</li>
          <li className="userdash-sidebar-item">Reports</li>
          <li className="userdash-sidebar-item">Financials</li>
          <li className="userdash-sidebar-item userdash-logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </aside>

      <div className="userdash-main-content">
        <header className="userdash-header">
          <FaBars className="userdash-menu-icon" onClick={() => setSidebarActive(true)} />
          <div className="userdash-search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="userdash-header-icons">
            <FaBell className="userdash-bell-icon" />
            <div className="userdash-profile-pic">
            <img
  src={profilePhoto || getProfilePhotoUrl(user.profilePhoto)}
  alt="User"
  onError={(e) => {
    e.target.onerror = null;
    // Use the local placeholder image on error
    e.target.src = placeholderImage;
  }}
/>

            </div>
          </div>
        </header>

        <div className="userdash-dashboard-content">
          <div className="userdash-profile-section">
            <div className="userdash-profile-card">
              <img
                src={profilePhoto || getProfilePhotoUrl(user.profilePhoto)}
                alt="User"
                onError={(e) => {
                  e.target.onerror = null;
                  // Use the local placeholder image on error
                  e.target.src = placeholderImage;
                }}
              />
              <h3>{user.name || "User Name"}</h3>
            </div>

            <div className="userdash-profile-info">
              <h4>Profile Details</h4>

              <div className="userdash-profile-info-item">
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

              <div className="userdash-profile-info-item">
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

              <div className="userdash-profile-info-item">
                <label>Phone:</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  />
                ) : (
                  <p>{user.phone || "Not Provided"}</p>
                )}
              </div>

              <div className="userdash-profile-info-item">
                <label>Profile Photo:</label>
                <input type="file" onChange={handleProfilePhotoChange} />
              </div>

              <div className="userdash-profile-buttons">
                {isEditing ? (
                  <button className="userdash-btn userdash-save-btn" onClick={handleSave}>
                    <FaSave /> Save
                  </button>
                ) : (
                  <button className="userdash-btn userdash-edit-btn" onClick={() => setIsEditing(true)}>
                    <FaEdit /> Edit
                  </button>
                )}
                <button className="userdash-btn userdash-delete-btn" onClick={handleDeleteAccount}>
                  <FaTrashAlt /> Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardNew;
