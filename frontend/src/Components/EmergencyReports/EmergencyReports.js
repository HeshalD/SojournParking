import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './EmergencyReports.css';

const EmergencyReports = () => {
    const [reports, setReports] = useState({
        medical: [],
        mechanical: [],
        security: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [dateRange, setDateRange] = useState({
        start: '',
        end: ''
    });

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Starting to fetch reports...');
            
            // Try each endpoint separately to identify which one fails
            try {
                console.log('Fetching medical reports from: http://localhost:5000/MedIssues/');
                const medResponse = await axios.get('http://localhost:5000/MedIssues/');
                console.log('Medical response status:', medResponse.status);
                console.log('Medical response data:', medResponse.data);
                if (medResponse.data && Array.isArray(medResponse.data)) {
                    console.log('Setting medical reports:', medResponse.data);
                    setReports(prev => ({ ...prev, medical: medResponse.data }));
                } else {
                    console.log('No medical data received or invalid format');
                }
            } catch (medErr) {
                console.error('Error fetching medical reports:', medErr.message);
                console.error('Error details:', medErr.response?.data);
            }

            try {
                console.log('Fetching mechanical reports from: http://localhost:5000/MecIssues/');
                const mecResponse = await axios.get('http://localhost:5000/MecIssues/');
                console.log('Mechanical response status:', mecResponse.status);
                console.log('Mechanical response data:', mecResponse.data);
                if (mecResponse.data && Array.isArray(mecResponse.data)) {
                    console.log('Setting mechanical reports:', mecResponse.data);
                    setReports(prev => ({ ...prev, mechanical: mecResponse.data }));
                } else {
                    console.log('No mechanical data received or invalid format');
                }
            } catch (mecErr) {
                console.error('Error fetching mechanical reports:', mecErr.message);
                console.error('Error details:', mecErr.response?.data);
            }

            try {
                console.log('Fetching security reports from: http://localhost:5000/SecIssues/');
                const secResponse = await axios.get('http://localhost:5000/SecIssues/');
                console.log('Security response status:', secResponse.status);
                console.log('Security response data:', secResponse.data);
                if (secResponse.data && Array.isArray(secResponse.data)) {
                    console.log('Setting security reports:', secResponse.data);
                    setReports(prev => ({ ...prev, security: secResponse.data }));
                } else {
                    console.log('No security data received or invalid format');
                }
            } catch (secErr) {
                console.error('Error fetching security reports:', secErr.message);
                console.error('Error details:', secErr.response?.data);
            }

        } catch (err) {
            console.error('Error in fetchReports:', err);
            setError(`Failed to fetch reports: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const filterReports = (reports) => {
        if (filter === 'all') return reports;
        return reports.filter(report => report.etype === filter);
    };

    const filterByDate = (reports) => {
        if (!dateRange.start || !dateRange.end) return reports;
        const start = new Date(dateRange.start);
        const end = new Date(dateRange.end);
        return reports.filter(report => {
            const reportDate = new Date(report.createdAt);
            return reportDate >= start && reportDate <= end;
        });
    };

    const exportToPDF = (data, type) => {
        const doc = new jsPDF();
        const title = `${type.charAt(0).toUpperCase() + type.slice(1)} Emergency Reports`;
        
        // Add title
        doc.setFontSize(16);
        doc.text(title, 14, 15);
        
        // Add date range if selected
        if (dateRange.start && dateRange.end) {
            doc.setFontSize(10);
            doc.text(`Date Range: ${dateRange.start} to ${dateRange.end}`, 14, 25);
        }

        // Prepare table data
        const tableData = data.map(report => {
            if (type === 'medical') {
                return [
                    report._id,
                    report.lpname,
                    report.email,
                    report.etype,
                    report.pcon,
                    report.anote,
                    new Date(report.createdAt).toLocaleDateString()
                ];
            } else {
                return [
                    report._id,
                    report.lpname,
                    report.email,
                    report.etype,
                    report.anote,
                    new Date(report.createdAt).toLocaleDateString()
                ];
            }
        });

        // Define table headers
        const headers = type === 'medical' 
            ? ['ID', 'License Plate', 'Email', 'Type', 'Condition', 'Notes', 'Date']
            : ['ID', 'License Plate', 'Email', 'Type', 'Notes', 'Date'];

        // Add table using autoTable
        autoTable(doc, {
            startY: 30,
            head: [headers],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185] },
            styles: { fontSize: 8 },
            margin: { left: 14, right: 14 }
        });

        // Save the PDF
        doc.save(`${type}_emergency_report_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    if (loading) return <div className="loading">Loading reports...</div>;
    if (error) return <div className="error">{error}</div>;

    console.log('Current reports state:', reports);

    return (
        <div className="emergency-reports">
            <h2>Emergency Reports</h2>
            
            <div className="filters">
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All Types</option>
                    <option value="medical">Medical</option>
                    <option value="mechanical">Mechanical</option>
                    <option value="security">Security</option>
                </select>
                
                <div className="date-range">
                    <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                        placeholder="Start Date"
                    />
                    <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                        placeholder="End Date"
                    />
                </div>
            </div>

            <div className="report-sections">
                {filter === 'all' || filter === 'medical' ? (
                    <div className="report-section">
                        <h3>Medical Emergencies ({reports.medical.length})</h3>
                        <button onClick={() => exportToPDF(filterByDate(reports.medical), 'medical')}>
                            Export Report
                        </button>
                        {reports.medical.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>License Plate</th>
                                        <th>Email</th>
                                        <th>Emergency Type</th>
                                        <th>Patient Condition</th>
                                        <th>Additional Notes</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterByDate(reports.medical).map(report => (
                                        <tr key={report._id}>
                                            <td>{report._id}</td>
                                            <td>{report.lpname}</td>
                                            <td>{report.email}</td>
                                            <td>{report.etype}</td>
                                            <td>{report.pcon}</td>
                                            <td>{report.anote}</td>
                                            <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="no-data">No medical emergencies found</p>
                        )}
                    </div>
                ) : null}

                {filter === 'all' || filter === 'mechanical' ? (
                    <div className="report-section">
                        <h3>Mechanical Emergencies ({reports.mechanical.length})</h3>
                        <button onClick={() => exportToPDF(filterByDate(reports.mechanical), 'mechanical')}>
                            Export Report
                        </button>
                        {reports.mechanical.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>License Plate</th>
                                        <th>Email</th>
                                        <th>Emergency Type</th>
                                        <th>Additional Notes</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterByDate(reports.mechanical).map(report => (
                                        <tr key={report._id}>
                                            <td>{report._id}</td>
                                            <td>{report.lpname}</td>
                                            <td>{report.email}</td>
                                            <td>{report.etype}</td>
                                            <td>{report.anote}</td>
                                            <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="no-data">No mechanical emergencies found</p>
                        )}
                    </div>
                ) : null}

                {filter === 'all' || filter === 'security' ? (
                    <div className="report-section">
                        <h3>Security Emergencies ({reports.security.length})</h3>
                        <button onClick={() => exportToPDF(filterByDate(reports.security), 'security')}>
                            Export Report
                        </button>
                        {reports.security.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>License Plate</th>
                                        <th>Email</th>
                                        <th>Emergency Type</th>
                                        <th>Additional Notes</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterByDate(reports.security).map(report => (
                                        <tr key={report._id}>
                                            <td>{report._id}</td>
                                            <td>{report.lpname}</td>
                                            <td>{report.email}</td>
                                            <td>{report.etype}</td>
                                            <td>{report.anote}</td>
                                            <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="no-data">No security emergencies found</p>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default EmergencyReports; 