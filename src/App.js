import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ContactUsPage from './pages/ContactUsPage';
import BudgetFormPage from './pages/BudgetFormPage';
import AddAccountPage from './pages/AddAccountPage';
import TransactionsPage from './pages/TransactionsPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/create-budget" element={<BudgetFormPage />} />
        <Route path="/add-account" element={<AddAccountPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        {/* <Route path="/accounts" element={<AccountsListPage />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
