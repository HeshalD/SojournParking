import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DisplayMedIssue.css';

function DisplayMedIssue() {
  const [medIssues, setMedIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sessions/current');
        if (response.data.user) {
          setCurrentUser(response.data.user);
          fetchMedIssues(response.data.user.email);
        } else {
          setError("Please login to view your medical issues");
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching user session:', err);
        setError("Please login to view your medical issues");
        setLoading(false);
      }
    };

    const fetchMedIssues = async (userEmail) => {
      try {
        console.log('Fetching medical issues for user:', userEmail);
        const response = await axios.get('http://localhost:5000/MedIssues');
        console.log('All medical issues from API:', response.data);
        
        // Normalize email comparison
        const normalizedUserEmail = userEmail.toLowerCase().trim();
        const userMedIssues = response.data.filter(issue => {
          const normalizedIssueEmail = issue.email?.toLowerCase().trim();
          console.log('Comparing emails:', {
            userEmail: normalizedUserEmail,
            issueEmail: normalizedIssueEmail,
            match: normalizedIssueEmail === normalizedUserEmail
          });
          return normalizedIssueEmail === normalizedUserEmail;
        });
        
        console.log('Filtered medical issues:', userMedIssues);
        setMedIssues(userMedIssues);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching medical issues:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/MedIssues/${id}`);
      setMedIssues(medIssues.filter(issue => issue._id !== id));
    } catch (err) {
      console.error('Error deleting medical issue:', err);
      setError('Failed to delete medical issue');
    }
  };

  if (loading) return <div className="med-issues-loading">Loading medical issues...</div>;
  if (error) return <div className="med-issues-error">Error: {error}</div>;
  if (!medIssues || medIssues.length === 0) return <div className="med-issues-empty">No medical issues reported by you</div>;

  return (
    <div className="med-issues-page">
      <div className="med-issues-container">
        <h2 className="med-issues-header">Your Medical Issues</h2>
        <div className="med-issues-list">
          {medIssues.map((issue) => (
            <div key={issue._id} className="med-issue-card">
              <div className="med-issue-card__content">
                <div className="med-issue-card__field">
                  <span className="med-issue-card__label">License Plate:</span>
                  <span className="med-issue-card__value">{issue.lpname}</span>
                </div>
                <div className="med-issue-card__field">
                  <span className="med-issue-card__label">Email:</span>
                  <span className="med-issue-card__value">{issue.email}</span>
                </div>
                <div className="med-issue-card__field">
                  <span className="med-issue-card__label">Patient Condition:</span>
                  <span className="med-issue-card__value">{issue.pcon}</span>
                </div>
                <div className="med-issue-card__field">
                  <span className="med-issue-card__label">Additional Notes:</span>
                  <span className="med-issue-card__value">{issue.anote}</span>
                </div>
              </div>
              <div className="med-issue-card__actions">
                <Link
                  to={`/updatemedissue/${issue._id}`}
                  className="med-issue-card__button med-issue-card__button--update"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(issue._id)}
                  className="med-issue-card__button med-issue-card__button--delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayMedIssue;
