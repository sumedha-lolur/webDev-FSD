import React, { useState, useEffect } from 'react';
import DashboardNav from '../components/DashboardNav';
import './DashboardPage.css';
import data from '../data.json';

const DashboardPage = () => {
  const [userData, setUserData] = useState(data);
  
  // Calculate total balance across all accounts
  const totalBalance = userData.accounts.reduce((sum, account) => sum + account.balance, 0);
  
  // Calculate total budgeted and spent amounts
  const totalBudgeted = userData.budgets.reduce((sum, budget) => sum + budget.budgeted, 0);
  const totalSpent = userData.budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const remainingBudget = totalBudgeted - totalSpent;
  
  // Get recent transactions (most recent 5)
  const recentTransactions = [...userData.transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Calculate spending by category for the chart
  const spendingByCategory = userData.budgets.map(budget => ({
    category: budget.category,
    percentage: Math.round((budget.spent / totalSpent) * 100)
  }));

  return (
    <div className="dashboard-container">
      <DashboardNav />
      {/* <div className="dashboard-header-container"> */}
      {/* <div className="dashboard-main"> */}
        <div className="dashboard-header">
          <h1 className="welcome-message">Welcome back, {userData.user.name}!</h1>
        </div>
      {/* </div> */}

      <div className="dashboard-content">
        
        <div className="dashboard-summary" id='dashboard-summary'>
          <div className="summary-card">
            <h2>Account Balance</h2>
            <p className="summary-amount">${totalBalance.toFixed(2)}</p>
            {/* <a href="/accounts" className="summary-link">View Accounts</a> */}
          </div>
          
          <div className="summary-card">
            <h2>Monthly Budget</h2>
            <p className="summary-amount">${totalBudgeted.toFixed(2)}</p>
            <div className="budget-progress">
              <div 
                className="budget-progress-bar" 
                style={{ width: `${Math.min((totalSpent / totalBudgeted) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="budget-status">
              ${totalSpent.toFixed(2)} spent of ${totalBudgeted.toFixed(2)}
            </p>
            {/* <a href="/budget" className="summary-link">Manage Budget</a> */}
          </div>
          
          <div className="summary-card">
            <h2>Remaining Budget</h2>
            <p className={`summary-amount ${remainingBudget < 0 ? 'negative' : 'positive'}`}>
              ${remainingBudget.toFixed(2)}
            </p>
            {/* <a href="/reports" className="summary-link">View Reports</a> */}
          </div>
        </div>
        
        <div className="dashboard-sections">
          <section className="dashboard-section">
            <h2>Recent Transactions</h2>
            <div className="transactions-list" id='transactions-list'>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.length > 0 ? (
                    recentTransactions.map(transaction => (
                      <tr key={transaction.id}>
                        <td>{transaction.date}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.category}</td>
                        <td className={transaction.amount < 0 ? 'negative' : 'positive'}>
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="no-data">No recent transactions</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <a href="/transactions" className="view-all-link">View All Transactions</a>
          </section>
          
          <section className="dashboard-section">
            <h2>Budget Categories</h2>
            <div className="budget-categories" id="goals-section">
              {userData.budgets.length > 0 ? (
                userData.budgets.map(budget => (
                  <div className="budget-category" key={budget.id}>
                    <div className="category-header">
                      <h3>{budget.category}</h3>
                      <p>${budget.spent.toFixed(2)} / ${budget.budgeted.toFixed(2)}</p>
                    </div>
                    <div className="category-progress">
                      <div 
                        className="category-progress-bar" 
                        style={{ 
                          width: `${Math.min((budget.spent / budget.budgeted) * 100, 100)}%`,
                          backgroundColor: budget.spent > budget.budgeted ? '#e74c3c' : '#3498db' 
                        }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">No budget categories defined</p>
              )}
            </div>
            <a href="/create-budget" className="view-all-link">Create New Budget</a>
          </section>
        </div>

        <div className="dashboard-sections">
          <section className="dashboard-section">
            <h2>Accounts Overview</h2>
            <div className="accounts-list">
              {userData.accounts.length > 0 ? (
                userData.accounts.map(account => (
                  <div className="account-item" key={account.id}>
                    <div className="account-info">
                      <h3>{account.name}</h3>
                      <p className="account-type">{account.type}</p>
                    </div>
                    <p className={account.balance < 0 ? 'negative' : 'positive'}>
                      ${account.balance.toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="no-data">No accounts available</p>
              )}
            </div>
            <a href="/add-account" className="view-all-link">Add New Account</a>
          </section>
          
          <section className="dashboard-section">
            <h2>Spending by Category</h2>
            <div className="spending-chart">
              {spendingByCategory.length > 0 ? (
                spendingByCategory.map(item => (
                  <div className="chart-item" key={item.category}>
                    <div className="chart-label">
                      <span className="category-name">{item.category}</span>
                      <span className="category-percentage">{item.percentage}%</span>
                    </div>
                    <div className="chart-bar-container">
                      <div
                        className="chart-bar"
                        style={{ 
                          width: `${item.percentage}%`,
                          backgroundColor: getColorForCategory(item.category)
                        }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">No spending data available</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate different colors for different categories
const getColorForCategory = (category) => {
  // Simple hash function to generate consistent colors for categories
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Convert hash to RGB color with good saturation and brightness
  let hue = hash % 360;
  return `hsl(${hue}, 70%, 45%)`;
};

export default DashboardPage;