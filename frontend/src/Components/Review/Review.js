import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Review({ review }) {
  const navigate = useNavigate();

  // Ensure review is defined to prevent errors
  if (!review) {
    return <p>Loading review...</p>;
  }

  const { _id, RService = "N/V", RThought = "N/V" } = review;

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/Review/${_id}`);
      navigate("/DisplayReview");
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Feedback Display</title>
      <link rel="stylesheet" href="../DisplayReview.css" />

      <div className="sidebar-feedback">
        <div className="sidebar-feedback-header">
          <div className="sidebar-header-content">
            <h3>Feedback Summary</h3>
            <span className="sidebar-status submitted">Submitted</span>
          </div>
        </div>
        <div className="sidebar-feedback-details">
          <div className="sidebar-detail-item">
            <span className="label">Recommendation: {RService}</span>
            <span className="value" id="recommendValue">Yes</span>
            <select id="recommendEdit" className="edit-field" style={{ display: "none" }}>
              <option value="Yes">Yes: {RThought}</option>
              <option value="No">No: {RThought}</option>
              <option value="Maybe">Maybe: {RThought}</option>
            </select>
          </div>
          <div className="sidebar-detail-item">
            <span className="label">Comments:</span>
            <span className="value" id="commentsValue">Great service! Keep it up.</span>
            <textarea id="commentsEdit" className="edit-field" style={{ display: "none" }} />
          </div>
        </div>
        <div className="sidebar-feedback-actions">
          <Link to={`/updateReview/${_id}`}>Edit</Link>
          <button className="sidebar-btn sidebar-btn-primary" id="saveBtn" style={{ display: "none" }}>
            Save
          </button>
          <button className="sidebar-btn sidebar-btn-danger" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Review;
