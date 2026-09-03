import React, { useState } from "react";

function UserProfile() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+255 700 000 000",
    department: "Human Resources",
    position: "Employee",
    employeeId: "EMP-001",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Profile updated successfully!");
  };

  return (
    <div>

      <div className="page-heading mb-4">

        <h3 className="fw-bold">
          My Profile
        </h3>

        <p className="text-muted">
          View and manage your personal information.
        </p>

      </div>

      <div className="row g-4">

        {/* Profile Card */}
        <div className="col-lg-4">

          <div className="content-card text-center">

            <div className="large-avatar">
              JD
            </div>

            <h4 className="fw-bold mt-3">
              {profile.firstName}{" "}
              {profile.lastName}
            </h4>

            <p className="text-muted">
              {profile.position}
            </p>

            <span className="badge bg-success-subtle text-success-emphasis">
              Active Employee
            </span>

            <hr />

            <div className="text-start">

              <p>
                <strong>Employee ID:</strong>
                <br />
                {profile.employeeId}
              </p>

              <p>
                <strong>Department:</strong>
                <br />
                {profile.department}
              </p>

              <p>
                <strong>Email:</strong>
                <br />
                {profile.email}
              </p>

            </div>

          </div>

        </div>

        {/* Edit Profile */}
        <div className="col-lg-8">

          <div className="content-card">

            <h5 className="fw-bold mb-4">
              Personal Information
            </h5>

            <form onSubmit={handleSubmit}>

              <div className="row g-3">

                <div className="col-md-6">

                  <label className="form-label">
                    First Name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={profile.firstName}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6">

                  <label className="form-label">
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={profile.lastName}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={profile.email}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6">

                  <label className="form-label">
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={profile.phone}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-6">

                  <label className="form-label">
                    Department
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={profile.department}
                    disabled
                  />

                </div>

                <div className="col-md-6">

                  <label className="form-label">
                    Position
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={profile.position}
                    disabled
                  />

                </div>

                <div className="col-12 mt-4">

                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    Save Changes
                  </button>

                </div>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default UserProfile;