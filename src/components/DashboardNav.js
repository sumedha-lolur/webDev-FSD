import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardNav.css';

const DashboardNav = () => (
<nav className="navbar">
        <div className="container">
          <Link to="/" className="logo">SmartBudget</Link>
          <ul className="nav-links">
            <li className="nav-item">
              <Link to="/overview">Overview</Link>
              <ul className="dropdown">
                <li><Link to="/overview#summary-section">Summary</Link></li>
                <li><Link to="/overview#recent-activity-section">Recent Activity</Link></li>
                <li><Link to="/overview#goals-section">Goals</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="#">Budget</Link>
              <ul className="dropdown">
                <li><Link to="/budget#create-section">Create Budget</Link></li>
                <li><Link to="/budget#manage-section">Manage Budget</Link></li>
                <li><Link to="/budget#reports-section">Reports</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="#">Accounts</Link>
              <ul className="dropdown">
                <li><Link to="/accounts#add-account-section">Add Account</Link></li>
                <li><Link to="/accounts#view-accounts-section">View Accounts</Link></li>
                <li><Link to="/accounts#transactions-section">Transactions</Link></li>
              </ul>
            </li>
          </ul>
        </div>
</nav>
);
export default DashboardNav;