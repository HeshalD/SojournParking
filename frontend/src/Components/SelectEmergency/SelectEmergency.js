import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import './SelectEmergency.css';

function SelectEmergency() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const fetchCurrentUser = async () => {
        try {
            console.log("SelectEmergency: Fetching current user session...");
            const response = await axios.get('http://localhost:5000/sessions/current');
            console.log("SelectEmergency: Session response:", response.data);
            if (response.data.user) {
                console.log("SelectEmergency: Setting current user:", response.data.user);
                setCurrentUser(response.data.user);
            } else {
                console.log("SelectEmergency: No user session found");
                setError("Please login to access emergency services.");
            }
        } catch (err) {
            console.error("SelectEmergency: Error fetching user session:", err);
            setError("Please login to access emergency services.");
        }
    };

    // Add console log for currentUser state changes
    useEffect(() => {
        console.log("SelectEmergency: Current user state updated:", currentUser);
    }, [currentUser]);

    const handleNavigation = (path) => {
        if (!currentUser) {
            setError("Please login to access emergency services.");
            return;
        }
        navigate(path, { state: { email: currentUser.email } });
    };

    return (
        <div className="emergency-page">
            <div className="emergency-page__content">
                <div className="emergency-page__card">
                    <h1 className="emergency-page__title">EMERGENCY ASSISTANCE</h1>
                    {error && (
                        <div className="error-message">
                            <p>{error}</p>
                            <button onClick={() => navigate('/login')} className="login-btn">
                                Login
                            </button>
                        </div>
                    )}
                    <div className="emergency-page__options">
                        <button 
                            className="emergency-page__button"
                            onClick={() => handleNavigation('/medical-emergency')}
                        >
                            Medical Emergency
                        </button>
                        <button 
                            className="emergency-page__button"
                            onClick={() => handleNavigation('/mechanical-issue')}
                        >
                            Mechanical Issue
                        </button>
                        <button 
                            className="emergency-page__button"
                            onClick={() => handleNavigation('/security-issue')}
                        >
                            Security Concern
                        </button>
                    </div>
                    <button className="emergency-page__button emergency-page__button--primary">
                        Live Agent Support
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SelectEmergency;