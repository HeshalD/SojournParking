import React, { useState, useEffect } from 'react';
import axios from "axios";
import DisSecIssue from '../DisSecIssue/DisSecIssue';
import './DisplaySecIssue.css';
import { Link } from 'react-router-dom';

const URL = "http://localhost:5000/secIssues";

function DisplaySecIssue() {
  const [SecIssues, setSecIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sessions/current');
        if (response.data.user) {
          setCurrentUser(response.data.user);
          fetchSecIssues(response.data.user.email);
        } else {
          setError("Please login to view your security issues");
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching user session:', err);
        setError("Please login to view your security issues");
        setLoading(false);
      }
    };

    const fetchSecIssues = async (userEmail) => {
      try {
        console.log('Fetching security issues for user:', userEmail);
        const response = await axios.get(URL);
        const userSecIssues = response.data.filter(issue => issue.email === userEmail);
        console.log('Filtered security issues:', userSecIssues);
        setSecIssues(userSecIssues);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching security issues:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) return <div className="sec-issues-loading">Loading security issues...</div>;
  if (error) return <div className="sec-issues-error">Error: {error}</div>;
  if (!SecIssues.length) return <div className="sec-issues-empty">No security issues reported by you</div>;

  return (
    <div className="sec-issues-page">
      <div className="sec-issues-container">
        <h2 className="sec-issues-header">Your Security Issues</h2>
        
        <div className="sec-issues-list">
          {SecIssues.map((SecIssue, i) => (
            <DisSecIssue key={SecIssue._id || i} SecIssue={SecIssue} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplaySecIssue;