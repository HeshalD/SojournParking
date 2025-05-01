import React, {useEffect,useState} from "react";
import axios from "axios";
import {useParams} from 'react-router'
import './UpdateMecIssue.css'
import { useNavigate } from 'react-router';

function UpdateMecIssue() {
    const [inputs, setInputs] = useState({
        lpname: "",
        email: "",
        etype: "",
        anote: "",
    });
    
    const history = useNavigate();
    const id = useParams().id;

    useEffect(() => {
        const fetchHandler = async () => {
            await axios
                .get(`http://localhost:4000/MecIssues/${id}`)
                .then((res) => res.data)
                .then((data) => setInputs(data.MecIssue));
        };
        fetchHandler();  
    }, [id]);

    const sendRequest = async () => {
        await axios
            .put(`http://localhost:4000/MecIssues/${id}`, {
                lpname: String(inputs.lpname),
                email: String(inputs.email),
                etype: String(inputs.etype),
                anote: String(inputs.anote),
            })
            .then((res) => res.data);
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(() => history('/responseM'));
    };

    return (
        <div className="update-mec-issue-container">
            <h2>Mechanical Emergency</h2>
            <form onSubmit={handleSubmit}>
                <div className="update-mec-issue-form-group">
                    <label className="update-mec-issue-form-label">License Plate Number:</label>
                    <input
                        type="text"
                        name="lpname"
                        onChange={handleChange}
                        value={inputs?.lpname || ""}
                        placeholder="Enter The License Plate Number"
                        className="update-mec-issue-form-control"
                        required
                    />
                </div>

                <div className="update-mec-issue-form-group">
                    <label className="update-mec-issue-form-label">Email:</label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={inputs?.email || ""}
                        placeholder="Enter your email"
                        className="update-mec-issue-form-control"
                        required
                    />
                </div>
  
                <div className="update-mec-issue-form-group">
                    <label className="update-mec-issue-form-label">Emergency Type</label>
                    <select
                        name="etype"
                        className="update-mec-issue-form-control update-mec-issue-select"
                        onChange={handleChange}
                        value={inputs?.etype || ""}
                        required
                    >
                        <option value="" disabled>Select emergency type</option>
                        <option value="engine">Engine Failure</option>
                        <option value="transmission">Transmission</option>
                        <option value="brakes">Brakes</option>
                        <option value="electrical">Electrical</option>
                        <option value="other">Other</option>
                    </select>
                </div>
  
                <div className="update-mec-issue-form-group">
                    <label className="update-mec-issue-form-label">Additional Notes</label>
                    <textarea
                        name="anote"
                        className="update-mec-issue-form-control update-mec-issue-textarea"
                        onChange={handleChange}
                        value={inputs?.anote || ""}
                        placeholder="Enter any additional information here..."
                        required
                    />
                </div>
                
                <button type="submit" className="update-mec-issue-btn update-mec-issue-btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default UpdateMecIssue;