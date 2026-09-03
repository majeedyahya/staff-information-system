import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Demo login credentials
    const adminEmail = "admin@staffsystem.com";
    const adminPassword = "admin@123";

    if (email === adminEmail && password === adminPassword) {
      // Save login status
      localStorage.setItem("isLoggedIn", "true");

      // Go to dashboard
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Logo / Brand */}
        <div className="login-brand">
          <div className="login-logo">
            <i className="bi bi-person-workspace"></i>
          </div>

          <h2>StaffSystem</h2>
          <p>Staff Information & Management</p>
        </div>

        {/* Login Card */}
        <div className="login-card">
          <div className="text-center mb-4">
            <h3>Welcome Back</h3>
            <p className="text-muted">
              Sign in to access the administrator dashboard
            </p>
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
              <label className="form-label">Email Address</label>

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
                  required
                />
              </div>
            </div>

            {/* Password */}
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

            {/* Remember / Forgot */}
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

            {/* Login Button */}
            <button type="submit" className="btn btn-primary login-button">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Sign In
            </button>
          </form>

          <div className="login-footer">
            <small>© 2026 StaffSystem. All rights reserved.</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
