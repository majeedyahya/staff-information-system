import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function UserSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userName");

    navigate("/user/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: "bi-speedometer2",
      path: "/user/dashboard",
    },
    {
      name: "My Profile",
      icon: "bi-person",
      path: "/user/profile",
    },
    {
      name: "My Leave",
      icon: "bi-calendar-check",
      path: "/user/leave",
    },
    {
      name: "Request Leave",
      icon: "bi-calendar-plus",
      path: "/user/request-leave",
    },
    {
      name: "Notifications",
      icon: "bi-bell",
      path: "/user/notifications",
    },
  ];

  return (
    <aside className="user-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <i className="bi bi-building"></i>
        </div>

        <div>
          <h5 className="mb-0">User Portal</h5>

          <small>Employee System</small>
        </div>
      </div>

      {/* Menu */}
      <div className="sidebar-menu">
        <p className="menu-title">MAIN MENU</p>

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className={`bi ${item.icon}`}></i>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Logout */}
      <div className="sidebar-bottom">
        <button className="sidebar-link logout-button" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default UserSidebar;
