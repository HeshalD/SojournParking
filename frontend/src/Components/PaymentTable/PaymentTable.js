import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns/format';
import { startOfWeek } from 'date-fns/startOfWeek';
import { endOfWeek } from 'date-fns/endOfWeek';
import { startOfMonth } from 'date-fns/startOfMonth';
import { endOfMonth } from 'date-fns/endOfMonth';
import { isSameDay } from 'date-fns/isSameDay';
import { eachDayOfInterval } from 'date-fns/eachDayOfInterval';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import './PaymentTable.css';
import 'jspdf-autotable';

const PaymentTable = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateFilter, setDateFilter] = useState('all');
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                // Fetch payments from the correct endpoint
                const response = await axios.get('http://localhost:5000/api/payments');
                
                // Check if response.data exists and has the expected structure
                if (!response.data || !response.data.success || !Array.isArray(response.data.data)) {
                    console.error('Invalid response format:', response.data);
                    setError('Invalid data format received from server');
                    setLoading(false);
                    return;
                }

                // Format the payments data
                const formattedPayments = response.data.data.map(payment => ({
                    _id: payment._id,
                    type: 'Parking',
                    amount: payment.totalAmount || 0,
                    status: payment.status || 'completed',
                    date: payment.date || new Date(),
                    licensePlate: payment.licensePlate || 'N/A',
                    entryTime: payment.entryTime || 'N/A',
                    exitTime: payment.exitTime || 'N/A',
                    duration: payment.durationHours ? `${payment.durationHours.toFixed(2)} hours` : 'N/A'
                }));

                // Sort by date (newest first)
                formattedPayments.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                setPayments(formattedPayments);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching payments:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const formatTime = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const filterByDateRange = (payments) => {
        if (dateFilter === 'all') return payments;

        const now = new Date();
        const today = new Date(now.setHours(0, 0, 0, 0));

        switch (dateFilter) {
            case 'day':
                return payments.filter(payment => {
                    const paymentDate = new Date(payment.date);
                    return isSameDay(paymentDate, selectedDate);
                });
            case 'week':
                const weekStart = startOfWeek(selectedDate);
                const weekEnd = endOfWeek(selectedDate);
                return payments.filter(payment => {
                    const paymentDate = new Date(payment.date);
                    return paymentDate >= weekStart && paymentDate <= weekEnd;
                });
            case 'month':
                const monthStart = startOfMonth(selectedDate);
                const monthEnd = endOfMonth(selectedDate);
                return payments.filter(payment => {
                    const paymentDate = new Date(payment.date);
                    return paymentDate >= monthStart && paymentDate <= monthEnd;
                });
            default:
                return payments;
        }
    };

    const filteredPayments = filterByDateRange(payments);

    const handleDateChange = (increment) => {
        const newDate = new Date(selectedDate);
        switch (dateFilter) {
            case 'day':
                newDate.setDate(newDate.getDate() + increment);
                break;
            case 'week':
                newDate.setDate(newDate.getDate() + (increment * 7));
                break;
            case 'month':
                newDate.setMonth(newDate.getMonth() + increment);
                break;
            default:
                break;
        }
        setSelectedDate(newDate);
    };

    const generatePDFReport = () => {
        const doc = new jsPDF();
        
        const filteredData = filterByDateRange(payments);
    
        if (filteredData.length === 0) {
            alert('No data to export for the selected filters');
            return;
        }
    
        let title = 'Payment Report - ';
        switch (dateFilter) {
            case 'day':
                title += format(selectedDate, 'MMMM d, yyyy');
                break;
            case 'week':
                title += `Week of ${format(startOfWeek(selectedDate), 'MMMM d, yyyy')}`;
                break;
            case 'month':
                title += format(selectedDate, 'MMMM yyyy');
                break;
            default:
                title += 'All Time';
        }
    
        doc.setFontSize(18);
        doc.text(title, 14, 20);
    
        doc.setFontSize(10);
        doc.text(`Generated on: ${format(new Date(), 'MMMM d, yyyy h:mm a')}`, 14, 30);
    
        const tableData = filteredData.map(payment => [
            payment.type,
            payment.licensePlate,
            format(new Date(payment.date), 'MMM d, yyyy'),
            format(new Date(payment.entryTime), 'h:mm a'),
            payment.exitTime ? format(new Date(payment.exitTime), 'h:mm a') : 'N/A',
            payment.duration,
            `$${payment.amount.toFixed(2)}`,
            payment.status
        ]);
    
        autoTable(doc, {
            startY: 40,
            head: [['Type', 'License Plate', 'Date', 'Entry Time', 'Exit Time', 'Duration', 'Amount', 'Status']],
            body: tableData,
            theme: 'grid',
            headStyles: {
                fillColor: [76, 175, 80],
                textColor: 255
            },
            styles: {
                fontSize: 10,
                cellPadding: 3,
                halign: 'center'
            },
            margin: { top: 40 }
        });
    
        const summaryY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(12);
        doc.text(`Total Payments: ${filteredData.length}`, 14, summaryY);
        doc.text(`Total Amount: $${filteredData.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)}`, 14, summaryY + 10);
    
        doc.save(`Payment_Report_${format(new Date(), 'yyyyMMdd_HHmmss')}.pdf`);
    };

    if (loading) return <div className="loading">Loading payments...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="payment-container">
            <h1>Payment Management</h1>

            <div className="report-actions">
                <button className="report-btn" onClick={generatePDFReport}>
                    Download PDF Report
                </button>
            </div>

            <div className="controls-container">
                <div className="date-filter-container">
                    <div className="date-filter-buttons">
                        <button
                            className={`date-filter-btn ${dateFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setDateFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={`date-filter-btn ${dateFilter === 'day' ? 'active' : ''}`}
                            onClick={() => setDateFilter('day')}
                        >
                            Day
                        </button>
                        <button
                            className={`date-filter-btn ${dateFilter === 'week' ? 'active' : ''}`}
                            onClick={() => setDateFilter('week')}
                        >
                            Week
                        </button>
                        <button
                            className={`date-filter-btn ${dateFilter === 'month' ? 'active' : ''}`}
                            onClick={() => setDateFilter('month')}
                        >
                            Month
                        </button>
                    </div>

                    {dateFilter !== 'all' && (
                        <div className="date-navigation">
                            <button
                                className="date-nav-btn"
                                onClick={() => handleDateChange(-1)}
                            >
                                &lt;
                            </button>
                            <span className="current-date">
                                {dateFilter === 'day' && selectedDate.toLocaleDateString()}
                                {dateFilter === 'week' && `Week of ${format(startOfWeek(selectedDate), 'MMMM d, yyyy')}`}
                                {dateFilter === 'month' && selectedDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                            </span>
                            <button
                                className="date-nav-btn"
                                onClick={() => handleDateChange(1)}
                            >
                                &gt;
                            </button>
                            <button
                                className="date-nav-btn today-btn"
                                onClick={() => setSelectedDate(new Date())}
                            >
                                Today
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="table-container">
                <table className="payment-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>License Plate</th>
                            <th>Date</th>
                            <th>Entry Time</th>
                            <th>Exit Time</th>
                            <th>Duration</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.length > 0 ? (
                            filteredPayments.map((payment) => (
                                <tr key={payment._id}>
                                    <td>{payment.type}</td>
                                    <td>{payment.licensePlate}</td>
                                    <td>{formatDate(payment.date)}</td>
                                    <td>{formatTime(payment.entryTime)}</td>
                                    <td>{payment.exitTime ? formatTime(payment.exitTime) : 'N/A'}</td>
                                    <td>{payment.duration}</td>
                                    <td>${payment.amount.toFixed(2)}</td>
                                    <td>
                                        <span className={`status-badge ${payment.status.toLowerCase()}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="no-payments">
                                    No payments found
                                    {dateFilter !== 'all' && ` for this ${dateFilter}`}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentTable;
