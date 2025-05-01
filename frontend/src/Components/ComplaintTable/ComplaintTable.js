import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './ComplaintTable.css';

const ComplaintTable = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateFilter, setDateFilter] = useState('today');
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        fetchComplaints();
    }, [dateFilter, currentDate]);

    const fetchComplaints = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/complaint');
            // Sort complaints by date in descending order (newest first)
            const complaintsData = Array.isArray(response.data) 
                ? response.data.sort((a, b) => new Date(b.date) - new Date(a.date))
                : [];
            console.log('Fetched and sorted complaints:', complaintsData);
            
            setComplaints(complaintsData);
            setError(null);
        } catch (err) {
            console.error('Error fetching complaints:', err);
            setError('Failed to fetch complaints. Please try again later.');
            setComplaints([]);
        } finally {
            setLoading(false);
        }
    };

    const filterComplaintsByDate = (complaints) => {
        if (!Array.isArray(complaints)) {
            return [];
        }

        const selectedDate = new Date(currentDate);
        selectedDate.setHours(0, 0, 0, 0);

        return complaints.filter(complaint => {
            if (!complaint || !complaint.date) return false;
            
            const complaintDate = new Date(complaint.date);
            complaintDate.setHours(0, 0, 0, 0);

            switch (dateFilter) {
                case 'today':
                    return complaintDate.getTime() === selectedDate.getTime();
                case 'week':
                    const weekStart = new Date(selectedDate);
                    weekStart.setDate(selectedDate.getDate() - selectedDate.getDay()); // Start of the week (Sunday)
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 6); // End of the week (Saturday)
                    return complaintDate >= weekStart && complaintDate <= weekEnd;
                case 'month':
                    const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
                    const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
                    return complaintDate >= monthStart && complaintDate <= monthEnd;
                case 'all':
                    return true;
                default:
                    return true;
            }
        });
    };

    const handleDateFilterChange = (filter) => {
        setDateFilter(filter);
    };

    const handleDateNavigation = (direction) => {
        const newDate = new Date(currentDate);
        
        switch (dateFilter) {
            case 'week':
                if (direction === 'prev') {
                    newDate.setDate(currentDate.getDate() - 7); // Skip back one week
                } else {
                    newDate.setDate(currentDate.getDate() + 7); // Skip forward one week
                }
                break;
            case 'month':
                if (direction === 'prev') {
                    newDate.setMonth(currentDate.getMonth() - 1); // Skip back one month
                } else {
                    newDate.setMonth(currentDate.getMonth() + 1); // Skip forward one month
                }
                break;
            default: // For 'today' and 'all'
                if (direction === 'prev') {
                    newDate.setDate(currentDate.getDate() - 1);
                } else {
                    newDate.setDate(currentDate.getDate() + 1);
                }
        }
        
        setCurrentDate(newDate);
    };

    const generatePDFReport = () => {
        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(16);
        doc.text('Complaints Report', 14, 15);
        
        // Add date
        doc.setFontSize(10);
        doc.text(`Generated on: ${format(new Date(), 'yyyy-MM-dd HH:mm')}`, 14, 25);
        
        // Prepare table data
        const tableData = complaints.map(complaint => [
            complaint.email || 'N/A',
            complaint.comp || 'N/A',
            complaint.describe || 'N/A',
            complaint.solution || 'N/A',
            format(new Date(complaint.date), 'yyyy-MM-dd HH:mm')
        ]);
        
        // Add table using autoTable
        autoTable(doc, {
            head: [['Email', 'Issue', 'Description', 'Solution', 'Date']],
            body: tableData,
            startY: 35,
            theme: 'grid',
            headStyles: { fillColor: [80, 176, 135] },
            styles: { fontSize: 8 }
        });
        
        // Save the PDF
        doc.save('complaints_report.pdf');
    };

    const handleDeleteComplaint = async (complaintId) => {
        if (window.confirm('Are you sure you want to delete this complaint?')) {
            try {
                await axios.delete(`http://localhost:5000/complaint/${complaintId}`);
                fetchComplaints();
            } catch (err) {
                console.error('Error deleting complaint:', err);
                setError('Failed to delete complaint');
            }
        }
    };

    if (loading) return <div className="complaint-container">Loading...</div>;
    if (error) return <div className="complaint-container">Error: {error}</div>;

    const filteredComplaints = filterComplaintsByDate(complaints);

    return (
        <div className="complaint-container">
            <h1>Complaints</h1>
            
            <div className="controls-container">
                <div className="date-filter-buttons">
                    <button
                        className={`date-filter-btn ${dateFilter === 'today' ? 'active' : ''}`}
                        onClick={() => handleDateFilterChange('today')}
                    >
                        Today
                    </button>
                    <button
                        className={`date-filter-btn ${dateFilter === 'week' ? 'active' : ''}`}
                        onClick={() => handleDateFilterChange('week')}
                    >
                        This Week
                    </button>
                    <button
                        className={`date-filter-btn ${dateFilter === 'month' ? 'active' : ''}`}
                        onClick={() => handleDateFilterChange('month')}
                    >
                        This Month
                    </button>
                    <button
                        className={`date-filter-btn ${dateFilter === 'all' ? 'active' : ''}`}
                        onClick={() => handleDateFilterChange('all')}
                    >
                        All Time
                    </button>
                </div>

                <div className="date-navigation">
                    <button
                        className="date-nav-btn"
                        onClick={() => handleDateNavigation('prev')}
                    >
                        Previous
                    </button>
                    <div className="current-date">
                        {format(currentDate, 'MMMM d, yyyy')}
                    </div>
                    <button
                        className="date-nav-btn"
                        onClick={() => handleDateNavigation('next')}
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className="report-actions">
                <button className="report-btn" onClick={generatePDFReport}>
                    Download PDF Report
                </button>
            </div>

            <div className="table-container">
                <table className="complaint-table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Issue</th>
                            <th>Description</th>
                            <th>Solution</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredComplaints.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="no-complaints">
                                    No complaints found
                                </td>
                            </tr>
                        ) : (
                            filteredComplaints.map(complaint => (
                                <tr key={complaint._id}>
                                    <td>{complaint.email || 'N/A'}</td>
                                    <td>{complaint.comp || 'N/A'}</td>
                                    <td>{complaint.describe || 'N/A'}</td>
                                    <td>{complaint.solution || 'N/A'}</td>
                                    <td>{format(new Date(complaint.date), 'yyyy-MM-dd HH:mm')}</td>
                                    <td>
                                        <button
                                            className="action-btn delete"
                                            onClick={() => handleDeleteComplaint(complaint._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComplaintTable; 