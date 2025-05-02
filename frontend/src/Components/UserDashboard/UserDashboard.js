import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaBell, FaBars, FaEdit, FaSave, FaSignOutAlt, FaTimes, FaTrashAlt, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import "./user-dashboard.css";
import defaultProfilePic from "../../Assets/ProfilePic.png";
import Footer from "../Footer/Footer";

const UserDashboardNew = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profilePic: defaultProfilePic,
    createdAt: "",
  });
  const [reservations, setReservations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [emergencies, setEmergencies] = useState({
    medical: [],
    mechanical: [],
    security: []
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if there's an activeSection in the location state
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      console.log("UserDashboard: Fetching current user session...");
      const response = await axios.get('http://localhost:5000/sessions/current');
      console.log("UserDashboard: Session response:", response.data);
      if (response.data.user) {
        console.log("UserDashboard: Setting current user:", response.data.user);
        setCurrentUser(response.data.user);
        fetchUserEmergencies(response.data.user.email);
      } else {
        console.log("UserDashboard: No user session found");
        setError("Please login to view your emergencies.");
      }
    } catch (err) {
      console.error("UserDashboard: Error fetching user session:", err);
      setError("Please login to view your emergencies.");
    }
  };

  const fetchUserEmergencies = async (userEmail) => {
    try {
      console.log("Fetching emergencies for user:", userEmail);
      
      // Fetch medical emergencies
      const medResponse = await axios.get(`http://localhost:5000/MedIssues/`);
      const userMedEmergencies = medResponse.data.filter(emergency => emergency.email === userEmail);
      console.log("User's medical emergencies:", userMedEmergencies);

      // Fetch mechanical emergencies
      const mecResponse = await axios.get(`http://localhost:5000/MecIssues/`);
      const userMecEmergencies = mecResponse.data.filter(emergency => emergency.email === userEmail);
      console.log("User's mechanical emergencies:", userMecEmergencies);

      // Fetch security emergencies
      const secResponse = await axios.get(`http://localhost:5000/SecIssues/`);
      const userSecEmergencies = secResponse.data.filter(emergency => emergency.email === userEmail);
      console.log("User's security emergencies:", userSecEmergencies);

      setEmergencies({
        medical: userMedEmergencies,
        mechanical: userMecEmergencies,
        security: userSecEmergencies
      });
    } catch (err) {
      console.error("Error fetching user emergencies:", err);
      setError("Failed to load your emergency reports.");
    }
  };

  useEffect(() => {
    if (activeSection === "reservations") {
      fetchReservations();
    }
  }, [activeSection, currentUser]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/slots');
      if (response.data && response.data.slots) {
        // Filter only reserved slots for the current user
        let activeReservations = response.data.slots.filter(slot => 
          slot.isReserved && slot.userName === currentUser?.name
        );
        setReservations(activeReservations);
      } else {
        setReservations([]);
      }
    } catch (err) {
      console.error("Error fetching reservations:", err);
      Swal.fire("Error", "Failed to fetch reservations", "error");
    }
  };

  const formatTime = (isoTime) => {
    if (!isoTime) return "N/A";
    try {
      const date = new Date(isoTime);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (err) {
      console.error("Error formatting time:", err);
      return isoTime;
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/users/profile",
        { name: user.name, email: user.email, phone: user.phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Success!", "Profile updated successfully.", "success");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Profile update failed!");
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "You must be logged in to delete your account.", "error");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "This action is irreversible. Your account will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete("http://localhost:5000/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });

          Swal.fire("Deleted!", "Your account has been deleted.", "success");

          // Remove user session and redirect to login
          localStorage.removeItem("token");
          navigate("/login");
        } catch (err) {
          Swal.fire("Error", "Failed to delete account. Please try again.", "error");
        }
      }
    });
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
      const res = await axios.put("http://localhost:5000/user/profile-pic", formData, {
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

  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files[0];

    // Set the profile photo locally for preview
    const objectUrl = URL.createObjectURL(file);
    setProfilePhoto(objectUrl);

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/users/profile-photo", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      // Update user state with the uploaded photo URL
      setUser((prevUser) => ({ ...prevUser, profilePic: res.data.profilePic }));
      alert("Profile photo updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Profile photo update failed!");
    }
  };

  const handleCancelReservation = async (reservationId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "You must be logged in to cancel a reservation.", "error");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "This action is irreversible. The reservation will be canceled!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/slots/${reservationId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          Swal.fire("Cancelled!", "The reservation has been canceled.", "success");
          fetchReservations();
        } catch (err) {
          Swal.fire("Error", "Failed to cancel reservation. Please try again.", "error");
        }
      }
    });
  };

  const renderEmergenciesSection = () => {
    if (!currentUser) {
      return (
        <div className="userdash-no-reservations">
          <p>{error}</p>
          <button onClick={() => navigate('/login')} className="userdash-btn userdash-primary-btn">
            Login
          </button>
        </div>
      );
    }

    const totalEmergencies = emergencies.medical.length + emergencies.mechanical.length + emergencies.security.length;

    if (totalEmergencies === 0) {
      return (
        <div className="userdash-no-reservations">
          <p>You have no emergency reports yet.</p>
          <Link to="/selectEmergency" className="userdash-btn userdash-primary-btn">
            Report an Emergency
          </Link>
        </div>
      );
    }

    return (
      <div className="userdash-reservations-section">
        <h2 className="userdash-section-title">My Emergency Reports</h2>
        <div className="userdash-reservations-grid">
          {emergencies.medical.map(emergency => (
            <div key={emergency._id} className="userdash-reservation-card">
              <div className="userdash-reservation-header">
                <h3>Medical Emergency</h3>
                <span className="userdash-reservation-status active">
                  Reported
                </span>
              </div>
              <div className="userdash-reservation-details">
                <p><strong>License Plate:</strong> {emergency.lpname}</p>
                <p><strong>Type:</strong> {emergency.etype}</p>
                <p><strong>Condition:</strong> {emergency.pcon}</p>
                <p><strong>Notes:</strong> {emergency.anote}</p>
              </div>
            </div>
          ))}

          {emergencies.mechanical.map(emergency => (
            <div key={emergency._id} className="userdash-reservation-card">
              <div className="userdash-reservation-header">
                <h3>Mechanical Issue</h3>
                <span className="userdash-reservation-status active">
                  Reported
                </span>
              </div>
              <div className="userdash-reservation-details">
                <p><strong>License Plate:</strong> {emergency.lpname}</p>
                <p><strong>Type:</strong> {emergency.etype}</p>
                <p><strong>Notes:</strong> {emergency.anote}</p>
              </div>
            </div>
          ))}

          {emergencies.security.map(emergency => (
            <div key={emergency._id} className="userdash-reservation-card">
              <div className="userdash-reservation-header">
                <h3>Security Concern</h3>
                <span className="userdash-reservation-status active">
                  Reported
                </span>
              </div>
              <div className="userdash-reservation-details">
                <p><strong>License Plate:</strong> {emergency.lpname}</p>
                <p><strong>Type:</strong> {emergency.etype}</p>
                <p><strong>Notes:</strong> {emergency.anote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`userdash-wrapper ${sidebarActive ? "sidebar-open" : ""}`}>
      <aside className="userdash-sidebar">
        <div className="userdash-sidebar-header">
          <div className="userdash-logo">WorkSync</div>
          <FaTimes className="userdash-close-icon" onClick={() => setSidebarActive(false)} />
        </div>
        <ul className="userdash-sidebar-nav">
          <li 
            className={`userdash-sidebar-item ${activeSection === "dashboard" ? "active" : ""}`}
            onClick={() => handleSectionChange("dashboard")}
          >
            Dashboard
          </li>
          <li 
            className={`userdash-sidebar-item ${activeSection === "reservations" ? "active" : ""}`}
            onClick={() => handleSectionChange("reservations")}
          >
            Reservations
          </li>
          <li 
            className={`userdash-sidebar-item ${activeSection === "emergencies" ? "active" : ""}`}
            onClick={() => handleSectionChange("emergencies")}
          >
            Emergencies
          </li>
          <li className="userdash-sidebar-item">Complaints</li>
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
              <img src={profilePhoto || user.profilePic || defaultProfilePic} alt="User" />
            </div>
          </div>
        </header>

        <div className="userdash-dashboard-content">
          {activeSection === "dashboard" && (
            <div className="userdash-profile-section">
              <div className="userdash-profile-card">
                <img src={profilePhoto || user.profilePic || defaultProfilePic} alt="Profile" />
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
          )}

          {activeSection === "reservations" && (
            <div className="userdash-reservations-section">
              <h2 className="userdash-section-title">My Reservations</h2>
              {reservations.length === 0 ? (
                <div className="userdash-no-reservations">
                  <FaCalendarAlt className="userdash-no-reservations-icon" />
                  <p>You have no reservations yet.</p>
                  <Link to="/chooseParking" className="userdash-btn userdash-primary-btn">
                    Make a Reservation
                  </Link>
                </div>
              ) : (
                <div className="userdash-reservations-grid">
                  {reservations.map((reservation) => (
                    <div key={reservation._id} className="userdash-reservation-card">
                      <div className="userdash-reservation-header">
                        <h3>Parking Spot {reservation.slotId}</h3>
                        <span className={`userdash-reservation-status ${reservation.isReserved ? 'active' : 'inactive'}`}>
                          {reservation.isReserved ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="userdash-reservation-details">
                        <p><strong>License Plate:</strong> {reservation.licensePlate}</p>
                        <p><strong>Entry Time:</strong> {formatTime(reservation.entryTime)}</p>
                        <p><strong>Exit Time:</strong> {formatTime(reservation.exitTime) || 'Not yet exited'}</p>
                      </div>
                      <div className="userdash-reservation-actions">
                        <Link 
                          to={`/findMyLocation/${reservation._id}`} 
                          className="userdash-btn userdash-secondary-btn"
                        >
                          Find My Location
                        </Link>
                        <Link 
                          to={`/madeReservations/${reservation._id}`} 
                          className="userdash-btn userdash-secondary-btn"
                        >
                          Update Reservation
                        </Link>
                        <button 
                          className="userdash-btn userdash-cancel-btn"
                          onClick={() => handleCancelReservation(reservation._id)}
                        >
                          Cancel Reservation
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === "emergencies" && renderEmergenciesSection()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardNew;
