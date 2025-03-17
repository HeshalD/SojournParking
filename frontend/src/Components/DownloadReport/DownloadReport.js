import React from "react";
import './DownloadReport.css'

function DownloadReport() {
  return (
    <div>
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reports Interface</title>
        <link rel="stylesheet" href="./report preveiw.css" />
        <div className="container">
          <div className="illustration">
            <img
              src="/Photos/Download report.png"
              alt="Reports illustration"
            />
          </div>
          <div className="reports-panel">
            <h1>REPORTS</h1>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Report name"
              />
            </div>
            <div className="form-group">
              <select className="form-control">
                <option value="" disabled="" selected="">
                  Select user
                </option>
                <option value="employee">employee</option>
                <option value="real-time customer">real-time customer</option>
                <option value="online customer">online customer</option>
              </select>
            </div>
            <div className="form-group">
              <select className="form-control">
                <option value="" disabled="" selected="">
                  Select type
                </option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="form-group">
              <select className="form-control">
                <option value="" disabled="" selected="">
                  Select Hours
                </option>
                <option value={1}>1 Hour</option>
                <option value={2}>2 Hours</option>
                <option value={4}>4 Hours</option>
                <option value={8}>8 Hours</option>
              </select>
            </div>
            <button className="btn-download">Download</button>
          </div>
        </div>
      </>
    </div>
  );
}

export default DownloadReport;
