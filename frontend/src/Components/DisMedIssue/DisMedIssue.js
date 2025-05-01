// DisMedIssue.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function DisMedIssue({ MedIssue = {} }) {
    const { _id = "N/A", lpname = "N/A", etype = "N/A", pcon = "N/A", anote = "N/A" } = MedIssue;
    const navigate = useNavigate();

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this medical issue?")) {
            try {
                await axios.delete(`http://localhost:4000/medIssues/${id}`);
                navigate(0); // Refresh the page
            } catch (err) {
                console.error("Error deleting medical issue:", err);
                alert("Failed to delete medical issue");
            }
        }
    };

    return (
        <div className="med-issue-card">
            <div className="med-issue-card__content">
                <div className="med-issue-card__field">
                    <span className="med-issue-card__label">ID:</span>
                    <span className="med-issue-card__value">{_id}</span>
                </div>
                <div className="med-issue-card__field">
                    <span className="med-issue-card__label">License Plate:</span>
                    <span className="med-issue-card__value">{lpname}</span>
                </div>
                <div className="med-issue-card__field">
                    <span className="med-issue-card__label">Emergency Type:</span>
                    <span className="med-issue-card__value">{etype}</span>
                </div>
                <div className="med-issue-card__field">
                    <span className="med-issue-card__label">Patient Condition:</span>
                    <span className="med-issue-card__value">{pcon}</span>
                </div>
                <div className="med-issue-card__field">
                    <span className="med-issue-card__label">Additional Notes:</span>
                    <span className="med-issue-card__value">{anote}</span>
                </div>
            </div>
            <div className="med-issue-card__actions">
                <Link 
                    to={`/updatemedissue/${_id}`} 
                    className="med-issue-card__button med-issue-card__button--update"
                >
                    Update
                </Link>
                <button 
                    onClick={() => deleteHandler(_id)} 
                    className="med-issue-card__button med-issue-card__button--delete"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default DisMedIssue;