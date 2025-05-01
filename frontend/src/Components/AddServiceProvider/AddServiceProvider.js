import React, { useState } from 'react';
import './AddServiceProvider.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function AddServiceProvider() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        fullname: "",
        contactnumber: "",
        specialization: "",
        location: "",
    });

    const [errors, setErrors] = useState({
        contactnumber: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "contactnumber") {
            const phoneRegex = /^[0-9]{10}$/; // Accepts exactly 10 digits
            if (!phoneRegex.test(value)) {
                setErrors((prev) => ({
                    ...prev,
                    contactnumber: "Phone number must be exactly 10 digits.",
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    contactnumber: "",
                }));
            }
        }

        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errors.contactnumber) return;

        try {
            await axios.post("http://localhost:4000/ServiceProviders", {
                fullname: String(inputs.fullname),
                contactnumber: Number(inputs.contactnumber),
                specialization: String(inputs.specialization),
                location: String(inputs.location),
            });
            navigate('/ListServiceProvider');
        } catch (error) {
            console.error('Error adding service provider:', error);
        }
    };

    return (
        <div className="add-service-provider-container">
            <div className="add-service-provider-header">Add a New Service Provider</div>
            <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="add-service-provider-form-group">
                    <label className="add-service-provider-label">Full Name:</label>
                    <input
                        type="text"
                        name="fullname"
                        onChange={handleChange}
                        value={inputs.fullname}
                        placeholder="Enter full name"
                        className="add-service-provider-input"
                        required
                    />
                </div>

                {/* Contact Number */}
                <div className="add-service-provider-form-group">
                    <label className="add-service-provider-label">Contact Number:</label>
                    <input
                        type="text"
                        name="contactnumber"
                        onChange={handleChange}
                        value={inputs.contactnumber}
                        placeholder="Enter 10-digit number"
                        className="add-service-provider-input"
                        required
                    />
                    {errors.contactnumber && (
                        <p className="add-service-provider-error">{errors.contactnumber}</p>
                    )}
                </div>

                {/* Specialization */}
                <div className="add-service-provider-form-group">
                    <label className="add-service-provider-label">Specialization:</label>
                    <input
                        type="text"
                        name="specialization"
                        onChange={handleChange}
                        value={inputs.specialization}
                        placeholder="E.g., Engine Repair, First Aid"
                        className="add-service-provider-input"
                        required
                    />
                </div>

                {/* Location */}
                <div className="add-service-provider-form-group">
                    <label className="add-service-provider-label">Location:</label>
                    <input
                        type="text"
                        name="location"
                        onChange={handleChange}
                        value={inputs.location}
                        placeholder="Enter location"
                        className="add-service-provider-input"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="add-service-provider-btn"
                    disabled={Boolean(errors.contactnumber)}
                >
                    Add to System
                </button>
            </form>
        </div>
    );
}

export default AddServiceProvider;
