import React, { useEffect, useState } from "react";

function VacationLeave() {
  const [staff, setStaff] = useState([]);
  const [leave, setLeave] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    staffId: "",
    type: "Annual Leave",
    startDate: "",
    endDate: "",
    reason: "",
  });

  useEffect(() => {
    setStaff(JSON.parse(localStorage.getItem("staff")) || []);
    setLeave(JSON.parse(localStorage.getItem("leave")) || []);
  }, []);

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;

    const startDate = new Date(start);
    const endDate = new Date(end);

    const difference =
      Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24);

    return difference + 1;
  };

  const createLeave = (e) => {
    e.preventDefault();

    if (new Date(form.endDate) < new Date(form.startDate)) {
      alert("End date cannot be before start date.");
      return;
    }

    const selectedStaff = staff.find(
      (person) => person.id === form.staffId
    );

    if (!selectedStaff) {
      alert("Please select a staff member.");
      return;
    }

    const record = {
      id: `LV${Date.now()}`,
      staffId: selectedStaff.id,
      staffName: selectedStaff.name,
      department: selectedStaff.department,
      type: form.type,
      startDate: form.startDate,
      endDate: form.endDate,
      days: calculateDays(form.startDate, form.endDate),
      reason: form.reason,
      requestDate: new Date().toISOString().split("T")[0],
      status: "Pending",
      approvedBy: "",
    };

    const updated = [...leave, record];

    setLeave(updated);
    localStorage.setItem("leave", JSON.stringify(updated));

    setForm({
      staffId: "",
      type: "Annual Leave",
      startDate: "",
      endDate: "",
      reason: "",
    });

    setShowModal(false);
  };

  const updateStatus = (id, status) => {
    const updated = leave.map((item) =>
      item.id === id
        ? {
            ...item,
            status,
            approvedBy: "Administrator",
            approvalDate: new Date()
              .toISOString()
              .split("T")[0],
          }
        : item
    );

    setLeave(updated);
    localStorage.setItem("leave", JSON.stringify(updated));
  };

  const deleteLeave = (id) => {
    if (!window.confirm("Delete this leave record?")) return;

    const updated = leave.filter((item) => item.id !== id);

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

        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-calendar-plus"></i> New Leave Request
        </button>
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
                      <span
                        className={`badge-status ${item.status}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      {item.status === "Pending" && (
                        <>
                          <button
                            className="btn btn-sm btn-success me-1"
                            onClick={() =>
                              updateStatus(item.id, "Approved")
                            }
                          >
                            <i className="bi bi-check"></i>
                          </button>

                          <button
                            className="btn btn-sm btn-warning me-1"
                            onClick={() =>
                              updateStatus(item.id, "Rejected")
                            }
                          >
                            <i className="bi bi-x"></i>
                          </button>
                        </>
                      )}

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteLeave(item.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="custom-modal">
            <div className="modal-header">
              <h5>New Vacation / Leave Request</h5>

              <button
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>

            <form onSubmit={createLeave}>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Staff Member</label>

                  <select
                    className="form-select"
                    required
                    value={form.staffId}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        staffId: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Staff</option>

                    {staff.map((person) => (
                      <option key={person.id} value={person.id}>
                        {person.id} - {person.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label>Leave Type</label>

                  <select
                    className="form-select"
                    value={form.type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        type: e.target.value,
                      })
                    }
                  >
                    <option>Annual Leave</option>
                    <option>Vacation</option>
                    <option>Sick Leave</option>
                    <option>Maternity Leave</option>
                    <option>Paternity Leave</option>
                    <option>Emergency Leave</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label>Start Date</label>

                    <input
                      type="date"
                      required
                      className="form-control"
                      value={form.startDate}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          startDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label>End Date</label>

                    <input
                      type="date"
                      required
                      className="form-control"
                      value={form.endDate}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          endDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {form.startDate && form.endDate && (
                  <div className="alert alert-info mt-3">
                    <i className="bi bi-calendar3"></i>{" "}
                    Total Leave Days:{" "}
                    <strong>
                      {calculateDays(
                        form.startDate,
                        form.endDate
                      )}
                    </strong>
                  </div>
                )}

                <div className="mt-3">
                  <label>Reason</label>

                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter reason for leave..."
                    value={form.reason}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        reason: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-primary">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VacationLeave;