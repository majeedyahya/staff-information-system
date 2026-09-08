import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/smz.jpg";
import panel from "../assets/developer.jpg";
import { Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api";

function UserLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError("Invalid username or password, or your account is still pending approval.");
        return;
      }
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("userAccessToken", data.access);
      localStorage.setItem("userName", email);
      navigate("/user/dashboard");
    } catch {
      setError("Unable to reach the server. Start Django and try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side */}
        <div className="login-left">
          <img src={panel} alt="StaffSystem" className="panel-image" />
          {/* <div className="login-brand">
            <h1>Staff Portal</h1>

            <p>Manage your staff account, and leave.</p>
          </div> */}
        </div>

        {/* Right Side */}
        <div className="login-right">
          <div className="login-form-container">
            <div className="text-center mb-4">
              <div className="mobile-login-icon">
                <i className="bi bi-person"></i>
              </div>

              <img src={logo} alt="SMZ logo" className="login-logo" />
              <h3 className="fw-bold">ZANZIBAR eGOVERMENT AUTHORITY(eGAZ)</h3>

              <p className="text-muted">Login to your staff account</p>
            </div>

            {error && (
              <div className="alert alert-danger">
                <i className="bi bi-exclamation-circle me-2"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Username</label>

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
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between mb-4">
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

                <a href="#" className="text-decoration-none">
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Login
              </button>

              <div className="register-link">
                Don't have an account?{" "}
                <Link to="/register">Create an account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
