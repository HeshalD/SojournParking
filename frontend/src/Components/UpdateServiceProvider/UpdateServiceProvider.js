import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateServiceProvider.css';

function UpdateServiceProvider() {
    const [inputs, setInputs] = useState({
        fullname: "",
        contactnumber: "",
        specialization: "",
        location: "",
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                console.log("Fetching service provider with ID:", id);
                const response = await axios.get(`http://localhost:5000/ServiceProviders/${id}`);
                console.log("Response data:", response.data);
                
                if (response.data && response.data.serviceProviders) {
                    const providerData = response.data.serviceProviders;
                    console.log("Setting provider data:", providerData);
                    setInputs({
                        fullname: providerData.fullname || "",
                        contactnumber: providerData.contactnumber || "",
                        specialization: providerData.specialization || "",
                        location: providerData.location || "",
                    });
                }
            } catch (error) {
                console.error("Error fetching service provider:", error);
            }
        };
        fetchHandler();
    }, [id]);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Updating service provider with data:", inputs);
            await axios.put(`http://localhost:5000/ServiceProviders/${id}`, {
                fullname: inputs.fullname,
                contactnumber: inputs.contactnumber,
                specialization: inputs.specialization,
                location: inputs.location,
            });
            navigate('/addserviceproviderresponse');
        } catch (error) {
            console.error("Error updating service provider:", error);
        }
    };

    return (
        <div className="update-provider-container">
            <div className="container">
                <div className="header">Update Service Provider</div>
                <form onSubmit={handleSubmit} id="addForm">
                    <div className="form-group">
                        <label htmlFor="name">Full Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="fullname"
                            onChange={handleChange}
                            value={inputs.fullname}
                            placeholder="Enter full name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">Contact Number:</label>
                        <input
                            type="text"
                            id="contact"
                            name="contactnumber"
                            onChange={handleChange}
                            value={inputs.contactnumber}
                            placeholder="Enter contact number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="specialization">Specialization:</label>
                        <input
                            type="text"
                            id="specialization"
                            name="specialization"
                            onChange={handleChange}
                            value={inputs.specialization}
                            placeholder="E.g., Engine Repair, First Aid"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            onChange={handleChange}
                            value={inputs.location}
                            placeholder="Enter location"
                            required
                        />
                    </div>
                    <button type="submit" className="btn">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateServiceProvider;