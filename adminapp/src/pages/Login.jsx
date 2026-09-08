import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/smz.jpg";
import egoverment from "../assets/Logo.jpg";

const API_URL = "http://127.0.0.1:8000/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${API_URL}/auth/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError("Invalid username or password.");
        return;
      }
      const registrationsResponse = await fetch(`${API_URL}/registrations/`, {
        headers: { Authorization: `Bearer ${data.access}` },
      });
      if (!registrationsResponse.ok) {
        setError("This account does not have administrator access.");
        return;
      }
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("accessToken", data.access);
      navigate("/dashboard");
    } catch {
      setError("Unable to reach the server. Start Django and try again.");
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <img
          src={egoverment}
          alt="eGovernment Zanzibar"
          className="egovernment-bg"
        />

        <div className="login-brand">
          <div className="login-logo">
            <img src={logo} alt="StaffSystem" />
          </div>
          <h2>StaffSystem</h2>
          <p>Staff Information &amp; Management</p>
        </div>

        <div className="login-heading">
          <h3>Admin Login</h3>
          <p>Sign in to access the administrator dashboard</p>
        </div>

        {error && (
          <div className="alert alert-danger">
            <i className="bi bi-exclamation-circle me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>

            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope"></i>
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>

              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                ></i>
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="remember"
              />

              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>
            </div>

            <button
              type="button"
              className="forgot-password"
              onClick={() =>
                alert(
                  "Please contact the system administrator to reset your password.",
                )
              }
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="btn btn-primary login-button">
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <small>
            <i className="bi bi-shield-lock me-1"></i> Secure Administrator
            Access
          </small>
        </div>
      </div>
    </main>
  );
}

export default Login;
