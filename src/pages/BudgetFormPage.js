import React, { useState } from "react";
import DashboardNav from "../components/DashboardNav";
import Footer from "../components/Footer";
import "./BudgetFormPage.css";

const BudgetFormPage = () => {
  const [formData, setFormData] = useState({
    budgetName: "",
    budgetAmount: "",
    startDate: "",
    endDate: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.budgetName) errors.budgetName = "Budget name is required";
    if (!formData.budgetAmount) errors.budgetAmount = "Budget amount is required";
    if (!formData.startDate) errors.startDate = "Start date is required";
    if (!formData.endDate) errors.endDate = "End date is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData);
      alert("Budget created successfully!");
      setFormData({ budgetName: "", budgetAmount: "", startDate: "", endDate: "" });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="budget-form-page">
      <DashboardNav />
      <main>
        <h1>Create Budget</h1>
        <form className="budget-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="budgetName">Budget Name:</label>
            <input
              type="text"
              id="budgetName"
              name="budgetName"
              value={formData.budgetName}
              onChange={handleChange}
            />
            {formErrors.budgetName && <p className="error">{formErrors.budgetName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="budgetAmount">Budget Amount:</label>
            <input
              type="number"
              id="budgetAmount"
              name="budgetAmount"
              value={formData.budgetAmount}
              onChange={handleChange}
            />
            {formErrors.budgetAmount && <p className="error">{formErrors.budgetAmount}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
            {formErrors.startDate && <p className="error">{formErrors.startDate}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
            {formErrors.endDate && <p className="error">{formErrors.endDate}</p>}
          </div>

          <button type="submit">Create Budget</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default BudgetFormPage;
