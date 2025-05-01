import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

function UpdateMembership() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/member/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.members));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    const formData = new FormData();
    formData.append("EmployeeID", String(inputs.EmployeeID));
    formData.append("LicensePlateNo", String(inputs.LicensePlateNo));
    formData.append("Email", String(inputs.Email)); // Added email
    if (slip) {
      formData.append("Slip", slip);
    }
    
    await axios
      .put(`http://localhost:5000/member/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [slip, setSlip] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSlip(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!inputs.EmployeeID) {
      newErrors.EmployeeID = "Employee ID is required";
    } else if (!/^[A-Z]{3}[0-9]{3}$/.test(inputs.EmployeeID)) {
      newErrors.EmployeeID = "Employee ID must be 3 capital letters followed by 3 digits (e.g., ABC123)";
    }
    
    if (!inputs.LicensePlateNo) {
      newErrors.LicensePlateNo = "License plate number is required";
    } else if (!/^[A-Z0-9-]+$/.test(inputs.LicensePlateNo)) {
      newErrors.LicensePlateNo = "Invalid license plate format (only letters, numbers, and hyphens allowed)";
    }
    
    if (!inputs.Email) {
      newErrors.Email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.Email)) {
      newErrors.Email = "Invalid email format";
    }
    
    if (!slip && !preview && !inputs.Slip) {
      newErrors.Slip = "Payment slip is required (JPEG or PNG only)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(inputs);
      sendRequest().then(() => history("/DisplayMembership"));
    }
  };

  return (
    <div className="um-container">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Membership Renewal</title>
      <link rel="stylesheet" href="./UpdateMembership.css" />
      <div className="um-form-wrapper">
        <div className="um-form-card">
          <h1 className="um-form-title">MEMBERSHIP RENEWAL</h1>
          <form className="um-form" onSubmit={handleSubmit}>
            <div className="um-form-group">
              <input
                className="um-form-input"
                type="text"
                placeholder="Employee ID"
                name="EmployeeID"
                onChange={handleChange}
                value={inputs.EmployeeID || ""}
              />
              {errors.EmployeeID && (
                <p className="um-error-msg">{errors.EmployeeID}</p>
              )}
            </div>
            <div className="um-form-group">
              <input
                className="um-form-input"
                type="text"
                placeholder="License plate no"
                name="LicensePlateNo"
                onChange={handleChange}
                value={inputs.LicensePlateNo || ""}
              />
              {errors.LicensePlateNo && (
                <p className="um-error-msg">{errors.LicensePlateNo}</p>
              )}
            </div>
            <div className="um-form-group">
              <input
                className="um-form-input"
                type="email"
                placeholder="Email"
                name="Email"
                onChange={handleChange}
                value={inputs.Email || ""}
              />
              {errors.Email && (
                <p className="um-error-msg">{errors.Email}</p>
              )}
            </div>
            <div className="um-upload-container">
              <label htmlFor="fileInput" className="um-upload-label">
                <i className="fas fa-paperclip um-upload-icon"></i> Attach Slip
              </label>
              <input
                type="file"
                id="fileInput"
                accept="image/png, image/jpeg"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {errors.Slip && <p className="um-error-msg">{errors.Slip}</p>}
            </div>
            {preview && (
              <div className="um-image-preview">
                <img src={preview} alt="Slip Preview" />
              </div>
            )}
            {inputs.Slip && !preview && (
              <div className="um-image-preview">
                <p>Current Slip: {inputs.Slip}</p>
              </div>
            )}
            <button className="um-submit-btn" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateMembership;