import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import TaskIcon from '@mui/icons-material/Assignment';
import PlanningIcon from '@mui/icons-material/CalendarToday';
import GlobalIcon from '@mui/icons-material/Language';
import AnalyticsIcon from '@mui/icons-material/Assessment';
import FinanceIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = ({ showNames, toggleNames }) => {
  return (
    <div className={`sidebar ${!showNames ? 'hide-names' : ''}`}>
      <nav>
        <div className="sidebar-title">
          <button className="toggle-button" onClick={toggleNames}>
            ☰
          </button>
          {showNames && <h2>Task Manager</h2>}
        </div>
        <ul>
          <li>
            <Link to="/dashboard">
              <DashboardIcon className="sidebar-icon" />
              {showNames && 'Dashboard'}
            </Link>
          </li>
          <li>
            <Link to="/message">
              <MessageIcon className="sidebar-icon" />
              {showNames && 'Message'}
            </Link>
          </li>
          <li>
            <Link to="/tasks">
              <TaskIcon className="sidebar-icon" />
              {showNames && 'Tasks'}
            </Link>
          </li>
          <li>
            <Link to="/planning">
              <PlanningIcon className="sidebar-icon" />
              {showNames && 'Planning'}
            </Link>
          </li>
          <li>
            <Link to="/global">
              <GlobalIcon className="sidebar-icon" />
              {showNames && 'Global'}
            </Link>
          </li>
          <li>
            <Link to="/analytics">
              <AnalyticsIcon className="sidebar-icon" />
              {showNames && 'Analytics'}
            </Link>
          </li>
          <li>
            <Link to="/finance">
              <FinanceIcon className="sidebar-icon" />
              {showNames && 'Finance'}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="user-icon">
        <PersonIcon className="img" />
      </div>
    </div>
  );
};

export default Sidebar;
