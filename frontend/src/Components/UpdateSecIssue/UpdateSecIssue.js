import React, {useEffect,useState} from "react";
import axios from "axios";
import {useParams} from 'react-router'
import './UpdateSecIssue.css'
import { useNavigate } from 'react-router';

function UpdateSecIssue() {
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
                .get(`http://localhost:5000/SecIssues/${id}`)
                .then((res) => res.data)
                .then((data) => setInputs(data.SecIssue));
        };
        fetchHandler();  
    }, [id]);

    const sendRequest = async () => {
        await axios
            .put(`http://localhost:5000/SecIssues/${id}`, {
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
        sendRequest().then(() => history('/responseS'));
    };

    return (
        <div className="update-sec-issue-container">
            <h2>Security Emergency</h2>
            <form onSubmit={handleSubmit}>
                <div className="update-sec-issue-form-group">
                    <label className="update-sec-issue-form-label">License Plate Number:</label>
                    <input
                        type="text"
                        name="lpname"
                        onChange={handleChange}
                        value={inputs?.lpname || ""}
                        placeholder="Enter The License Plate Number"
                        className="update-sec-issue-form-control"
                        required
                    />
                </div>

                <div className="update-sec-issue-form-group">
                    <label className="update-sec-issue-form-label">Email:</label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={inputs?.email || ""}
                        placeholder="Enter your email"
                        className="update-sec-issue-form-control"
                        required
                    />
                </div>
  
                <div className="update-sec-issue-form-group">
                    <label className="update-sec-issue-form-label">Emergency Type</label>
                    <select
                        name="etype"
                        className="update-sec-issue-form-control update-sec-issue-select"
                        onChange={handleChange}
                        value={inputs?.etype || ""}
                        required
                    >
                        <option value="" disabled>Select emergency type</option>
                        <option value="theft">Theft</option>
                        <option value="vandalism">Vandalism</option>
                        <option value="assault">Assault</option>
                        <option value="suspicious">Suspicious Activity</option>
                        <option value="other">Other</option>
                    </select>
                </div>
  
                <div className="update-sec-issue-form-group">
                    <label className="update-sec-issue-form-label">Additional Notes</label>
                    <textarea
                        name="anote"
                        className="update-sec-issue-form-control update-sec-issue-textarea"
                        onChange={handleChange}
                        value={inputs?.anote || ""}
                        placeholder="Enter any additional information here..."
                        required
                    />
                </div>
                
                <button type="submit" className="update-sec-issue-btn update-sec-issue-btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default UpdateSecIssue;