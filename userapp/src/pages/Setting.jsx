import React, { useState } from "react";

function Settings({ theme, onThemeChange }) {
  const [settings, setSettings] = useState({
    fullName: "John Staff",
    email: "john@example.com",
    phone: "+255 700 000 000",
    notifications: true,
    emailNotifications: true,
    language: "English",
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
    alert("Settings updated successfully!");
  };

  return (
    <div className="container-fluid p-4">

      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Settings</h2>
        <p className="text-muted">
          Manage your account and personal preferences.
        </p>
      </div>

      <div className="row">

        {/* Account Information */}
        <div className="col-lg-7 mb-4">
          <div className="card border-0 shadow-sm">

            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">
                <i className="bi bi-person-circle me-2"></i>
                Account Information
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

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={settings.phone}
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

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <i className="bi bi-check-circle me-2"></i>
                  Save Changes
                </button>

              </form>

            </div>
          </div>
        </div>


        {/* Profile */}
        <div className="col-lg-5 mb-4">
          <div className="card border-0 shadow-sm">

            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">
                <i className="bi bi-person me-2"></i>
                My Profile
              </h5>
            </div>

            <div className="card-body text-center">

              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: "100px",
                  height: "100px",
                  fontSize: "40px"
                }}
              >
                JS
              </div>

              <h5 className="fw-bold mb-1">
                {settings.fullName}
              </h5>

              <p className="text-muted mb-3">
                Staff Member
              </p>

              <button className="btn btn-outline-primary">
                <i className="bi bi-camera me-2"></i>
                Change Profile Picture
              </button>

            </div>
          </div>
        </div>


        {/* Notifications */}
        <div className="col-lg-7 mb-4">
          <div className="card border-0 shadow-sm">

            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">
                <i className="bi bi-bell me-2"></i>
                Notifications
              </h5>
            </div>

            <div className="card-body">

              {/* System Notifications */}
              <div className="form-check form-switch mb-4">

                <input
                  className="form-check-input"
                  type="checkbox"
                  id="notifications"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                />

                <label
                  className="form-check-label fw-semibold"
                  htmlFor="notifications"
                >
                  System Notifications
                </label>

                <div className="text-muted small">
                  Receive notifications about your staff account.
                </div>

              </div>


              {/* Email Notifications */}
              <div className="form-check form-switch">

                <input
                  className="form-check-input"
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                />

                <label
                  className="form-check-label fw-semibold"
                  htmlFor="emailNotifications"
                >
                  Email Notifications
                </label>

                <div className="text-muted small">
                  Receive important updates through email.
                </div>

              </div>

            </div>
          </div>
        </div>


        {/* Preferences */}
        <div className="col-lg-5 mb-4">
          <div className="card border-0 shadow-sm">

            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">
                <i className="bi bi-sliders me-2"></i>
                Preferences
              </h5>
            </div>

            <div className="card-body">

              {/* Language */}
              <div className="mb-4">

                <label className="form-label fw-semibold">
                  Language
                </label>

                <select
                  className="form-select"
                  name="language"
                  value={settings.language}
                  onChange={handleChange}
                >
                  <option value="English">
                    English
                  </option>

                  <option value="Swahili">
                    Swahili
                  </option>
                </select>

              </div>


              {/* Theme */}
              <div>

                <label className="form-label fw-semibold">
                  Theme
                </label>

                <select
                  className="form-select"
                  value={theme}
                  onChange={(event) => onThemeChange(event.target.value)}
                  aria-label="Theme"
                >
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                  <option value="system">System Default</option>
                </select>

              </div>

            </div>
          </div>
        </div>


        {/* Security */}
        <div className="col-12 mb-4">

          <div className="card border-0 shadow-sm">

            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">
                <i className="bi bi-shield-lock me-2"></i>
                Security
              </h5>
            </div>

            <div className="card-body">

              <div className="row">

                <div className="col-md-8">

                  <h6 className="fw-bold">
                    Account Security
                  </h6>

                  <p className="text-muted mb-0">
                    Keep your account secure by using a strong password
                    and protecting your login information.
                  </p>

                </div>

                <div className="col-md-4 text-md-end mt-3 mt-md-0">

                  <button className="btn btn-outline-primary me-2">
                    Change Password
                  </button>

                  <button className="btn btn-outline-danger">
                    Logout
                  </button>

                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Settings;
