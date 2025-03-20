import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

function UpdateMember() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/Members/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.members));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/Members/${id}`, {
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

  const [errors, setErrors] = useState({});

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
              <input
                type="text"
                placeholder="Add your slip here"
                name="Slip"
                onChange={handleChange}
                value={inputs.Slip}
              />
              <span
                className="upload-icon"
                role="button"
                onClick={() =>
                  alert("Upload functionality can be implemented here")
                }
              >
                📎
              </span>
              {errors.Slip && <p className="error">{errors.Slip}</p>}
            </div>
            <button id="submitBtn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateMember;
