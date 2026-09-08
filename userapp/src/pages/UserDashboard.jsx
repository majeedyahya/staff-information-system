import React, { useEffect, useState } from "react";

function UserDashboard() {
  const userName = localStorage.getItem("userName") || "Majeed Said";
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const dateTimer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(dateTimer);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div>
      {/* Welcome */}
      <div className="dashboard-welcome mb-4">
        <div>
          <h3 className="fw-bold">Welcome back, {userName}! 👋</h3>

          <p className="text-muted mb-0">
            Here's what's happening with your account today.
          </p>
        </div>

        <div className="welcome-date">
          <i className="bi bi-calendar3 me-2"></i>
          {formattedDate}
        </div>
      </div>

      {/* Statistics */}
      <div className="row g-4 mb-4">
        {/* Leave Balance */}
        <div className="col-xl-3 col-md-6">
          <div className="stat-card">
            <div className="stat-icon bg-primary-subtle text-primary">
              <i className="bi bi-calendar-check"></i>
            </div>

            <div>
              <p className="text-muted mb-1">Leave Balance</p>

              <h3 className="fw-bold mb-0">18 Days</h3>

              <small className="text-success">
                <i className="bi bi-arrow-up"></i>
                Available
              </small>
            </div>
          </div>
        </div>

        {/* Pending Leave */}
        <div className="col-xl-3 col-md-6">
          <div className="stat-card">
            <div className="stat-icon bg-warning-subtle text-warning">
              <i className="bi bi-hourglass-split"></i>
            </div>

            <div>
              <p className="text-muted mb-1">Pending Requests</p>

              <h3 className="fw-bold mb-0">2</h3>

              <small className="text-muted">Awaiting approval</small>
            </div>
          </div>
        </div>

        {/* Working Days */}
        <div className="col-xl-3 col-md-6">
          <div className="stat-card">
            <div className="stat-icon bg-info-subtle text-info">
              <i className="bi bi-clock"></i>
            </div>

            <div>
              <p className="text-muted mb-1">Working Days</p>

              <h3 className="fw-bold mb-0">21</h3>

              <small className="text-muted">This month</small>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="row g-4">
        {/* Recent Requests */}
        <div className="col-lg-8">
          <div className="content-card">
            <div className="card-header-custom">
              <div>
                <h5 className="fw-bold mb-1">Recent Leave Requests</h5>

                <small className="text-muted">
                  Your latest leave applications
                </small>
              </div>

              <a href="/user/leave" className="btn btn-sm btn-outline-primary">
                View All
              </a>
            </div>

            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Leave Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Days</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <strong>Annual Leave</strong>
                    </td>

                    <td>10 Sep 2026</td>

                    <td>14 Sep 2026</td>

                    <td>5</td>

                    <td>
                      <span className="badge bg-warning-subtle text-warning-emphasis">
                        Pending
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong>Sick Leave</strong>
                    </td>

                    <td>20 Aug 2026</td>

                    <td>21 Aug 2026</td>

                    <td>2</td>

                    <td>
                      <span className="badge bg-success-subtle text-success-emphasis">
                        Approved
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong>Annual Leave</strong>
                    </td>

                    <td>05 Jul 2026</td>

                    <td>08 Jul 2026</td>

                    <td>4</td>

                    <td>
                      <span className="badge bg-success-subtle text-success-emphasis">
                        Approved
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-lg-4">
          <div className="content-card">
            <div className="card-header-custom">
              <div>
                <h5 className="fw-bold mb-1">Quick Actions</h5>

                <small className="text-muted">Common tasks</small>
              </div>
            </div>

            <div className="quick-actions">
              <a href="/user/request-leave" className="quick-action">
                <div className="quick-icon bg-primary-subtle text-primary">
                  <i className="bi bi-calendar-plus"></i>
                </div>

                <div>
                  <strong>Request Leave</strong>

                  <small className="d-block text-muted">
                    Submit a new leave request
                  </small>
                </div>

                <i className="bi bi-chevron-right ms-auto"></i>
              </a>

              <a href="/user/profile" className="quick-action">
                <div className="quick-icon bg-success-subtle text-success">
                  <i className="bi bi-person"></i>
                </div>

                <div>
                  <strong>Update Profile</strong>

                  <small className="d-block text-muted">
                    Manage your information
                  </small>
                </div>

                <i className="bi bi-chevron-right ms-auto"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
