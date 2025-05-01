import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import './DisplayMecIssue.css';

const URL = "http://localhost:4000/mecIssues";

function DisplayMecIssue() {
  const [MecIssues, setMecIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        console.log('API Response:', response.data);
        setMecIssues(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching mechanical issues:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/mecIssues/${id}`);
      // Update the state to remove the deleted issue
      setMecIssues(MecIssues.filter(issue => issue._id !== id));
    } catch (err) {
      console.error("Error deleting mechanical issue:", err);
      setError("Failed to delete mechanical issue");
    }
  };

  if (loading) return <div className="mec-issues-loading">Loading...</div>;
  if (error) return <div className="mec-issues-error">Error: {error}</div>;
  if (!MecIssues.length) return <div className="mec-issues-empty">No mechanical issues found</div>;

  return (
    <div className="mec-issues-page">
      <div className="mec-issues-container">
        <h2 className="mec-issues-header">Mechanical Issues</h2>
        
        <div className="mec-issues-list">
          {MecIssues.map((MecIssue, i) => (
            <div key={MecIssue._id || i} className="mec-issue-card">
              <div className="mec-issue-card__content">
                <div className="mec-issue-card__field">
                  <span className="mec-issue-card__label">ID:</span>
                  <span className="mec-issue-card__value">{MecIssue._id}</span>
                </div>
                <div className="mec-issue-card__field">
                  <span className="mec-issue-card__label">License Plate:</span>
                  <span className="mec-issue-card__value">{MecIssue.lpname}</span>
                </div>
                <div className="mec-issue-card__field">
                  <span className="mec-issue-card__label">Email:</span>
                  <span className="mec-issue-card__value">{MecIssue.email}</span>
                </div>
                <div className="mec-issue-card__field">
                  <span className="mec-issue-card__label">Emergency Type:</span>
                  <span className="mec-issue-card__value">{MecIssue.etype}</span>
                </div>
                <div className="mec-issue-card__field">
                  <span className="mec-issue-card__label">Additional Notes:</span>
                  <span className="mec-issue-card__value">{MecIssue.anote}</span>
                </div>
              </div>
              <div className="mec-issue-card__actions">
                <Link
                  to={`/updatemecissue/${MecIssue._id}`}
                  className="mec-issue-card__button mec-issue-card__button--update"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(MecIssue._id)}
                  className="mec-issue-card__button mec-issue-card__button--delete"
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

export default DisplayMecIssue;