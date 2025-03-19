import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router";
import { useParams } from "react-router";


function UpdateMember() {
    const [inputs,setInputs] = useState({});
    const history = useNavigate();
    const id = useParams().id;

    useEffect(() =>{
        const fetchHandler = async () =>{
            await axios
            .get(`http://Localhost:5000/Members/${id}`)
            .then((res) => res.data)
            .then((data) => setInputs(data.user));
        };
        fetchHandler();
    },[id]);

    const sendRequest = async () => {
        await axios.put(`http://Localhost:5000/Members/${id}`,{
            EmployeeID: String(inputs.EmployeeID),
            LicensePlateNo: String(inputs.LicensePlateNo),
            Slip: String(inputs.Slip),
      }).then((res) => res.data);
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
        sendRequest().then(() => history('/DisplayMembership'));
      };

  return (
    <div>
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Membership Renewal</title>
        <link rel="stylesheet" href="./membershi.css" />
        <div className="container">
          <div className="tagline">
            "Stay Parked, Stay Privileged – Renew Your Membership Today!"
          </div>
          <img
            src="/Photos/MembershipRenewal.png"
            alt="How To Use Your Car To Secure A Loan"
            className="car-image"
          />
          <div className="background-card">
            <h1 className="form-title">MEMBERSHIP RENEWAL</h1>
            <form className="form-group" onSubmit={handleSubmit}> {/* Changed div to form */}
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Employee ID"
                  id="EmployeeID"
                  name="EmployeeID"
                  onChange={handleChange}
                  value={inputs.EmployeeID}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="License plate no"
                  name="LicensePlateNo"
                  onChange={handleChange}
                  value={inputs.LicensePlateNo}
                  id="licensePlate"
                />
              </div>
              <div className="form-group upload-container">
                <input
                  type="text"
                  placeholder="Add your slip here"
                  id="slip"
                  name="Slip" // Add name attribute for state binding
                  onChange={handleChange}
                  value={inputs.Slip}
                />
                <span
                  className="upload-icon"
                  role="button" // Added role for accessibility
                  onClick={() => alert("Upload functionality can be implemented here")}
                >
                  📎
                </span>
              </div>
              <button id="submitBtn" type="submit">Submit</button> {/* Added type="submit" */}
            </form>
          </div>
        </div>
      </>
    </div>
  )
}

export default UpdateMember
