import React from "react";
import { Link } from "react-router-dom";

function UserLeave() {
  const leaves = [
    {
      type: "Annual Leave",
      start: "10 Sep 2026",
      end: "14 Sep 2026",
      days: 5,
      reason: "Family vacation",
      status: "Pending",
    },
    {
      type: "Sick Leave",
      start: "20 Aug 2026",
      end: "21 Aug 2026",
      days: 2,
      reason: "Medical appointment",
      status: "Approved",
    },
    {
      type: "Annual Leave",
      start: "05 Jul 2026",
      end: "08 Jul 2026",
      days: 4,
      reason: "Personal vacation",
      status: "Approved",
    },
    {
      type: "Emergency Leave",
      start: "15 Jun 2026",
      end: "16 Jun 2026",
      days: 2,
      reason: "Family emergency",
      status: "Rejected",
    },
  ];

  const getStatusClass = (status) => {
    if (status === "Approved") {
      return "bg-success-subtle text-success-emphasis";
    }

    if (status === "Rejected") {
      return "bg-danger-subtle text-danger-emphasis";
    }

    return "bg-warning-subtle text-warning-emphasis";
  };

  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h3 className="fw-bold">
            My Leave
          </h3>

          <p className="text-muted mb-0">
            View your leave history and requests.
          </p>
        </div>

        <Link
          to="/user/request-leave"
          className="btn btn-primary"
        >
          <i className="bi bi-plus-lg me-2"></i>
          Request Leave
        </Link>

      </div>

      {/* Leave Summary */}
      <div className="row g-4 mb-4">

        <div className="col-md-4">

          <div className="summary-card">
            <span>
              Total Leave
            </span>

            <h3>
              30 Days
            </h3>
          </div>

        </div>

        <div className="col-md-4">

          <div className="summary-card">
            <span>
              Used Leave
            </span>

            <h3>
              12 Days
            </h3>
          </div>

        </div>

        <div className="col-md-4">

          <div className="summary-card">
            <span>
              Remaining
            </span>

            <h3>
              18 Days
            </h3>
          </div>

        </div>

      </div>

      {/* Table */}
      <div className="content-card">

        <div className="table-responsive">

          <table className="table align-middle">

            <thead>

              <tr>
                <th>Leave Type</th>
                <th>Start</th>
                <th>End</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {leaves.map((leave, index) => (
                <tr key={index}>

                  <td>
                    <strong>
                      {leave.type}
                    </strong>
                  </td>

                  <td>
                    {leave.start}
                  </td>

                  <td>
                    {leave.end}
                  </td>

                  <td>
                    {leave.days}
                  </td>

                  <td>
                    {leave.reason}
                  </td>

                  <td>

                    <span
                      className={`badge ${getStatusClass(
                        leave.status
                      )}`}
                    >
                      {leave.status}
                    </span>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default UserLeave;