import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import OverviewPage from './pages/OverviewPage';
import ContactUsPage from './pages/ContactUsPage';
import BudgetFormPage from './pages/BudgetFormPage';
import AddAccountPage from './pages/AddAccountPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/create-budget" element={<BudgetFormPage />} />
        <Route path="/add-account" element={<AddAccountPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
