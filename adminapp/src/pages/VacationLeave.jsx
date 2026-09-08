import React, { useEffect, useState } from "react";

function VacationLeave() {
  const [leave, setLeave] = useState([]);

  useEffect(() => {
    setLeave(JSON.parse(localStorage.getItem("leave")) || []);
  }, []);

  const updateStatus = (id, status) => {
    const updated = leave.map((item) =>
      item.id === id
        ? {
            ...item,
            status,
            approvedBy: "Administrator",
            approvalDate: new Date().toISOString().split("T")[0],
          }
        : item,
    );

    setLeave(updated);
    localStorage.setItem("leave", JSON.stringify(updated));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Vacation & Leave Management</h2>
          <p>Manage staff vacation and leave requests.</p>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="mini-stat">
            <i className="bi bi-hourglass-split"></i>
            <div>
              <span>Pending Requests</span>
              <strong>
                {leave.filter((x) => x.status === "Pending").length}
              </strong>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="mini-stat">
            <i className="bi bi-check-circle"></i>
            <div>
              <span>Approved</span>
              <strong>
                {leave.filter((x) => x.status === "Approved").length}
              </strong>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="mini-stat">
            <i className="bi bi-x-circle"></i>
            <div>
              <span>Rejected</span>
              <strong>
                {leave.filter((x) => x.status === "Rejected").length}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className="card custom-card">
        <div className="table-responsive">
          <table className="table custom-table">
            <thead>
              <tr>
                <th>Staff</th>
                <th>Leave Type</th>
                <th>Start</th>
                <th>End</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {leave.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    No vacation/leave requests found.
                  </td>
                </tr>
              ) : (
                leave.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.staffName}</strong>
                      <small className="d-block text-muted">
                        {item.staffId}
                      </small>
                    </td>

                    <td>{item.type}</td>

                    <td>{item.startDate}</td>

                    <td>{item.endDate}</td>

                    <td>
                      <strong>{item.days}</strong> days
                    </td>

                    <td>{item.reason || "-"}</td>

                    <td>
                      <span className={`badge-status ${item.status}`}>
                        {item.status}
                      </span>
                    </td>

                    <td>
                      {item.status === "Pending" && (
                        <>
                          <button
                            className="btn btn-sm btn-success me-1"
                            onClick={() => updateStatus(item.id, "Approved")}
                          >
                            <i className="bi bi-check"></i>
                          </button>

                          <button
                            className="btn btn-sm btn-warning me-1"
                            onClick={() => updateStatus(item.id, "Rejected")}
                          >
                            <i className="bi bi-x"></i>
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VacationLeave;
