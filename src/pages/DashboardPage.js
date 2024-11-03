import React from "react";
import { Link } from "react-router-dom";
import "./DashboardPage.css";
import DashboardNav from "../components/DashboardNav";
import Footer from "../components/Footer";
const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <DashboardNav />
      <section className="user-dashboard">
          <div className="dashboard-content">
            <h1>Welcome to Your Dashboard</h1>
            <h3>"He who buys what he does not need, steals from himself."</h3>
            <p>~ Swedish Proverb</p>
          </div>
        </section>
      <main className="content">
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
