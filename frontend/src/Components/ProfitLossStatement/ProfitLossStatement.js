import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfitLossStatement.css';

const ProfitLossStatement = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeRange, setTimeRange] = useState('month');
    const hourlyRate = 3; // $3 per hour

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/payments');
                
                if (!response.data || !response.data.success || !Array.isArray(response.data.data)) {
                    throw new Error('Invalid data format received from server');
                }

                setPayments(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching payment data:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [timeRange]);

    const processChartData = () => {
        const now = new Date();
        let filteredPayments = payments;

        // Filter payments based on time range
        switch (timeRange) {
            case 'day':
                filteredPayments = payments.filter(payment => {
                    const paymentDate = new Date(payment.date);
                    return paymentDate.toDateString() === now.toDateString();
                });
                break;
            case 'week':
                const weekStart = new Date(now);
                weekStart.setDate(now.getDate() - now.getDay());
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                filteredPayments = payments.filter(payment => {
                    const paymentDate = new Date(payment.date);
                    return paymentDate >= weekStart && paymentDate <= weekEnd;
                });
                break;
            case 'month':
                const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                filteredPayments = payments.filter(payment => {
                    const paymentDate = new Date(payment.date);
                    return paymentDate >= monthStart && paymentDate <= monthEnd;
                });
                break;
            default:
                break;
        }

        // Group payments by date
        const groupedPayments = filteredPayments.reduce((acc, payment) => {
            const date = new Date(payment.date).toLocaleDateString();
            if (!acc[date]) {
                acc[date] = {
                    expected: 0,
                    actual: 0
                };
            }
            acc[date].expected += (payment.durationHours || 0) * hourlyRate;
            acc[date].actual += payment.totalAmount || 0;
            return acc;
        }, {});

        // Sort dates and prepare chart data
        const sortedDates = Object.keys(groupedPayments).sort((a, b) => new Date(a) - new Date(b));
        
        return {
            dates: sortedDates,
            expected: sortedDates.map(date => groupedPayments[date].expected),
            actual: sortedDates.map(date => groupedPayments[date].actual)
        };
    };

    const calculateProfitLoss = () => {
        const chartData = processChartData();
        const totalExpected = chartData.expected.reduce((sum, val) => sum + val, 0);
        const totalActual = chartData.actual.reduce((sum, val) => sum + val, 0);
        const profitLoss = totalActual - totalExpected;

        // Count actual number of transactions
        const transactionCount = payments.filter(payment => {
            const paymentDate = new Date(payment.date);
            const now = new Date();
            
            switch (timeRange) {
                case 'day':
                    return paymentDate.toDateString() === now.toDateString();
                case 'week':
                    const weekStart = new Date(now);
                    weekStart.setDate(now.getDate() - now.getDay());
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 6);
                    return paymentDate >= weekStart && paymentDate <= weekEnd;
                case 'month':
                    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                    return paymentDate >= monthStart && paymentDate <= monthEnd;
                default:
                    return true;
            }
        }).length;

        return {
            totalExpected,
            totalActual,
            profitLoss,
            count: transactionCount
        };
    };

    if (loading) return <div className="loading">Loading data...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    const chartData = processChartData();
    const { totalExpected, totalActual, profitLoss, count } = calculateProfitLoss();

    // Calculate max value for scaling
    const maxValue = Math.max(
        ...chartData.expected,
        ...chartData.actual
    );

    return (
        <div className="profit-loss-container">
            <h1>Profit & Loss Statement</h1>
            
            <div className="controls">
                <div className="time-range-buttons">
                    <button
                        className={`time-range-btn ${timeRange === 'day' ? 'active' : ''}`}
                        onClick={() => setTimeRange('day')}
                    >
                        Today
                    </button>
                    <button
                        className={`time-range-btn ${timeRange === 'week' ? 'active' : ''}`}
                        onClick={() => setTimeRange('week')}
                    >
                        This Week
                    </button>
                    <button
                        className={`time-range-btn ${timeRange === 'month' ? 'active' : ''}`}
                        onClick={() => setTimeRange('month')}
                    >
                        This Month
                    </button>
                </div>
            </div>

            <div className="chart-container">
                <div className="chart-title">Revenue Comparison</div>
                <div className="line-chart">
                    <div className="y-axis">
                        <div className="y-axis-label">${maxValue.toFixed(2)}</div>
                        <div className="y-axis-label">${(maxValue * 0.75).toFixed(2)}</div>
                        <div className="y-axis-label">${(maxValue * 0.5).toFixed(2)}</div>
                        <div className="y-axis-label">${(maxValue * 0.25).toFixed(2)}</div>
                        <div className="y-axis-label">$0.00</div>
                    </div>
                    <div className="chart-content">
                        <div className="grid-lines">
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                        </div>
                        <div className="data-lines">
                            <div className="line expected">
                                {chartData.expected.map((value, index) => (
                                    <div 
                                        key={index} 
                                        className="data-point"
                                        style={{ 
                                            left: `${(index / (chartData.dates.length - 1)) * 100}%`,
                                            bottom: `${(value / maxValue) * 100}%`
                                        }}
                                    >
                                        <div className="point-label">${value.toFixed(2)}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="line actual">
                                {chartData.actual.map((value, index) => (
                                    <div 
                                        key={index} 
                                        className="data-point"
                                        style={{ 
                                            left: `${(index / (chartData.dates.length - 1)) * 100}%`,
                                            bottom: `${(value / maxValue) * 100}%`
                                        }}
                                    >
                                        <div className="point-label">${value.toFixed(2)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="x-axis">
                            {chartData.dates.map((date, index) => (
                                <div 
                                    key={index} 
                                    className="x-axis-label"
                                    style={{ left: `${(index / (chartData.dates.length - 1)) * 100}%` }}
                                >
                                    {date}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="summary-container">
                <div className="summary-card">
                    <h3>Total Expected Revenue</h3>
                    <p>${totalExpected.toFixed(2)}</p>
                    <p className="subtext">Based on {count} transactions</p>
                </div>
                <div className="summary-card">
                    <h3>Total Actual Revenue</h3>
                    <p>${totalActual.toFixed(2)}</p>
                    <p className="subtext">Based on {count} transactions</p>
                </div>
                <div className="summary-card">
                    <h3>Profit/Loss</h3>
                    <p className={profitLoss >= 0 ? 'profit' : 'loss'}>
                        ${Math.abs(profitLoss).toFixed(2)}
                        {profitLoss >= 0 ? ' Profit' : ' Loss'}
                    </p>
                    <p className="subtext">
                        {profitLoss >= 0 ? 'Above' : 'Below'} expected by {Math.abs((profitLoss / totalExpected) * 100).toFixed(1)}%
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfitLossStatement;
