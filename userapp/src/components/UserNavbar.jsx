import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function UserNavbar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "John Doe";

  const getPageTitle = () => {
    if (location.pathname.includes("dashboard")) {
      return "Dashboard";
    }

    if (location.pathname.includes("profile")) {
      return "My Profile";
    }

    if (location.pathname.includes("leave")) {
      return "My Leave";
    }

    if (location.pathname.includes("request-leave")) {
      return "Request Leave";
    }

    if (location.pathname.includes("notifications")) {
      return "Notifications";
    }

    return "User Portal";
  };

  return (
    <header className="user-navbar">
      <div className="d-flex align-items-center">
        <button
          className="menu-button"
          onClick={onMenuClick}
          aria-label="Toggle navigation menu"
        >
          <i className="bi bi-list"></i>
        </button>

        <div>
          <h5 className="mb-0">{getPageTitle()}</h5>

          <small className="text-muted">Staff Information System</small>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* Notification */}
        <button
          type="button"
          className="notification-button"
          onClick={() => navigate("/user/notifications")}
          aria-label="View notifications"
        >
          <i className="bi bi-bell"></i>

          <span className="notification-badge">3</span>
        </button>

        {/* User */}
        <div className="user-info">
          <div className="user-avatar">{userName.charAt(0).toUpperCase()}</div>

          <div className="d-none d-md-block">
            <strong>{userName}</strong>

            <small className="d-block text-muted">Staff</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default UserNavbar;
