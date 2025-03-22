import React, { useState } from "react";
import "./MembershipRenewal.css";
import { useNavigate } from "react-router";
import axios from "axios";

function MembershipRenewal() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    EmployeeID: "",
    LicensePlateNo: "",
    Slip: "",
  });

  const [slip, setSlip] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

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
    }
    if (!inputs.LicensePlateNo) {
      newErrors.LicensePlateNo = "License plate number is required";
    } else if (!/^[A-Z0-9-]+$/.test(inputs.LicensePlateNo)) {
      newErrors.LicensePlateNo = "Invalid license plate format";
    }
    if (!slip) {
      newErrors.Slip = "Payment slip is required";
    }
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      // Show an alert if validation fails
      let errorMessage = "Please fix the following errors:\n";
      for (let key in newErrors) {
        errorMessage += `- ${newErrors[key]}\n`;
      }
      alert(errorMessage);
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(inputs);
      sendRequest().then(() => history("/displayMembership"));
    }
  };

  const sendRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("EmployeeID", inputs.EmployeeID);
      formData.append("LicensePlateNo", inputs.LicensePlateNo);
      formData.append("Slip", slip);
      
      await axios.post("http://localhost:5000/member", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("There was an error sending the request", error);
      alert("Error submitting the form. Please try again.");
    }
  };

  return (
    <div className="membership-renewal">
      <div className="container">
        <div className="background-card">
          <h1 className="form-title">MEMBERSHIP RENEWAL</h1>
          <form className="form-group" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Employee ID"
                name="EmployeeID"
                onChange={handleChange}
                value={inputs.EmployeeID}
              />
              {errors.EmployeeID && (
                <p className="error">{errors.EmployeeID}</p>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="License plate no"
                name="LicensePlateNo"
                onChange={handleChange}
                value={inputs.LicensePlateNo}
              />
              {errors.LicensePlateNo && (
                <p className="error">{errors.LicensePlateNo}</p>
              )}
            </div>
            <div className="form-group upload-container">
              <label htmlFor="fileInput" className="upload-label">
                <i className="fas fa-paperclip upload-icon"></i> Attach Slip
              </label>
              <input
                type="file"
                id="fileInput"
                accept="image/png, image/jpeg"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {errors.Slip && <p className="error">{errors.Slip}</p>}
            </div>

            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Slip Preview" />
              </div>
            )}

            <button id="submitBtn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MembershipRenewal;