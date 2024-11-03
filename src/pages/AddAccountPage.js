import React, { useState } from "react";
import DashboardNav from "../components/DashboardNav";
import Footer from "../components/Footer";
import "./AddAccountPage.css";

const AddAccountPage = () => {
  const [formData, setFormData] = useState({
    accountName: "",
    accountType: "",
    initialBalance: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.accountName) errors.accountName = "Account name is required";
    if (!formData.accountType) errors.accountType = "Account type is required";
    if (!formData.initialBalance) {
      errors.initialBalance = "Initial balance is required";
    } else if (parseFloat(formData.initialBalance) < 100) {
      errors.initialBalance = "Initial balance must be at least 100";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData);
      alert("Account added successfully!");
      setFormData({ accountName: "", accountType: "", initialBalance: "" });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="add-account-page">
      <DashboardNav />
      <main>
        <h1>Add Account</h1>
        <form className="account-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="accountName">Account Name:</label>
            <input
              type="text"
              id="accountName"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
            />
            {formErrors.accountName && <p className="error">{formErrors.accountName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="accountType">Account Type:</label>
            <select
              id="accountType"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
            >
              <option value="">Select Account Type</option>
              <option value="Savings">Savings</option>
              <option value="Checking">Checking</option>
              <option value="Credit">Credit</option>
            </select>
            {formErrors.accountType && <p className="error">{formErrors.accountType}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="initialBalance">Initial Balance:</label>
            <input
              type="number"
              id="initialBalance"
              name="initialBalance"
              value={formData.initialBalance}
              onChange={handleChange}
            />
            {formErrors.initialBalance && <p className="error">{formErrors.initialBalance}</p>}
          </div>

          <button type="submit">Add Account</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AddAccountPage;
