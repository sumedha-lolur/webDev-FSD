import React from "react";
import { HashLink as Link } from 'react-router-hash-link';
import "./OverviewPage.css";
import DashboardNav from "../components/DashboardNav";
import Footer from "../components/Footer";

const OverviewPage = () => {
  return (
    <div className="overview-page">
      <DashboardNav />
      <main>
        
          <div className="overview-content">
            <h1>Profile overview</h1>
          </div>

      </main>

      <section className="summary-section" id="summary-section">
        <h2>Summary</h2>
        <p>
          This section provides a brief summary of your financial status. It
          includes an overview of your total income, expenses, and savings for
          the selected period.
        </p>
      </section>


      <section className="recent-activity-section" id="recent-activity-section">
        <h2>Recent Activity</h2>
        <p>
          Here you can view a list of your most recent transactions, including
          details like the amount, category, and date of each transaction.
        </p>
      </section>

      <section className="goals-section" id="goals-section">
        <h2>Goals</h2>
        <p>
          This section helps you track your financial goals. You can set
          specific goals, monitor your progress, and see how close you are to
          achieving them.
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default OverviewPage;
