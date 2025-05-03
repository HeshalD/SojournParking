import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaBell, FaBars, FaEdit, FaSave, FaSignOutAlt, FaTimes, FaTrashAlt, FaCalendarAlt, FaStar, FaCreditCard, FaHome } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import "./user-dashboard.css";
import placeholderImage from "../../Assets/ProfilePic.png";
import Footer from "../Footer/Footer";

const UserDashboard = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profilePic: placeholderImage,
    createdAt: "",
    profilePhoto: "",
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
  const [reviews, setReviews] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
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
      const response = await axios.get('http://localhost:5000/sessions/current', {
        withCredentials: true
      });
      console.log("UserDashboard: Session response:", response.data);
      
      if (response.data.user) {
        console.log("UserDashboard: Setting current user:", response.data.user);
        setCurrentUser(response.data.user);
        fetchUserEmergencies(response.data.user.email);
      } else {
        console.log("UserDashboard: No user session found");
        setError("Please login to view your emergencies.");
        
        // Check if we have a token
        const token = localStorage.getItem("token");
        if (token) {
          console.log("Token found but no session, attempting to recreate session...");
          try {
            // Try to get user info using token
            const userRes = await axios.get('http://localhost:5000/api/users/profile', {
              headers: { Authorization: `Bearer ${token}` }
            });
            
            // Create new session
            await axios.post("http://localhost:5000/sessions", {
              name: userRes.data.name,
              email: userRes.data.email,
              phone: userRes.data.phone || "",
              profilePic: userRes.data.profilePic || ""
            }, {
              withCredentials: true
            });
            
            // Try fetching session again
            const newSessionRes = await axios.get('http://localhost:5000/sessions/current', {
              withCredentials: true
            });
            
            if (newSessionRes.data.user) {
              console.log("Session recreated successfully");
              setCurrentUser(newSessionRes.data.user);
              fetchUserEmergencies(newSessionRes.data.user.email);
              return;
            }
          } catch (err) {
            console.error("Error recreating session:", err);
          }
        }
      
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
      const mecResponse = await axios.get(`http://localhost:5000/MecIssues`);
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

  const fetchUserReviews = async (userEmail) => {
    try {
      const response = await axios.get('http://localhost:5000/Review');
      const userReviews = response.data.review.filter(review => review.email === userEmail);
      setReviews(userReviews);
    } catch (err) {
      console.error("Error fetching user reviews:", err);
      setError("Failed to load your reviews.");
    }
  };

  const fetchUserComplaints = async (userEmail) => {
    try {
      const response = await axios.get('http://localhost:5000/complaint');
      const userComplaints = response.data.filter(complaint => complaint.email === userEmail);
      setComplaints(userComplaints);
    } catch (err) {
      console.error("Error fetching user complaints:", err);
      setError("Failed to load your complaints.");
    }
  };

  const fetchUserPayments = async (userEmail) => {
    try {
      const response = await axios.get('http://localhost:5000/payment');
      const userPayments = response.data.filter(payment => 
        payment.parkingDetails && payment.parkingDetails.userEmail === userEmail
      );
      setPayments(userPayments);
    } catch (err) {
      console.error("Error fetching user payments:", err);
      setError("Failed to load your payment history.");
    }
  };

  useEffect(() => {
    if (activeSection === "reservations") {
      fetchReservations();
    }
    if (activeSection === "reviews") {
      fetchUserReviews(currentUser?.email);
    }
    if (activeSection === "complaints") {
      fetchUserComplaints(currentUser?.email);
    }
    if (activeSection === "payments") {
      fetchUserPayments(currentUser?.email);
    }
  }, [activeSection, currentUser]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/slots');
      if (response.data && response.data.slots) {
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

  const getProfilePhotoUrl = (photoPath) => {
    return photoPath?.startsWith("http") ? photoPath : `http://localhost:5000${photoPath}`;
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
          await axios.delete("http://localhost:5000/api/users/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });

          Swal.fire("Deleted!", "Your account has been deleted.", "success");

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
      const res = await axios.put("http://localhost:5000/api/users/profile-pic", formData, {
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
    const objectUrl = URL.createObjectURL(file);
    setProfilePhoto(objectUrl);

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/users/profile-photo", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire("Success!", "Profile photo updated successfully.", "success");
      setUser((prev) => ({ ...prev, profilePhoto: res.data.profilePhoto }));
    } catch (err) {
      Swal.fire("Error", "Failed to upload profile photo.", "error");
    }
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/slots/${reservationId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      Swal.fire("Success!", "Reservation cancelled successfully.", "success");
      fetchReservations();
    } catch (err) {
      console.error("Error cancelling reservation:", err);
      Swal.fire("Error", "Failed to cancel reservation", "error");
    }
  };

  const handleUpdateEmergency = async (type, id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const endpoint = type === 'medical' ? 'MedIssues' : 
                      type === 'mechanical' ? 'MecIssues' : 'SecIssues';
      
      await axios.put(
        `http://localhost:5000/${endpoint}/${id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      Swal.fire("Success!", "Emergency updated successfully.", "success");
      fetchUserEmergencies(currentUser?.email);
    } catch (err) {
      console.error("Error updating emergency:", err);
      Swal.fire("Error", "Failed to update emergency", "error");
    }
  };

  const handleDeleteEmergency = async (type, id) => {
    try {
      const token = localStorage.getItem("token");
      const endpoint = type === 'medical' ? 'MedIssues' : 
                      type === 'mechanical' ? 'MecIssues' : 'SecIssues';
      
      await axios.delete(
        `http://localhost:5000/${endpoint}/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      Swal.fire("Success!", "Emergency deleted successfully.", "success");
      fetchUserEmergencies(currentUser?.email);
    } catch (err) {
      console.error("Error deleting emergency:", err);
      Swal.fire("Error", "Failed to delete emergency", "error");
    }
  };

  const EmergencyCard = ({ emergency, type, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
      ...emergency,
      anote: emergency.anote || '',
      etype: emergency.etype || '',
      pcon: emergency.pcon || ''
    });

    const handleSave = () => {
      onUpdate(type, emergency._id, editedData);
      setIsEditing(false);
    };

    return (
      <div className="emergency-card">
        <div className="emergency-header">
          <span className="emergency-type">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          <span className="emergency-status">Reported</span>
        </div>
        <div className="emergency-details">
          {isEditing ? (
            <>
              {type === 'medical' && (
                <div className="form-group">
                  <label>Patient Condition:</label>
                  <input
                    type="text"
                    value={editedData.pcon}
                    onChange={(e) => setEditedData({ ...editedData, pcon: e.target.value })}
                  />
                </div>
              )}
              <div className="form-group">
                <label>Issue Type:</label>
                <input
                  type="text"
                  value={editedData.etype}
                  onChange={(e) => setEditedData({ ...editedData, etype: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Additional Notes:</label>
                <textarea
                  value={editedData.anote}
                  onChange={(e) => setEditedData({ ...editedData, anote: e.target.value })}
                />
              </div>
            </>
          ) : (
            <>
              {type === 'medical' && (
                <p><strong>Patient Condition:</strong> {emergency.pcon}</p>
              )}
              <p><strong>Issue Type:</strong> {emergency.etype}</p>
              <p><strong>Additional Notes:</strong> {emergency.anote}</p>
              <p><strong>Date Reported:</strong> {new Date(emergency.createdAt).toLocaleDateString()}</p>
            </>
          )}
        </div>
        <div className="emergency-actions">
          {isEditing ? (
            <>
              <button className="btn btn-save" onClick={handleSave}>
                <FaSave /> Save
              </button>
              <button className="btn btn-cancel" onClick={() => setIsEditing(false)}>
                <FaTimes /> Cancel
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-edit" onClick={() => setIsEditing(true)}>
                <FaEdit /> Edit
              </button>
              <button 
                className="btn btn-delete" 
                onClick={() => onDelete(type, emergency._id)}
              >
                <FaTrashAlt /> Delete
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderEmergenciesSection = () => {
    if (error) {
      return (
        <div className="userdash-section">
          <div className="userdash-empty-state">
            <p>{error}</p>
            <Link to="/login" className="userdash-btn userdash-btn-primary">Login</Link>
          </div>
        </div>
      );
    }

    const totalEmergencies = emergencies.medical.length + emergencies.mechanical.length + emergencies.security.length;

    return (
      <div className="userdash-section">
        <h2 className="userdash-section-title">Your Emergency Reports ({totalEmergencies})</h2>
        
        {totalEmergencies === 0 ? (
          <div className="userdash-empty-state">
            <FaBell className="userdash-empty-state-icon" />
            <p>You haven't reported any emergencies yet.</p>
            <Link to="/select-emergency" className="userdash-btn userdash-btn-primary">
              Report an Emergency
            </Link>
          </div>
        ) : (
          <div className="userdash-grid">
            {emergencies.medical.length > 0 && (
              <div className="userdash-card">
                <div className="userdash-card-header">
                  <h3 className="userdash-card-title">Medical Emergencies</h3>
                  <span className="userdash-card-status active">{emergencies.medical.length}</span>
                </div>
                <div className="userdash-card-details">
                  {emergencies.medical.map((emergency) => (
                    <EmergencyCard
                      key={emergency._id}
                      emergency={emergency}
                      type="medical"
                      onUpdate={handleUpdateEmergency}
                      onDelete={handleDeleteEmergency}
                    />
                  ))}
                </div>
              </div>
            )}

            {emergencies.mechanical.length > 0 && (
              <div className="userdash-card">
                <div className="userdash-card-header">
                  <h3 className="userdash-card-title">Mechanical Issues</h3>
                  <span className="userdash-card-status active">{emergencies.mechanical.length}</span>
                </div>
                <div className="userdash-card-details">
                  {emergencies.mechanical.map((emergency) => (
                    <EmergencyCard
                      key={emergency._id}
                      emergency={emergency}
                      type="mechanical"
                      onUpdate={handleUpdateEmergency}
                      onDelete={handleDeleteEmergency}
                    />
                  ))}
                </div>
              </div>
            )}

            {emergencies.security.length > 0 && (
              <div className="userdash-card">
                <div className="userdash-card-header">
                  <h3 className="userdash-card-title">Security Issues</h3>
                  <span className="userdash-card-status active">{emergencies.security.length}</span>
                </div>
                <div className="userdash-card-details">
                  {emergencies.security.map((emergency) => (
                    <EmergencyCard
                      key={emergency._id}
                      emergency={emergency}
                      type="security"
                      onUpdate={handleUpdateEmergency}
                      onDelete={handleDeleteEmergency}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const handleUpdateReview = async (reviewId) => {
    try {
      navigate(`/updateReview/${reviewId}`);
    } catch (err) {
      console.error("Error navigating to update review:", err);
      Swal.fire("Error", "Failed to navigate to update review", "error");
    }
  };

  const renderReviewsSection = () => {
    if (error) {
      return (
        <div className="userdash-section">
          <div className="userdash-empty-state">
            <p>{error}</p>
            <Link to="/login" className="userdash-btn userdash-btn-primary">Login</Link>
          </div>
        </div>
      );
    }

    return (
      <div className="userdash-section">
        <h2 className="userdash-section-title">Your Reviews ({reviews.length})</h2>
        
        {reviews.length === 0 ? (
          <div className="userdash-empty-state">
            <FaStar className="userdash-empty-state-icon" />
            <p>You haven't submitted any reviews yet.</p>
            <Link to="/addReview" className="userdash-btn userdash-btn-primary">
              Submit a Review
            </Link>
          </div>
        ) : (
          <div className="userdash-grid">
            {reviews.map((review) => (
              <div key={review._id} className="userdash-card">
                <div className="userdash-card-header">
                  <div className="userdash-card-title">
                    <div className="review-rating">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`star ${index < review.rating ? 'filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="userdash-card-status">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="userdash-card-details">
                  <p><strong>Service:</strong> {review.RService}</p>
                  <p><strong>Thoughts:</strong> {review.RThought}</p>
                  <p><strong>Location:</strong> {review.parkingLocation}</p>
                  <p><strong>Duration:</strong> {review.parkingDuration}</p>
                  <p><strong>Vehicle Type:</strong> {review.vehicleType}</p>
                  <p><strong>Payment Method:</strong> {review.paymentMethod}</p>
                </div>
                <div className="userdash-card-actions">
                  <button 
                    className="userdash-btn userdash-btn-primary" 
                    onClick={() => handleUpdateReview(review._id)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button 
                    className="userdash-btn userdash-btn-danger" 
                    onClick={() => handleDeleteReview(review._id)}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/Review/${reviewId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      Swal.fire("Success!", "Review deleted successfully.", "success");
      fetchUserReviews(currentUser?.email);
    } catch (err) {
      console.error("Error deleting review:", err);
      Swal.fire("Error", "Failed to delete review", "error");
    }
  };

  const renderComplaintsSection = () => {
    if (error) {
      return (
        <div className="userdash-section">
          <div className="userdash-empty-state">
            <p>{error}</p>
            <Link to="/login" className="userdash-btn userdash-btn-primary">Login</Link>
          </div>
        </div>
      );
    }

    return (
      <div className="userdash-section">
        <h2 className="userdash-section-title">Your Complaints ({complaints.length})</h2>
        
        {complaints.length === 0 ? (
          <div className="userdash-empty-state">
            <FaBell className="userdash-empty-state-icon" />
            <p>You haven't submitted any complaints yet.</p>
            <Link to="/" className="userdash-btn userdash-btn-primary">
              Go to Home
            </Link>
          </div>
        ) : (
          <div className="userdash-grid">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="userdash-card">
                <div className="userdash-card-header">
                  <h3 className="userdash-card-title">Complaint #{complaint._id.slice(-4)}</h3>
                  <span className="userdash-card-status">
                    {new Date(complaint.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="userdash-card-details">
                  <p><strong>Type:</strong> {complaint.comp}</p>
                  <p><strong>Description:</strong> {complaint.describe}</p>
                  <p><strong>Solution:</strong> {complaint.solution || 'Pending'}</p>
                </div>
                <div className="userdash-card-actions">
                  <button 
                    className="userdash-btn userdash-btn-primary" 
                    onClick={() => handleUpdateComplaint(complaint._id)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button 
                    className="userdash-btn userdash-btn-danger" 
                    onClick={() => handleDeleteComplaint(complaint._id)}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleUpdateComplaint = async (complaintId) => {
    try {
      navigate(`/updateComplaint/${complaintId}`);
    } catch (err) {
      console.error("Error navigating to update complaint:", err);
      Swal.fire("Error", "Failed to navigate to update complaint", "error");
    }
  };

  const handleDeleteComplaint = async (complaintId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/complaint/${complaintId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      Swal.fire("Success!", "Complaint deleted successfully.", "success");
      fetchUserComplaints(currentUser?.email);
    } catch (err) {
      console.error("Error deleting complaint:", err);
      Swal.fire("Error", "Failed to delete complaint", "error");
    }
  };

  const renderPaymentsSection = () => {
    if (error) {
      return (
        <div className="userdash-section">
          <div className="userdash-empty-state">
            <p>{error}</p>
            <Link to="/login" className="userdash-btn userdash-btn-primary">Login</Link>
          </div>
        </div>
      );
    }

    return (
      <div className="userdash-section">
        <h2 className="userdash-section-title">Your Payment History ({payments.length})</h2>
        
        {payments.length === 0 ? (
          <div className="userdash-empty-state">
            <FaBell className="userdash-empty-state-icon" />
            <p>You haven't made any payments yet.</p>
            <Link to="/" className="userdash-btn userdash-btn-primary">
              Go to Home
            </Link>
          </div>
        ) : (
          <div className="userdash-grid">
            {payments.map((payment) => (
              <div key={payment._id} className="userdash-card">
                <div className="userdash-card-header">
                  <h3 className="userdash-card-title">Payment #{payment._id.slice(-4)}</h3>
                  <span className="userdash-card-status">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="userdash-card-details">
                  <p><strong>Amount:</strong> ${payment.amount.toFixed(2)}</p>
                  <p><strong>Card:</strong> {payment.cardnumber}</p>
                  <p><strong>Status:</strong> <span className={`status-${payment.status}`}>{payment.status}</span></p>
                  {payment.parkingDetails && (
                    <>
                      <p><strong>License Plate:</strong> {payment.parkingDetails.licensePlate}</p>
                      <p><strong>Entry Time:</strong> {new Date(payment.parkingDetails.entryTime).toLocaleString()}</p>
                      <p><strong>Exit Time:</strong> {new Date(payment.parkingDetails.exitTime).toLocaleString()}</p>
                      <p><strong>Duration:</strong> {payment.parkingDetails.duration}</p>
                      <p><strong>Rate:</strong> ${payment.parkingDetails.rate}/hour</p>
                    </>
                  )}
                </div>
                <div className="userdash-card-actions">
                  <button 
                    className="userdash-btn userdash-btn-primary" 
                    onClick={() => handleViewReceipt(payment._id)}
                  >
                    <FaEdit /> View Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleViewReceipt = async (paymentId) => {
    try {
      navigate(`/receipt/${paymentId}`);
    } catch (err) {
      console.error("Error navigating to receipt:", err);
      Swal.fire("Error", "Failed to view receipt", "error");
    }
  };

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div className={`userdash-wrapper ${sidebarActive ? 'sidebar-open' : ''}`}>
      <aside className="userdash-sidebar">
        <div className="userdash-sidebar-header">
          <div className="userdash-logo">SojournParking</div>
          <FaTimes className="userdash-close-icon" onClick={toggleSidebar} />
        </div>
        <ul className="userdash-sidebar-nav">
          <li
            className={`userdash-sidebar-item ${activeSection === "dashboard" ? "active" : ""}`}
            onClick={() => handleSectionChange("dashboard")}
          >
            <FaBars /> Dashboard
          </li>
          <li
            className={`userdash-sidebar-item ${activeSection === "reservations" ? "active" : ""}`}
            onClick={() => handleSectionChange("reservations")}
          >
            <FaCalendarAlt /> Reservations
          </li>
          <li
            className={`userdash-sidebar-item ${activeSection === "emergencies" ? "active" : ""}`}
            onClick={() => handleSectionChange("emergencies")}
          >
            <FaBell /> Emergencies
          </li>
          <li
            className={`userdash-sidebar-item ${activeSection === "reviews" ? "active" : ""}`}
            onClick={() => handleSectionChange("reviews")}
          >
            <FaStar /> Reviews
          </li>
          <li
            className={`userdash-sidebar-item ${activeSection === "complaints" ? "active" : ""}`}
            onClick={() => handleSectionChange("complaints")}
          >
            <FaBell /> Complaints
          </li>
          <li
            className={`userdash-sidebar-item ${activeSection === "payments" ? "active" : ""}`}
            onClick={() => handleSectionChange("payments")}
          >
            <FaCreditCard /> Payments
          </li>
          <li className="userdash-sidebar-item" onClick={() => navigate("/")}>
            <FaHome /> Home
          </li>
          <li className="userdash-sidebar-item userdash-logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </aside>

      <div className="userdash-main-content">
        <header className="userdash-header">
          <FaBars className="userdash-menu-icon" onClick={toggleSidebar} />
          <div className="userdash-search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="userdash-header-icons">
            <FaBell className="userdash-bell-icon" />
            <div className="userdash-profile-pic">
              <img
                src={user.profilePic || placeholderImage}
                alt="User"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholderImage;
                }}
              />
            </div>
          </div>
        </header>

        <div className="userdash-content-wrapper">
          <div className="userdash-dashboard-content">
            {activeSection === "dashboard" && (
              <div className="userdash-profile-section">
                <div className="userdash-profile-header">
                  <div className="userdash-profile-pic-container">
                    <img
                      src={user.profilePic || placeholderImage}
                      alt="User"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = placeholderImage;
                      }}
                    />
                    <div className="userdash-profile-upload">
                      <input type="file" onChange={handleProfilePhotoChange} />
                      <FaEdit />
                    </div>
                  </div>
                  <div className="userdash-profile-info">
                    <h3 className="userdash-profile-name">{user.name || "User Name"}</h3>
                    <p className="userdash-profile-email">{user.email}</p>
                    <p className="userdash-profile-joined">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="userdash-profile-details">
                  <div className="userdash-profile-detail-group">
                    <h3>Personal Information</h3>
                    <div className="userdash-profile-detail-item">
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

                    <div className="userdash-profile-detail-item">
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

                    <div className="userdash-profile-detail-item">
                      <label>Phone:</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={user.phone}
                          onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        />
                      ) : (
                        <p>{user.phone || "Not Provided"}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="userdash-profile-actions">
                  {isEditing ? (
                    <button className="userdash-btn userdash-btn-save" onClick={handleSave}>
                      <FaSave /> Save Changes
                    </button>
                  ) : (
                    <button className="userdash-btn userdash-btn-edit" onClick={() => setIsEditing(true)}>
                      <FaEdit /> Edit Profile
                    </button>
                  )}
                  <button className="userdash-btn userdash-btn-delete" onClick={handleDeleteAccount}>
                    <FaTrashAlt /> Delete Account
                  </button>
                </div>
              </div>
            )}

            {activeSection === "reservations" && (
              <div className="userdash-section">
                <h2 className="userdash-section-title">My Reservations</h2>
                {reservations.length === 0 ? (
                  <div className="userdash-empty-state">
                    <FaCalendarAlt className="userdash-empty-state-icon" />
                    <p>You have no reservations yet.</p>
                    <Link to="/chooseParking" className="userdash-btn userdash-btn-primary">
                      Make a Reservation
                    </Link>
                  </div>
                ) : (
                  <div className="userdash-grid">
                    {reservations.map((reservation) => (
                      <div key={reservation._id} className="userdash-card">
                        <div className="userdash-card-header">
                          <h3 className="userdash-card-title">Parking Spot {reservation.slotId}</h3>
                          <span className={`userdash-card-status ${reservation.isReserved ? 'active' : ''}`}>
                            {reservation.isReserved ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="userdash-card-details">
                          <p><strong>License Plate:</strong> {reservation.licensePlate}</p>
                          <p><strong>Entry Time:</strong> {formatTime(reservation.entryTime)}</p>
                          <p><strong>Exit Time:</strong> {formatTime(reservation.exitTime) || 'Not yet exited'}</p>
                        </div>
                        <div className="userdash-card-actions">
                          <Link
                            to={`/findMyLocation/${reservation._id}`}
                            className="userdash-btn userdash-btn-secondary"
                          >
                            Find My Location
                          </Link>
                          <Link
                            to={`/madeReservations/${reservation._id}`}
                            className="userdash-btn userdash-btn-secondary"
                          >
                            Update Reservation
                          </Link>
                          <button
                            className="userdash-btn userdash-btn-danger"
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
            {activeSection === "reviews" && renderReviewsSection()}
            {activeSection === "complaints" && renderComplaintsSection()}
            {activeSection === "payments" && renderPaymentsSection()}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
