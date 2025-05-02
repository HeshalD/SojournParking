import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DisplayMedIssue.css';

function DisplayMedIssue() {
  const [medIssues, setMedIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedIssues = async () => {
      try {
        console.log('Fetching medical issues...');
        const response = await axios.get('http://localhost:5000/MedIssues');
        console.log('API Response:', response.data);
        setMedIssues(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching medical issues:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMedIssues();
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
  if (!medIssues || medIssues.length === 0) return <div className="med-issues-empty">No medical issues found</div>;

  return (
    <div className="med-issues-page">
      <div className="med-issues-container">
        <h2 className="med-issues-header">Medical Issues</h2>
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
