import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {/* Add your dashboard content here */}
      <div className="progress-bars">
        <div className="progress-bar">
          <span className="task-name">Lorem</span>
          <div className="progress" style={{ width: '55%' }}>
            55%
          </div>
        </div>
        <div className="progress-bar">
          <span className="task-name">Ipsum</span>
          <div className="progress" style={{ width: '80%' }}>
            80%
          </div>
        </div>
        <div className="progress-bar">
          <span className="task-name">Dolor</span>
          <div className="progress" style={{ width: '65%' }}>
            65%
          </div>
        </div>
        <div className="progress-bar">
          <span className="task-name">Sit Amet</span>
          <div className="progress" style={{ width: '75%' }}>
            75%
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
