// Provider.js
import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Provider({ serviceProvider = {} }) {
    const { _id = "N/A", fullname = "N/A", contactnumber = "N/A", 
            specialization = "N/A", location = "N/A" } = serviceProvider;
    const history = useNavigate();

    const deleteHandler = async () => {
        if (window.confirm("Are you sure you want to delete this service provider?")) {
            await axios.delete(`http://localhost:5000/ServiceProviders/${_id}`)
                .then(() => history("/ServiceProviderProfile"))
                .catch(err => console.error("Delete error:", err));
        }
    };

    return (
        <div className="service-provider-profile-card">
            <h3 className="service-provider-profile-name">{fullname}</h3>
            
            <div className="service-provider-profile-info">
                <div className="service-provider-profile-field">
                    <span className="service-provider-profile-label">ID:</span>
                    <span className="service-provider-profile-value">{_id}</span>
                </div>
                <div className="service-provider-profile-field">
                    <span className="service-provider-profile-label">Specialization:</span>
                    <span className="service-provider-profile-value">{specialization}</span>
                </div>
                <div className="service-provider-profile-field">
                    <span className="service-provider-profile-label">Location:</span>
                    <span className="service-provider-profile-value">{location}</span>
                </div>
                <div className="service-provider-profile-field">
                    <span className="service-provider-profile-label">Contact:</span>
                    <span className="service-provider-profile-value">{contactnumber}</span>
                </div>
            </div>

            <div className="service-provider-profile-actions">
                <Link
                    to={`/UpdateServiceProvider/${_id}`}
                    className="service-provider-profile-btn service-provider-profile-btn--update"
                >
                    Update
                </Link>
                <button
                    onClick={deleteHandler}
                    className="service-provider-profile-btn service-provider-profile-btn--delete"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Provider;