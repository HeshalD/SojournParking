import React, {useEffect,useState} from "react";
import axios from "axios";
import {useParams} from 'react-router'
import './UpdateMedIssue.css'
import { useNavigate } from 'react-router';

function UpdateMedIssue() {
    const [inputs, setInputs] = useState({
        lpname: "",
        email: "",
        etype: "",
        pcon: "",
        anote: "",
    });
    
    const history = useNavigate();
    const id = useParams().id;

    useEffect(() => {
        const fetchHandler = async () => {
            await axios
                .get(`http://localhost:5000/MedIssues/${id}`)
                .then((res) => res.data)
                .then((data) => setInputs(data.MedIssue));
        };
        fetchHandler();  
    }, [id]);

    const sendRequest = async () => {
        await axios
            .put(`http://localhost:5000/MedIssues/${id}`, {
                lpname: String(inputs.lpname),
                email: String(inputs.email),
                etype: String(inputs.etype),
                pcon: String(inputs.pcon),
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
        sendRequest().then(() => history('/response'));
    };

    return (
        <div className="update-med-issue-container">
            <h2>Medical Emergency</h2>
            <form onSubmit={handleSubmit}>
                <div className="update-med-issue-form-group">
                    <label className="update-med-issue-form-label">License Plate Number:</label>
                    <input
                        type="text"
                        name="lpname"
                        onChange={handleChange}
                        value={inputs?.lpname || ""}
                        placeholder="Enter The License Plate Number"
                        className="update-med-issue-form-control"
                        required
                    />
                </div>

                <div className="update-med-issue-form-group">
                    <label className="update-med-issue-form-label">Email:</label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={inputs?.email || ""}
                        placeholder="Enter your email"
                        className="update-med-issue-form-control"
                        required
                    />
                </div>
      
                <div className="update-med-issue-form-group">
                    <label className="update-med-issue-form-label">Emergency Type</label>
                    <select
                        name="etype"
                        className="update-med-issue-form-control update-med-issue-select"
                        onChange={handleChange}
                        value={inputs?.etype || ""}
                        required
                    >
                        <option value="" disabled>Select emergency type</option>
                        <option value="cardiac">Cardiac</option>
                        <option value="respiratory">Respiratory</option>
                        <option value="trauma">Trauma</option>
                        <option value="neurological">Neurological</option>
                        <option value="other">Other</option>
                    </select>
                </div>
      
                <div className="update-med-issue-form-group">
                    <label className="update-med-issue-form-label">Patient's Condition</label>
                    <select
                        name="pcon"
                        className="update-med-issue-form-control update-med-issue-select"
                        onChange={handleChange}
                        value={inputs?.pcon || ""}
                        required
                    >
                        <option value="" disabled>Select condition</option>
                        <option value="critical">Critical</option>
                        <option value="unstable">Unstable</option>
                        <option value="stable">Stable</option>
                        <option value="improving">Improving</option>
                        <option value="deteriorating">Deteriorating</option>
                    </select>
                </div>
      
                <div className="update-med-issue-form-group">
                    <label className="update-med-issue-form-label">Additional Notes</label>
                    <textarea
                        name="anote"
                        className="update-med-issue-form-control update-med-issue-textarea"
                        onChange={handleChange}
                        value={inputs?.anote || ""}
                        placeholder="Enter any additional information here..."
                        required
                    />
                </div>
                
                <button type="submit" className="update-med-issue-btn update-med-issue-btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default UpdateMedIssue;