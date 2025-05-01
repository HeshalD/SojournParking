import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    format, 
    startOfWeek, 
    endOfWeek, 
    startOfMonth, 
    endOfMonth, 
    isSameDay,
    eachDayOfInterval 
  } from 'date-fns';
  import { jsPDF } from 'jspdf';
  import autoTable from 'jspdf-autotable';
import './ReservationTable.css';
import 'jspdf-autotable'; 

const ReservationTable = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCurrent, setShowCurrent] = useState(true);
    const [dateFilter, setDateFilter] = useState('all'); // 'all', 'day', 'week', 'month'
    const [selectedDate, setSelectedDate] = useState(new Date());
    

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://Localhost:5000/slots');
                setReservations(response.data.slots);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchReservations();
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

    const filterByDateRange = (reservations) => {
        const now = new Date();
        const today = new Date(now.setHours(0, 0, 0, 0));

        switch (dateFilter) {
            case 'day':
                return reservations.filter(res => {
                    const resDate = new Date(res.entryTime);
                    return (
                        resDate.getDate() === selectedDate.getDate() &&
                        resDate.getMonth() === selectedDate.getMonth() &&
                        resDate.getFullYear() === selectedDate.getFullYear()
                    );
                });
            case 'week':
                const weekStart = new Date(selectedDate);
                weekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);

                return reservations.filter(res => {
                    const resDate = new Date(res.entryTime);
                    return resDate >= weekStart && resDate <= weekEnd;
                });
            case 'month':
                return reservations.filter(res => {
                    const resDate = new Date(res.entryTime);
                    return (
                        resDate.getMonth() === selectedDate.getMonth() &&
                        resDate.getFullYear() === selectedDate.getFullYear()
                    );
                });
            default:
                return reservations;
        }
    };

    const filteredReservations = filterByDateRange(
        showCurrent
            ? reservations.filter(res => res.isReserved)
            : reservations.filter(res => !res.isReserved)
    );

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
    }

    const generatePDFReport = () => {
        // Initialize jsPDF instance
        const doc = new jsPDF();
        
        // Get filtered data
        const filteredData = filterByDateRange(
          showCurrent
            ? reservations.filter(res => res.isReserved)
            : reservations.filter(res => !res.isReserved)
        );
    
        if (filteredData.length === 0) {
          alert('No data to export for the selected filters');
          return;
        }
    
        // Report title based on filters
        let title = `${showCurrent ? 'Current' : 'Ended'} Reservations - `;
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
    
        // Add title to PDF
        doc.setFontSize(18);
        doc.text(title, 14, 20);
    
        // Add filter information
        doc.setFontSize(10);
        doc.text(`Generated on: ${format(new Date(), 'MMMM d, yyyy h:mm a')}`, 14, 30);
    
        // Prepare data for the table
        const tableData = filteredData.map(res => [
          res.userName,
          res.email,
          res.licensePlate,
          format(new Date(res.entryTime), 'MMM d, yyyy'),
          format(new Date(res.entryTime), 'h:mm a'),
          res.exitTime ? format(new Date(res.exitTime), 'h:mm a') : 'N/A',
          res.isReserved ? 'Active' : 'Completed'
        ]);
    
        // Add table to PDF using autoTable directly
        autoTable(doc, {
          startY: 40,
          head: [['Name', 'Email', 'License Plate', 'Date', 'Entry', 'Exit', 'Status']],
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
          columnStyles: {
            0: { cellWidth: 20 },
            1: { cellWidth: 'auto' }
          },
          margin: { top: 40 }
        });
    
        // Add summary statistics
        const summaryY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(12);
        doc.text(`Total Reservations: ${filteredData.length}`, 14, summaryY);
    
        if (dateFilter === 'week') {
          doc.text(
            `Week Dates: ${format(startOfWeek(selectedDate), 'MMM d')} - ${format(endOfWeek(selectedDate), 'MMM d, yyyy')}`,
            14, 
            summaryY + 10
          );
        }
    
        // Save the PDF
        doc.save(`Reservation_Report_${format(new Date(), 'yyyyMMdd_HHmmss')}.pdf`);
      };
    

    function getWeekStartDate(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
        return new Date(d.setDate(diff));
    }

    function getWeekEndDate(date) {
        const start = getWeekStartDate(date);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return end;
    }

    if (loading) return <div>Loading reservations...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="reservation-container">
            <h1>Reservation Management</h1>

            <div className="report-actions">
                <button className="report-btn" onClick={generatePDFReport}>
                    Download PDF Report
                </button>
            </div>

            <div className="controls-container">
                <div className="toggle-container">
                    <button
                        className={`toggle-btn ${showCurrent ? 'active' : ''}`}
                        onClick={() => setShowCurrent(true)}
                    >
                        Current Reservations
                    </button>
                    <button
                        className={`toggle-btn ${!showCurrent ? 'active' : ''}`}
                        onClick={() => setShowCurrent(false)}
                    >
                        Ended Reservations
                    </button>
                </div>

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
                                {dateFilter === 'week' && `Week of ${getWeekStartDate(selectedDate).toLocaleDateString()}`}
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
                <table className="reservation-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>License Plate</th>
                            <th>Date</th>
                            <th>Entry Time</th>
                            <th>Exit Time</th>
                            {showCurrent && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReservations.length > 0 ? (
                            filteredReservations.map((reservation, index) => (
                                <tr key={reservation._id}>
                                    <td>{index + 1}</td>
                                    <td>{reservation.userName}</td>
                                    <td>{reservation.email}</td>
                                    <td>{reservation.licensePlate}</td>
                                    <td>{formatDate(reservation.entryTime)}</td>
                                    <td>{formatTime(reservation.entryTime)}</td>
                                    <td>{reservation.exitTime ? formatTime(reservation.exitTime) : 'N/A'}</td>
                                    {showCurrent && (
                                        <td>
                                            <button
                                                className="end-btn"
                                                onClick={async () => {
                                                    try {
                                                        await axios.put(`/api/slots/endstay/${reservation.licensePlate}`, {
                                                            exitTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                        });
                                                        // Refresh the list
                                                        const response = await axios.get('/api/slots');
                                                        setReservations(response.data.slots);
                                                    } catch (err) {
                                                        console.error('Error ending stay:', err);
                                                    }
                                                }}
                                            >
                                                End Stay
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={showCurrent ? 8 : 7} className="no-reservations">
                                    No {showCurrent ? 'current' : 'ended'} reservations found
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

// Helper function to get week start date
function getWeekStartDate(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    return new Date(d.setDate(diff));
}

export default ReservationTable;