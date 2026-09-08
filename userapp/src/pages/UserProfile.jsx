import React, { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api";

function UserProfile() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/profile/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("userAccessToken")}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error("Could not load your profile.");

        const [firstName = "", ...lastNameParts] = data.full_name.trim().split(/\s+/);
        setProfile({
          firstName,
          lastName: lastNameParts.join(" "),
          email: data.email,
          phone: data.phone_number,
          username: data.username,
        });
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${API_URL}/profile/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userAccessToken")}`,
        },
        body: JSON.stringify({
          full_name: `${profile.firstName} ${profile.lastName}`.trim(),
          email: profile.email,
          phone_number: profile.phone,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(Object.values(data).flat().join(" "));

      localStorage.setItem("userName", data.full_name || data.username);
      alert("Profile updated successfully!");
    } catch (saveError) {
      setError(saveError.message || "Could not update your profile.");
    }
  };

  if (loading) return <p className="text-muted">Loading profile...</p>;

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

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4">

        {/* Profile Card */}
        <div className="col-lg-4">

          <div className="content-card text-center">

            <div className="large-avatar">
              {(profile.firstName[0] || "U")}{(profile.lastName[0] || "")}
            </div>

            <h4 className="fw-bold mt-3">
              {profile.firstName}{" "}
              {profile.lastName}
            </h4>

            <p className="text-muted">
              Staff Member
            </p>

            <span className="badge bg-success-subtle text-success-emphasis">
              Active Staff
            </span>

            <hr />

            <div className="text-start">

              <p>
                <strong>Username:</strong>
                <br />
                {profile.username}
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
