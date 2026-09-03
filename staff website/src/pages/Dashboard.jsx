import React, { useEffect, useState } from "react";

function Dashboard() {
  const [staff, setStaff] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [leave, setLeave] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    setStaff(JSON.parse(localStorage.getItem("staff")) || []);
    setAttendance(JSON.parse(localStorage.getItem("attendance")) || []);
    setLeave(JSON.parse(localStorage.getItem("leave")) || []);
    setDepartments(JSON.parse(localStorage.getItem("departments")) || []);
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const totaldepartment = attendance.filter((item) => item.date === today);
  const todayAttendance = totaldepartment;

  const present = totaldepartment.filter(
    (item) => item.status === "Present" || item.status === "Checked Out",
  ).length;

  const late = totaldepartment.filter((item) => item.status === "Late").length;

  const checkedOut = totaldepartment.filter(
    (item) => item.status === "Checked Out",
  ).length;

  const totalDepartments = departments.length;

  const activeStaff = staff.filter((s) => {
    const isOnLeave = leave.some(
      (l) =>
        l.staffId === s.id &&
        l.status === "Approved" &&
        today >= l.startDate &&
        today <= l.endDate,
    );
    return !isOnLeave;
  }).length;

  const onLeave = leave.filter(
    (item) =>
      item.status === "Approved" &&
      today >= item.startDate &&
      today <= item.endDate,
  ).length;

  // Calculate upcoming leave in next 7 days
  const todayDate = new Date(today);
  const next7DaysDate = new Date(todayDate);
  next7DaysDate.setDate(next7DaysDate.getDate() + 7);
  const next7Days = next7DaysDate.toISOString().split("T")[0];

  const upcomingLeave = leave.filter(
    (item) =>
      item.status === "Approved" &&
      item.startDate > today &&
      item.startDate <= next7Days,
  ).length;

  // Calculate new hires this month
  const currentMonth = today.substring(0, 7); // YYYY-MM
  const newHires = staff.filter((s) => {
    const joinDate = s.joinDate || "";
    return joinDate.substring(0, 7) === currentMonth;
  }).length;

  const stats = [
    {
      title: "Total Staff",
      value: staff.length,
      icon: "bi-people",
      className: "stat-blue",
    },
    {
      title: "Total Department",
      value: totalDepartments,
      icon: "bi-building",
      className: "stat-green",
    },
    {
      title: "Active Staff",
      value: activeStaff,
      icon: "bi-person-check",
      className: "stat-orange",
    },
    {
      title: "On Vacation",
      value: onLeave,
      icon: "bi-airplane",
      className: "stat-purple",
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome to your staff management system.</p>
        </div>

        <span className="date-display">
          <i className="bi bi-calendar3"></i> {new Date().toLocaleDateString()}
        </span>
      </div>

      <div className="row g-4 mb-4">
        {stats.map((stat) => (
          <div className="col-lg-3 col-md-6" key={stat.title}>
            <div className="stat-card">
              <div>
                <p>{stat.title}</p>
                <h3>{stat.value}</h3>
              </div>

              <div className={`stat-icon ${stat.className}`}>
                <i className={`bi ${stat.icon}`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card custom-card">
            <div className="card-header-custom">
              <h5>Staff Details</h5>
              <span>{staff.length} staff</span>
            </div>

            <div className="table-responsive">
              <table className="table custom-table">
                <thead>
                  <tr>
                    <th>Staff ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {staff.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No staff records found.
                      </td>
                    </tr>
                  ) : (
                    staff.slice(0, 8).map((item) => (
                      <tr key={item.id}>
                        <td>
                          <strong>{item.id}</strong>
                        </td>

                        <td>{item.name || "-"}</td>
                        <td>{item.department || "-"}</td>

                        <td>
                          <span
                            className={`badge-status ${item.status || "Active"}`}
                          >
                            {item.status || "Active"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card custom-card">
            <div className="card-header-custom">
              <h5>Quick Summary</h5>
            </div>

            <div className="summary-item">
              <i className="bi bi-calendar-event"></i>
              <div>
                <strong>{upcomingLeave}</strong>
                <span>Upcoming leave (next 7 days)</span>
              </div>
            </div>

            <div className="summary-item">
              <i className="bi bi-person-plus"></i>
              <div>
                <strong>{newHires}</strong>
                <span>New hires this month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
