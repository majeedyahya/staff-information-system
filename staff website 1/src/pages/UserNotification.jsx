import React from "react";

function UserNotifications() {
  const notifications = [
    {
      icon: "bi-check-circle",
      type: "success",
      title: "Leave Request Approved",
      message: "Your annual leave request has been approved.",
      time: "2 hours ago",
    },
    {
      icon: "bi-calendar-event",
      type: "primary",
      title: "Leave Reminder",
      message: "Your approved leave starts on September 10, 2026.",
      time: "Yesterday",
    },
    {
      icon: "bi-info-circle",
      type: "info",
      title: "Profile Update",
      message: "Please make sure your employee information is up to date.",
      time: "3 days ago",
    },
  ];

  return (
    <div>
      <div className="page-heading mb-4">
        <h3 className="fw-bold">Notifications</h3>

        <p className="text-muted">Stay updated with your account activities.</p>
      </div>

      <div className="content-card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Recent Notifications</h5>

          <button className="btn btn-sm btn-outline-primary">
            Mark all as read
          </button>
        </div>

        <div>
          {notifications.map((notification, index) => (
            <div className="notification-item" key={index}>
              <div className={`notification-icon text-${notification.type}`}>
                <i className={`bi ${notification.icon}`}></i>
              </div>

              <div className="flex-grow-1">
                <h6 className="fw-bold mb-1">{notification.title}</h6>

                <p className="text-muted mb-1">{notification.message}</p>

                <small className="text-muted">{notification.time}</small>
              </div>

              <span className="notification-dot"></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserNotifications;
