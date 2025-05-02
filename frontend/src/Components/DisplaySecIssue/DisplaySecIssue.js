import React, { useState, useEffect } from 'react';
import axios from "axios";
import DisSecIssue from '../DisSecIssue/DisSecIssue';
import './DisplaySecIssue.css';
import { Link } from 'react-router-dom';

const URL = "http://localhost:5000/secIssues";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function DisplaySecIssue() {
  const [SecIssues, setSecIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHandler()
      .then((data) => {
        setSecIssues(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching security issues:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="sec-issues-loading">Loading...</div>;
  if (error) return <div className="sec-issues-error">Error: {error}</div>;
  if (!SecIssues.length) return <div className="sec-issues-empty">No security issues found</div>;

  return (
    <div className="sec-issues-page">
      <div className="sec-issues-container">
        <h2 className="sec-issues-header">Security Issues</h2>
        
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