import "bootstrap/dist/css/bootstrap.min.css";
import "./UserDashboard.css";

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">🚗 Parking</div>
        <ul className="nav flex-column">
          <li className="nav-item active">📊 Dashboard</li>
          <li className="nav-item">📂 Accounts</li>
          <li className="nav-item">📱 Mobile</li>
          <li className="nav-item">💳 Payments</li>
          <li className="nav-item">📢 Complaints</li>
          <li className="nav-item">🛠 Support</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h2>Finance Dashboard</h2>
          <div className="user-info d-flex align-items-center">
            <img src="/assets/user.png" alt="User Avatar" className="user-avatar me-2" />
            <span>Hello, Alex</span>
          </div>
        </header>

        {/* Profile Card */}
        <div className="profile-card">
          <img src="/assets/user.png" alt="User" className="profile-pic" />
          <h4>Alex Johnson</h4>
          <p>alex.johnson@example.com</p>
          <p>+1 999-888-7777</p>
          <button className="save-btn w-100 mt-3">Update Profile</button>
        </div>

        {/* Account & Billing Cards */}
        <div className="dashboard-cards row">
          <div className="card col-md-5">
            <h5>My xPay Accounts</h5>
            <p>Active: 8643 5600 8256 4256</p>
            <button className="btn btn-danger w-100">Block Account</button>
          </div>
          <div className="card col-md-5">
            <h5>My Bills</h5>
            <p>Phone Bill: <span className="badge paid">Paid</span></p>
            <p>Internet Bill: <span className="badge paid">Paid</span></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
