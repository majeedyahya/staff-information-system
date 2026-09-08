import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();

  return (
    <nav className="top-navbar">
      <div className="d-flex align-items-center">
        <button className="menu-button" onClick={onMenuClick}>
          <i className="bi bi-list"></i>
        </button>

        <div className="page-title">Staff Information System</div>
      </div>

      <div className="navbar-right">
        <button
          type="button"
          className="notification-btn"
          onClick={() => navigate("/vacation-leave")}
          aria-label="Review leave notifications"
        >
          <i className="bi bi-bell"></i>
          <span></span>
        </button>

        <div className="admin-profile">
          <div className="admin-avatar">A</div>

          <div className="admin-info">
            <strong>Administrator</strong>
            <small>System Admin</small>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
