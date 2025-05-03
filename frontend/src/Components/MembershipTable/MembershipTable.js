import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';
import './MembershipTable.css';

const MembershipTable = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:5000/member', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMemberships(response.data.members);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching memberships:', err);
      setError(err.response?.data?.message || 'Failed to fetch memberships');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this membership?')) {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          setError('Authentication required');
          return;
        }

        await axios.delete(`http://localhost:5000/member/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fetchMemberships(); // Refresh the list
      } catch (err) {
        console.error('Error deleting membership:', err);
        setError(err.response?.data?.message || 'Failed to delete membership');
      }
    }
  };

  if (loading) {
    return (
      <div className="membership-loading">
        <FaSpinner className="spinner" />
        <p>Loading memberships...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="membership-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="membership-container">
      <h1>Memberships</h1>
      {memberships.length === 0 ? (
        <div className="no-memberships">
          <p>No memberships found</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="membership-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>License Plate</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {memberships.map((membership) => (
                <tr key={membership._id}>
                  <td>{membership.EmployeeID}</td>
                  <td>{membership.LicensePlateNo}</td>
                  <td>{membership.Email}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn edit"
                        onClick={() => {/* TODO: Implement edit functionality */}}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={() => handleDelete(membership._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MembershipTable; 