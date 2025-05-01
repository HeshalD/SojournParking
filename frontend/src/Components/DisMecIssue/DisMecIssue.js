import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


function DisMecIssue({ MecIssue = {} }) {
    const { _id = "N/A", lpname = "N/A", etype = "N/A", anote = "N/A" } = MecIssue;
    const navigate = useNavigate();

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this mechanical issue?")) {
            try {
                await axios.delete(`http://localhost:4000/mecIssues/${id}`);
                navigate(0); // Refresh the page
            } catch (err) {
                console.error("Error deleting mechanical issue:", err);
                alert("Failed to delete mechanical issue");
            }
        }
    };

    return (
        <div className="mec-issue-card">
            <div className="mec-issue-card__content">
                <div className="mec-issue-card__field">
                    <span className="mec-issue-card__label">ID:</span>
                    <span className="mec-issue-card__value">{_id}</span>
                </div>
                <div className="mec-issue-card__field">
                    <span className="mec-issue-card__label">License Plate:</span>
                    <span className="mec-issue-card__value">{lpname}</span>
                </div>
                <div className="mec-issue-card__field">
                    <span className="mec-issue-card__label">Emergency Type:</span>
                    <span className="mec-issue-card__value">{etype}</span>
                </div>
                <div className="mec-issue-card__field">
                    <span className="mec-issue-card__label">Additional Notes:</span>
                    <span className="mec-issue-card__value">{anote}</span>
                </div>
            </div>
            <div className="mec-issue-card__actions">
                <Link 
                    to={`/updatemecissue/${_id}`} 
                    className="mec-issue-card__button mec-issue-card__button--update"
                >
                    Update
                </Link>
                <button 
                    onClick={() => deleteHandler(_id)} 
                    className="mec-issue-card__button mec-issue-card__button--delete"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default DisMecIssue;