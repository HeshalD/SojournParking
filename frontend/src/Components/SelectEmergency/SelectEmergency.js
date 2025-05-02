import React from 'react';
import { useNavigate } from "react-router";
import './SelectEmergency.css';

function SelectEmergency() {
    const navigate = useNavigate();

    return (
        <div className="emergency-page">
            <div className="emergency-page__content">
                
                <div className="emergency-page__card">
                    <h1 className="emergency-page__title">EMERGENCY ASSISTANCE</h1>
                    <div className="emergency-page__options">
                        <button 
                            className="emergency-page__button"
                            onClick={() => navigate('/medical-emergency')}
                        >
                            Medical Emergency
                        </button>
                        <button 
                            className="emergency-page__button"
                            onClick={() => navigate('/mechanical-issue')}
                        >
                            Mechanical Issue
                        </button>
                        <button 
                            className="emergency-page__button"
                            onClick={() => navigate('/security-issue')}
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