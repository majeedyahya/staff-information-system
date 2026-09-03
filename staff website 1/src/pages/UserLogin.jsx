import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    /*
      Temporary frontend authentication.

      Later this can be replaced with your
      backend API authentication.
    */

    localStorage.setItem("userLoggedIn", "true");

    localStorage.setItem("userName", "John Doe");

    navigate("/user/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side */}
        <div className="login-left">
          <div className="login-brand">
            <div className="login-logo">
              <i className="bi bi-building"></i>
            </div>

            <h2>Employee Portal</h2>

            <p>Manage your employee account, and leave.</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="login-right">
          <div className="login-form-container">
            <div className="text-center mb-4">
              <div className="mobile-login-icon">
                <i className="bi bi-person"></i>
              </div>

              <h3 className="fw-bold">Welcome Back</h3>

              <p className="text-muted">Login to your employee account</p>
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
                <label className="form-label fw-semibold">Email Address</label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
