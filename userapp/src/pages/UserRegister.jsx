import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", fullName: "", gender: "", phoneNumber: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username, full_name: formData.fullName, gender: formData.gender,
          phone_number: formData.phoneNumber, email: formData.email, password: formData.password,
          confirm_password: formData.confirmPassword,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(Object.values(data).flat().join(" "));
        return;
      }
      alert("Registration submitted. Wait for administrator approval before logging in.");
      navigate("/user/login");
    } catch {
      setError("Unable to reach the server. Start Django and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <i className="bi bi-person-plus-fill"></i>
          <h2>Create Staff Account</h2>
          <p>Register your account for administrator approval.</p>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>Username</label><input name="username" value={formData.username} onChange={handleChange} required />
          <label>Full Name</label><input name="fullName" value={formData.fullName} onChange={handleChange} required />
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select gender</option><option value="M">Male</option><option value="F">Female</option><option value="O">Other</option>
          </select>
          <label>Phone Number</label><input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          <label>Email Address</label><input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Password</label><input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <label>Confirm Password</label><input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          <button type="submit" className="register-btn" disabled={submitting}>
            <i className="bi bi-person-plus"></i> {submitting ? "Submitting..." : "Create Account"}
          </button>
        </form>
        <div className="login-link">Already have an account? <Link to="/user/login">Login here</Link></div>
      </div>
    </div>
  );
}

export default Register;
