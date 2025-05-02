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
    await axios
      .put(`http://localhost:5000/member/${id}`, {
        EmployeeID: String(inputs.EmployeeID),
        LicensePlateNo: String(inputs.LicensePlateNo),
        Slip: String(inputs.Slip),
      })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Correct the typo here
    console.log(inputs);
    sendRequest().then(() => history("/DisplayMembership"));
  };

  const [slip, setSlip] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSlip(file);
      setPreview(URL.createObjectURL(file)); // Show image preview
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
    if (!inputs.Slip) {
      newErrors.Slip = "Payment slip is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Membership Renewal</title>
      <link rel="stylesheet" href="./membership.css" />
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

export default UpdateMembership;
