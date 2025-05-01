import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import './ReviewTable.css';

const ReviewTable = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateFilter, setDateFilter] = useState('today');
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        fetchReviews();
    }, [dateFilter, currentDate]);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/Review');
            
            // Process and sort reviews
            const reviewsData = Array.isArray(response.data.review) 
                ? response.data.review
                    .map(review => ({
                        ...review,
                        // Ensure we have a valid date
                        sortDate: review.createdAt ? new Date(review.createdAt) : new Date(0)
                    }))
                    .sort((a, b) => b.sortDate - a.sortDate)
                : [];
            
            console.log('Fetched and sorted reviews:', reviewsData);
            setReviews(reviewsData);
            setError(null);
        } catch (err) {
            console.error('Error fetching reviews:', err);
            setError('Failed to fetch reviews. Please try again later.');
            setReviews([]);
        } finally {
            setLoading(false);
        }
    };

    const filterReviewsByDate = (reviews) => {
        if (!Array.isArray(reviews)) {
            return [];
        }

        const selectedDate = new Date(currentDate);
        selectedDate.setHours(0, 0, 0, 0);

        return reviews.filter(review => {
            if (!review || !review.createdAt) return false;
            
            const reviewDate = new Date(review.createdAt);
            if (isNaN(reviewDate.getTime())) return false;
            reviewDate.setHours(0, 0, 0, 0);

            switch (dateFilter) {
                case 'today':
                    return reviewDate.getTime() === selectedDate.getTime();
                case 'week':
                    const weekStart = new Date(selectedDate);
                    weekStart.setDate(selectedDate.getDate() - selectedDate.getDay()); // Start of the week (Sunday)
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 6); // End of the week (Saturday)
                    return reviewDate >= weekStart && reviewDate <= weekEnd;
                case 'month':
                    const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
                    const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
                    return reviewDate >= monthStart && reviewDate <= monthEnd;
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
        doc.text('Reviews Report', 14, 15);
        
        // Add date
        doc.setFontSize(10);
        doc.text(`Generated on: ${format(new Date(), 'yyyy-MM-dd HH:mm')}`, 14, 25);
        
        // Prepare table data with proper date validation
        const tableData = reviews.map(review => {
            const formattedDate = review.createdAt && !isNaN(new Date(review.createdAt).getTime())
                ? format(new Date(review.createdAt), 'yyyy-MM-dd HH:mm')
                : 'N/A';
            
            return [
                review.userName || 'N/A',
                review.rating || 'N/A',
                review.comment || 'N/A',
                formattedDate
            ];
        });
        
        // Add table using autoTable
        autoTable(doc, {
            head: [['User', 'Rating', 'Comment', 'Date']],
            body: tableData,
            startY: 35,
            theme: 'grid',
            headStyles: { fillColor: [80, 176, 135] },
            styles: { fontSize: 8 }
        });
        
        // Save the PDF
        doc.save('reviews_report.pdf');
    };

    const handleDeleteReview = async (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await axios.delete(`/api/reviews/${reviewId}`);
                fetchReviews();
            } catch (err) {
                console.error('Error deleting review:', err);
                setError('Failed to delete review');
            }
        }
    };

    if (loading) return <div className="review-container">Loading...</div>;
    if (error) return <div className="review-container">Error: {error}</div>;

    return (
        <div className="review-container">
            <h1>Reviews</h1>
            
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
                <table className="review-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="no-reviews">
                                    No reviews found
                                </td>
                            </tr>
                        ) : (
                            reviews.map(review => (
                                <tr key={review._id}>
                                    <td>{review.userName || 'N/A'}</td>
                                    <td>{review.rating || 'N/A'}/5</td>
                                    <td>{review.comment || 'N/A'}</td>
                                    <td>
                                        {review.createdAt && !isNaN(new Date(review.createdAt).getTime())
                                            ? format(new Date(review.createdAt), 'yyyy-MM-dd HH:mm')
                                            : 'N/A'}
                                    </td>
                                    <td>
                                        <button
                                            className="action-btn delete"
                                            onClick={() => handleDeleteReview(review._id)}
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

export default ReviewTable; 