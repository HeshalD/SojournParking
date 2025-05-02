import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Review.css";

function Review({ review }) {
  const navigate = useNavigate();

  // Ensure review is defined to prevent errors
  if (!review) {
    return <p>Loading review...</p>;
  }

  const { _id, rating = 0, RService = "N/V", RThought = "N/V" } = review;

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/Review/${_id}`);
      // Force a page reload to refresh the reviews list
      window.location.reload();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? 'active' : ''}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="review-container">
      <div className="review-card">
        <div className="review-header">
          <h3>Feedback Summary</h3>
          <span className="status submitted">Submitted</span>
        </div>
        
        <div className="review-content">
          <div className="rating-section">
            <div className="rating-title">Rating</div>
            <div className="stars-container">
              {renderStars(rating)}
            </div>
            <div className="rating-text">{rating} out of 5 stars</div>
          </div>

          <div className="review-details">
            <div className="detail-item">
              <span className="label">Recommendation:</span>
              <span className="value">{RService}</span>
            </div>
            <div className="detail-item">
              <span className="label">Comments:</span>
              <span className="value">{RThought}</span>
            </div>
          </div>
        </div>

        <div className="review-actions">
          <Link to={`/updateReview/${_id}`} className="action-btn edit">
            Edit
          </Link>
          <button className="action-btn delete" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Review;
