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
                        sortDate: review.date ? new Date(review.date) : new Date(0)
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
            if (!review || !review.date) return false;
            
            const reviewDate = new Date(review.date);
            if (isNaN(reviewDate.getTime())) return false;
            reviewDate.setHours(0, 0, 0, 0);

            switch (dateFilter) {
                case 'today':
                    return reviewDate.getTime() === selectedDate.getTime();
                case 'week':
                    const weekStart = new Date(selectedDate);
                    weekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 6);
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
                    newDate.setDate(currentDate.getDate() - 7);
                } else {
                    newDate.setDate(currentDate.getDate() + 7);
                }
                break;
            case 'month':
                if (direction === 'prev') {
                    newDate.setMonth(currentDate.getMonth() - 1);
                } else {
                    newDate.setMonth(currentDate.getMonth() + 1);
                }
                break;
            default:
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
        doc.text('Parking Service Reviews Report', 14, 15);
        
        // Add date
        doc.setFontSize(10);
        doc.text(`Generated on: ${format(new Date(), 'yyyy-MM-dd HH:mm')}`, 14, 25);
        
        // Prepare table data
        const tableData = reviews.map(review => {
            const formattedDate = review.date && !isNaN(new Date(review.date).getTime())
                ? format(new Date(review.date), 'yyyy-MM-dd')
                : 'N/A';
            
            return [
                review.parkingLocation || 'N/A',
                review.rating || 'N/A',
                review.vehicleType || 'N/A',
                review.parkingDuration || 'N/A',
                review.paymentMethod || 'N/A',
                review.RService || 'N/A',
                formattedDate
            ];
        });
        
        // Add table using autoTable
        autoTable(doc, {
            head: [['Location', 'Rating', 'Vehicle Type', 'Duration', 'Payment', 'Recommendation', 'Date']],
            body: tableData,
            startY: 35,
            theme: 'grid',
            headStyles: { fillColor: [80, 176, 135] },
            styles: { fontSize: 8 }
        });
        
        // Save the PDF
        doc.save('parking_reviews_report.pdf');
    };

    const handleDeleteReview = async (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await axios.delete(`http://localhost:5000/Review/${reviewId}`);
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
            <h1>Parking Service Reviews</h1>
            
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
                            <th>Location</th>
                            <th>Rating</th>
                            <th>Vehicle Type</th>
                            <th>Duration</th>
                            <th>Payment</th>
                            <th>Recommendation</th>
                            <th>Date</th>
                            <th>Comments</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="no-reviews">
                                    No reviews found
                                </td>
                            </tr>
                        ) : (
                            reviews.map(review => (
                                <tr key={review._id}>
                                    <td>{review.parkingLocation || 'N/A'}</td>
                                    <td>{review.rating || 'N/A'}/5</td>
                                    <td>{review.vehicleType || 'N/A'}</td>
                                    <td>{review.parkingDuration || 'N/A'}</td>
                                    <td>{review.paymentMethod || 'N/A'}</td>
                                    <td>{review.RService || 'N/A'}</td>
                                    <td>
                                        {review.date && !isNaN(new Date(review.date).getTime())
                                            ? format(new Date(review.date), 'yyyy-MM-dd')
                                            : 'N/A'}
                                    </td>
                                    <td>{review.RThought || 'N/A'}</td>
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