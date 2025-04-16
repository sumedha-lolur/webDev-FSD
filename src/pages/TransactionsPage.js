import React, { useState, useEffect, useLayoutEffect } from "react";
import DashboardNav from "../components/DashboardNav";
import Footer from "../components/Footer";
import "./TransactionsPage.css";

// Sample transaction data
const sampleTransactions = [
  {
    id: 1,
    date: "2023-04-15",
    description: "Grocery Shopping",
    category: "Food",
    amount: -120.45,
    account: "Checking Account"
  },
  {
    id: 2,
    date: "2023-04-14",
    description: "Salary Deposit",
    category: "Income",
    amount: 2500.00,
    account: "Checking Account"
  },
  {
    id: 3,
    date: "2023-04-13",
    description: "Electric Bill",
    category: "Utilities",
    amount: -85.20,
    account: "Credit Card"
  },
  {
    id: 4,
    date: "2023-04-12",
    description: "Restaurant Dinner",
    category: "Dining Out",
    amount: -64.80,
    account: "Credit Card"
  },
  {
    id: 5,
    date: "2023-04-10",
    description: "Gas Station",
    category: "Transportation",
    amount: -45.00,
    account: "Credit Card"
  },
  {
    id: 6,
    date: "2023-04-08",
    description: "Movie Tickets",
    category: "Entertainment",
    amount: -32.50,
    account: "Checking Account"
  },
  {
    id: 7,
    date: "2023-04-05",
    description: "Freelance Payment",
    category: "Income",
    amount: 350.00,
    account: "Savings Account"
  },
  {
    id: 8,
    date: "2023-04-03",
    description: "Internet Bill",
    category: "Utilities",
    amount: -75.00,
    account: "Checking Account"
  },
  {
    id: 9,
    date: "2023-04-02",
    description: "Gym Membership",
    category: "Health & Fitness",
    amount: -50.00,
    account: "Credit Card"
  },
  {
    id: 10,
    date: "2023-04-01",
    description: "Phone Bill",
    category: "Utilities",
    amount: -65.00,
    account: "Checking Account"
  }
];

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    category: "",
    account: "",
    transactionType: "all"
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);

  // Get unique categories and accounts for filter dropdowns
  const categories = [...new Set(transactions.map(t => t.category))];
  const accounts = [...new Set(transactions.map(t => t.account))];

  // Check if mobile view should be used
  useLayoutEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth <= 480);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Fetch transactions data
  useEffect(() => {
    // In a real app, you would fetch data from an API
    // For now, we'll use the sample data
    setTimeout(() => {
      setTransactions(sampleTransactions);
      setFilteredTransactions(sampleTransactions);
      setLoading(false);
    }, 500);
  }, []);

  // Apply filters when filter values change
  useEffect(() => {
    applyFilters();
  }, [filters, searchTerm, transactions]);

  const applyFilters = () => {
    let filtered = [...transactions];

    // Apply date range filter
    if (filters.dateFrom) {
      filtered = filtered.filter(t => t.date >= filters.dateFrom);
    }
    if (filters.dateTo) {
      filtered = filtered.filter(t => t.date <= filters.dateTo);
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(t => t.category === filters.category);
    }

    // Apply account filter
    if (filters.account) {
      filtered = filtered.filter(t => t.account === filters.account);
    }

    // Apply transaction type filter (income/expense/all)
    if (filters.transactionType === "income") {
      filtered = filtered.filter(t => t.amount > 0);
    } else if (filters.transactionType === "expense") {
      filtered = filtered.filter(t => t.amount < 0);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        t =>
          t.description.toLowerCase().includes(term) ||
          t.category.toLowerCase().includes(term) ||
          t.account.toLowerCase().includes(term)
      );
    }

    setFilteredTransactions(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      category: "",
      account: "",
      transactionType: "all"
    });
    setSearchTerm("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Card view for mobile
  const renderMobileCards = () => {
    if (filteredTransactions.length === 0) {
      return (
        <div className="no-transactions">
          <i className="fas fa-receipt"></i>
          <h3>No transactions found</h3>
          <p>Try adjusting your filters or add new transactions</p>
        </div>
      );
    }
    
    return (
      <div className="transactions-cards">
        {filteredTransactions.map(transaction => (
          <div 
            key={transaction.id} 
            className={`transaction-card ${transaction.amount > 0 ? 'income' : 'expense'}`}
          >
            <div className="transaction-card-header">
              <h3>{transaction.description}</h3>
              <span className={transaction.amount < 0 ? 'negative' : 'positive'}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </span>
            </div>
            <div className="transaction-card-details">
              <div className="transaction-card-info">
                <div className="info-item">
                  <span className="info-label">Date:</span>
                  <span className="info-value">{formatDate(transaction.date)}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Category:</span>
                  <span className="category-tag">{transaction.category}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Account:</span>
                  <span className="info-value">{transaction.account}</span>
                </div>
              </div>
              <div className="transaction-card-actions">
                <button className="edit-btn">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="delete-btn">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render table view (original)
  const renderTableView = () => {
    if (filteredTransactions.length === 0) {
      return (
        <div className="no-transactions">
          <i className="fas fa-receipt"></i>
          <h3>No transactions found</h3>
          <p>Try adjusting your filters or add new transactions</p>
        </div>
      );
    }
    
    return (
      <div className="transactions-list">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Account</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.description}</td>
                <td>
                  <span className="category-tag">{transaction.category}</span>
                </td>
                <td>{transaction.account}</td>
                <td className={transaction.amount < 0 ? 'negative' : 'positive'}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </td>
                <td className="action-buttons">
                  <button className="edit-btn">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="delete-btn">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="transactions-page">
      <DashboardNav />
      
      <main className="transactions-content">
        <div className="page-header">
          <h1>Transactions</h1>
          <div className="actions">
            <button className="export-btn">
              <i className="fas fa-file-export"></i> Export
            </button>
            <button className="add-btn">
              <i className="fas fa-plus"></i> Add Transaction
            </button>
          </div>
        </div>
        
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
          
          <div className="filter-controls">
            <div className="filter-group date-range-group">
              <label>Date Range</label>
              <div className="date-range">
                <input
                  type="date"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleFilterChange}
                />
                <span>to</span>
                <input
                  type="date"
                  name="dateTo"
                  value={filters.dateTo}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            
            <div className="filter-group">
              <label>Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Account</label>
              <select
                name="account"
                value={filters.account}
                onChange={handleFilterChange}
              >
                <option value="">All Accounts</option>
                {accounts.map(account => (
                  <option key={account} value={account}>
                    {account}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Type</label>
              <select
                name="transactionType"
                value={filters.transactionType}
                onChange={handleFilterChange}
              >
                <option value="all">All Transactions</option>
                <option value="income">Income</option>
                <option value="expense">Expenses</option>
              </select>
            </div>
            
            <button className="reset-btn" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>
        
        <div className="transactions-summary">
          <div className="summary-card">
            <h3>Total Transactions</h3>
            <p>{filteredTransactions.length}</p>
          </div>
          <div className="summary-card income">
            <h3>Total Income</h3>
            <p>${filteredTransactions.reduce((sum, t) => sum + (t.amount > 0 ? t.amount : 0), 0).toFixed(2)}</p>
          </div>
          <div className="summary-card expense">
            <h3>Total Expenses</h3>
            <p>${Math.abs(filteredTransactions.reduce((sum, t) => sum + (t.amount < 0 ? t.amount : 0), 0)).toFixed(2)}</p>
          </div>
          <div className="summary-card balance">
            <h3>Net Balance</h3>
            <p className={filteredTransactions.reduce((sum, t) => sum + t.amount, 0) >= 0 ? "positive" : "negative"}>
              ${filteredTransactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="transactions-container">
          {loading ? (
            <div className="loading-spinner">
              <i className="fas fa-spinner fa-spin"></i>
              <p>Loading transactions...</p>
            </div>
          ) : isMobileView ? (
            renderMobileCards()
          ) : (
            renderTableView()
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TransactionsPage;