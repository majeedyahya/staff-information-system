import React, { useState } from "react";

function RequestLeave() {
  const [form, setForm] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.leaveType ||
      !form.startDate ||
      !form.endDate ||
      !form.reason
    ) {
      alert("Please complete all fields.");
      return;
    }

    alert(
      "Leave request submitted successfully!"
    );

    setForm({
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    });
  };

  return (
    <div>

      <div className="page-heading mb-4">

        <h3 className="fw-bold">
          Request Leave
        </h3>

        <p className="text-muted">
          Submit a new leave request for approval.
        </p>

      </div>

      <div className="row">

        <div className="col-lg-8">

          <div className="content-card">

            <form onSubmit={handleSubmit}>

              {/* Leave Type */}
              <div className="mb-3">

                <label className="form-label fw-semibold">
                  Leave Type
                </label>

                <select
                  name="leaveType"
                  className="form-select"
                  value={form.leaveType}
                  onChange={handleChange}
                >
                  <option value="">
                    Select leave type
                  </option>

                  <option value="Annual Leave">
                    Annual Leave
                  </option>

                  <option value="Sick Leave">
                    Sick Leave
                  </option>

                  <option value="Emergency Leave">
                    Emergency Leave
                  </option>

                  <option value="Maternity Leave">
                    Maternity Leave
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

              <div className="row g-3">

                {/* Start Date */}
                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    className="form-control"
                    value={form.startDate}
                    onChange={handleChange}
                  />

                </div>

                {/* End Date */}
                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    End Date
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    className="form-control"
                    value={form.endDate}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* Reason */}
              <div className="mt-3 mb-4">

                <label className="form-label fw-semibold">
                  Reason
                </label>

                <textarea
                  name="reason"
                  rows="5"
                  className="form-control"
                  placeholder="Enter reason for leave..."
                  value={form.reason}
                  onChange={handleChange}
                ></textarea>

              </div>

              <button
                type="submit"
                className="btn btn-primary"
              >
                <i className="bi bi-send me-2"></i>
                Submit Request
              </button>

            </form>

          </div>

        </div>

        {/* Leave Balance */}
        <div className="col-lg-4">

          <div className="content-card">

            <h5 className="fw-bold mb-4">
              Leave Balance
            </h5>

            <div className="balance-item">

              <div className="d-flex justify-content-between">
                <span>
                  Annual Leave
                </span>

                <strong>
                  18 days
                </strong>
              </div>

              <div className="progress mt-2">
                <div
                  className="progress-bar"
                  style={{ width: "60%" }}
                ></div>
              </div>

            </div>

            <div className="balance-item">

              <div className="d-flex justify-content-between">
                <span>
                  Sick Leave
                </span>

                <strong>
                  8 days
                </strong>
              </div>

              <div className="progress mt-2">
                <div
                  className="progress-bar bg-success"
                  style={{ width: "80%" }}
                ></div>
              </div>

            </div>

            <div className="balance-item">

              <div className="d-flex justify-content-between">
                <span>
                  Emergency
                </span>

                <strong>
                  4 days
                </strong>
              </div>

              <div className="progress mt-2">
                <div
                  className="progress-bar bg-warning"
                  style={{ width: "40%" }}
                ></div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RequestLeave;