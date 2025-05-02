import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function DisSecIssue({ SecIssue = {} }) {
    const { _id = "N/A", lpname = "N/A", email = "N/A", etype = "N/A", anote = "N/A" } = SecIssue;
    const navigate = useNavigate();

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this security issue?")) {
            try {
                await axios.delete(`http://localhost:5000/secIssues/${id}`);
                navigate(0); // Refresh the page
            } catch (err) {
                console.error("Error deleting security issue:", err);
                alert("Failed to delete security issue");
            }
        }
    };

    return (
        <div className="sec-issue-card">
            <div className="sec-issue-card__content">
                <div className="sec-issue-card__field">
                    <span className="sec-issue-card__label">ID:</span>
                    <span className="sec-issue-card__value">{_id}</span>
                </div>
                <div className="sec-issue-card__field">
                    <span className="sec-issue-card__label">License Plate:</span>
                    <span className="sec-issue-card__value">{lpname}</span>
                </div>
                <div className="sec-issue-card__field">
                    <span className="sec-issue-card__label">Email:</span>
                    <span className="sec-issue-card__value">{email}</span>
                </div>
                <div className="sec-issue-card__field">
                    <span className="sec-issue-card__label">Emergency Type:</span>
                    <span className="sec-issue-card__value">{etype}</span>
                </div>
                <div className="sec-issue-card__field">
                    <span className="sec-issue-card__label">Additional Notes:</span>
                    <span className="sec-issue-card__value">{anote}</span>
                </div>
            </div>
            <div className="sec-issue-card__actions">
                <Link 
                    to={`/updatesecissue/${_id}`} 
                    className="sec-issue-card__button sec-issue-card__button--update"
                >
                    Update
                </Link>
                <button 
                    onClick={() => deleteHandler(_id)} 
                    className="sec-issue-card__button sec-issue-card__button--delete"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default DisSecIssue;