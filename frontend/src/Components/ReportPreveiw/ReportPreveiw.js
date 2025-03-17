import React from "react";
import './ReportPreveiw.css'

function ReportPreveiw() {
  return (
    <div>
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Analytics Dashboard</title>
        <link rel="stylesheet" href="./report genaration.css" />
        <div className="container">
          {/* Header with Sort Dropdown */}
          <div className="header">
            <div className="dropdown-container">
              <span
                className="dropdown-label"
                option=""
                value=""
                disabled=""
                selected=""
              >
                Sort by
              </span>
              <select className="sort-dropdown" id="sortDropdown">
                <option value="annual">Annual</option>
                <option value="monthly">Monthly</option>
                <option value="daily">Daily</option>
              </select>
              <span className="dropdown-arrow">▼</span>
            </div>
          </div>
          {/* Users Section */}
          <h2 className="section-title">Users</h2>
          <div className="card-row">
            <div className="chart-card">
              <svg width="100%" height={180} viewBox="0 0 180 180">
                <circle
                  cx={90}
                  cy={90}
                  r={80}
                  fill="transparent"
                  stroke="#eee"
                  strokeWidth={1}
                />
                {/* Pie Chart Segments */}
                <path
                  d="M90,90 L90,10 A80,80 0 0,1 159.3,120 L90,90"
                  fill="#c0eac0"
                />
                <path
                  d="M90,90 L159.3,120 A80,80 0 0,1 20.7,120 L90,90"
                  fill="#81c281"
                />
                <path
                  d="M90,90 L20.7,120 A80,80 0 0,1 90,10 L90,90"
                  fill="#008000"
                />
              </svg>
            </div>
            <div className="info-card">
              <div className="info-item">Employees</div>
              <div className="info-item">Real time users</div>
              <div className="info-item">Online users</div>
            </div>
          </div>
          {/* Hours Section */}
          <h2 className="section-title">Hours</h2>
          <div className="chart-full">
            <div className="hours-chart">
              {/* Y-axis */}
              <div className="y-axis">
                <div className="y-label">40</div>
                <div className="y-label">20</div>
                <div className="y-label">0</div>
              </div>
              {/* Horizontal grid lines */}
              <div className="horizontal-line" style={{ top: 0 }} />
              <div className="horizontal-line" style={{ top: "50%" }} />
              <div className="horizontal-line" style={{ bottom: 20 }} />
              {/* Bars for AM */}
              <div className="bar" style={{ height: "8%", left: "2.1%" }} />
              <div className="bar" style={{ height: "15%", left: "6.0%" }} />
              <div className="bar" style={{ height: "5%", left: "9.8%" }} />
              <div className="bar" style={{ height: "6%", left: "13.7%" }} />
              <div className="bar" style={{ height: "5%", left: "17.5%" }} />
              <div className="bar" style={{ height: "12%", left: "21.4%" }} />
              <div className="bar" style={{ height: "20%", left: "25.2%" }} />
              <div className="bar" style={{ height: "25%", left: "29.1%" }} />
              <div className="bar" style={{ height: "30%", left: "32.9%" }} />
              <div className="bar" style={{ height: "28%", left: "36.8%" }} />
              <div className="bar" style={{ height: "35%", left: "40.6%" }} />
              <div className="bar" style={{ height: "40%", left: "44.5%" }} />
              {/* Bars for PM */}
              <div className="bar" style={{ height: "45%", left: "48.3%" }} />
              <div className="bar" style={{ height: "50%", left: "52.2%" }} />
              <div className="bar" style={{ height: "60%", left: "56.0%" }} />
              <div className="bar" style={{ height: "55%", left: "59.9%" }} />
              <div className="bar" style={{ height: "62%", left: "63.7%" }} />
              <div className="bar" style={{ height: "58%", left: "67.6%" }} />
              <div className="bar" style={{ height: "48%", left: "71.4%" }} />
              <div className="bar" style={{ height: "40%", left: "75.3%" }} />
              <div className="bar" style={{ height: "30%", left: "79.1%" }} />
              <div className="bar" style={{ height: "28%", left: "83.0%" }} />
              <div className="bar" style={{ height: "20%", left: "86.8%" }} />
              <div className="bar" style={{ height: "25%", left: "90.7%" }} />
              {/* X-axis */}
              <div className="x-axis">
                <div className="x-label">0</div>
                <div className="x-label">1</div>
                <div className="x-label">2</div>
                <div className="x-label">3</div>
                <div className="x-label">4</div>
                <div className="x-label">5</div>
                <div className="x-label">6</div>
                <div className="x-label">7</div>
                <div className="x-label">8</div>
                <div className="x-label">9</div>
                <div className="x-label">10</div>
                <div className="x-label">11</div>
                <div className="x-label">12</div>
                <div className="x-label" style={{ fontWeight: "bold" }}>
                  AM
                </div>
                <div className="x-label">1</div>
                <div className="x-label">2</div>
                <div className="x-label">3</div>
                <div className="x-label">4</div>
                <div className="x-label">5</div>
                <div className="x-label">6</div>
                <div className="x-label">7</div>
                <div className="x-label">8</div>
                <div className="x-label">9</div>
                <div className="x-label">10</div>
                <div className="x-label">11</div>
                <div className="x-label">12</div>
                <div className="x-label" style={{ fontWeight: "bold" }}>
                  PM
                </div>
              </div>
            </div>
          </div>
          {/* Profit/Loss Section */}
          <h2 className="section-title">Profit/loss</h2>
          <div className="card-row">
            <div className="chart-card">
              <div style={{ width: "100%" }}>
                <svg viewBox="0 0 200 100" width="100%" height={80}>
                  {/* Profit area (left side) */}
                  <path
                    d="M0,80 L10,78 L20,75 L30,72 L40,68 L50,62 L60,55 L70,50 L80,40 L90,30 L100,20 L100,80 Z"
                    fill="#3EB48955"
                  />
                  <polyline
                    points="0,80 10,78 20,75 30,72 40,68 50,62 60,55 70,50 80,40 90,30 100,20"
                    fill="none"
                    stroke="#3EB489"
                    strokeWidth={1}
                  />
                  {/* Loss area (right side) */}
                  <path
                    d="M100,20 L110,30 L120,40 L130,50 L140,60 L150,65 L160,70 L170,75 L180,78 L190,80 L200,80 L200,80 L100,80 Z"
                    fill="#FF634755"
                  />
                  <polyline
                    points="100,20 110,30 120,40 130,50 140,60 150,65 160,70 170,75 180,78 190,80 200,80"
                    fill="none"
                    stroke="#FF6347"
                    strokeWidth={1}
                  />
                </svg>
                <div className="profit-legend">
                  <div className="legend-item">
                    <div className="legend-color profit-color">Profit</div>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color loss-color">Loss</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="info-card">
              <div className="info-item">
                Expected income
                <div className="info-value">$1000</div>
              </div>
              <div className="info-item">
                Total income
                <div className="info-value">$1000</div>
              </div>
              <div className="info-item">
                Net Profit
                <div className="info-value">$1000</div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default ReportPreveiw;
