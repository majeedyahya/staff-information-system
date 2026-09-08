// 

import React, { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    fullName: "System Administrator",
    email: "admin@staffsystem.com",
    notifications: true,
    emailNotifications: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    alert("Settings saved successfully!");
  };

  return (
    <div className="container-fluid p-4">
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Settings</h2>
        <p className="text-muted">
          Manage your Staff Information System settings and preferences.
        </p>
      </div>

      <div className="row">
        {/* Account Settings */}
        <div className="col-lg-7 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">
                <i className="bi bi-person-circle me-2"></i>
                Account Settings
              </h5>
            </div>

            <div className="card-body">
              <form onSubmit={handleSave}>
                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    value={settings.fullName}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Change Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-check-circle me-2"></i>
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* System Preferences */}
        <div className="col-lg-5 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">
                <i className="bi bi-sliders me-2"></i>
                System Preferences
              </h5>
            </div>

            <div className="card-body">
              {/* Notifications */}
              <div className="form-check form-switch mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                  id="notifications"
                />

                <label
                  className="form-check-label fw-semibold"
                  htmlFor="notifications"
                >
                  System Notifications
                </label>

                <div className="text-muted small">
                  Receive important system notifications.
                </div>
              </div>

              {/* Email Notifications */}
              <div className="form-check form-switch mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  id="emailNotifications"
                />

                <label
                  className="form-check-label fw-semibold"
                  htmlFor="emailNotifications"
                >
                  Email Notifications
                </label>

                <div className="text-muted small">
                  Receive staff and system updates by email.
                </div>
              </div>

              {/* Dark Mode */}
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="darkMode"
                  checked={settings.darkMode}
                  onChange={handleChange}
                  id="darkMode"
                />

                <label
                  className="form-check-label fw-semibold"
                  htmlFor="darkMode"
                >
                  Dark Mode
                </label>

                <div className="text-muted small">
                  Change the appearance of the system.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="col-lg-7 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">
                <i className="bi bi-shield-lock me-2"></i>
                Security
              </h5>
            </div>

            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="fw-bold mb-1">
                    Two-Factor Authentication
                  </h6>

                  <p className="text-muted small mb-0">
                    Add an extra layer of security to your account.
                  </p>
                </div>

                <button className="btn btn-outline-primary btn-sm">
                  Enable
                </button>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-bold mb-1">
                    Login Sessions
                  </h6>

                  <p className="text-muted small mb-0">
                    Manage devices currently logged into your account.
                  </p>
                </div>

                <button className="btn btn-outline-danger btn-sm">
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="col-lg-5 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">
                <i className="bi bi-info-circle me-2"></i>
                System Information
              </h5>
            </div>

            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">System Name</span>
                <strong>Staff Information System</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Version</span>
                <strong>1.0.0</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Backend</span>
                <strong>Django</strong>
              </div>

              <div className="d-flex justify-content-between">
                <span className="text-muted">Frontend</span>
                <strong>React</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;