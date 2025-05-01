import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListServiceProvider.css';

function ListServiceProvider() {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Component mounted, fetching providers...');
        fetchProviders();
    }, []);

    const fetchProviders = async () => {
        try {
            console.log('Making API request to fetch providers...');
            const response = await axios.get('http://localhost:4000/ServiceProviders');
            console.log('API Response:', response.data);
            
            const providersData = Array.isArray(response.data) 
                ? response.data 
                : response.data.ServiceProviders || [];
            
            if (providersData.length > 0) {
                setProviders(providersData);
                console.log('Providers set:', providersData);
            } else {
                console.log('No providers found in response');
                setProviders([]);
            }
        } catch (err) {
            console.error('Error fetching providers:', err);
            setError('Failed to fetch service providers');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this provider?')) {
            try {
                await axios.delete(`http://localhost:4000/ServiceProviders/${id}`);
                setProviders(providers.filter(provider => provider._id !== id));
            } catch (err) {
                console.error('Error deleting provider:', err);
                alert('Failed to delete provider');
            }
        }
    };

    if (loading) {
        return (
            <div className="list-container">
                <div className="loading">Loading service providers...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="list-container">
                <div className="error">{error}</div>
            </div>
        );
    }

    return (
        <div className="list-container">
            <h2>Service Providers</h2>

            {providers.length === 0 ? (
                <div className="empty">No service providers found</div>
            ) : (
                <table className="providers-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Specialization</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {providers.map(provider => (
                            <tr key={provider._id}>
                                <td>{provider.fullname}</td>
                                <td>{provider.specialization}</td>
                                <td>
                                    <button 
                                        className="delete-btn"
                                        onClick={() => handleDelete(provider._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <button 
                className="add-btn"
                onClick={() => navigate('/addserviceprovider')}
            >
                Add New Provider
            </button>
        </div>
    );
}

export default ListServiceProvider;
