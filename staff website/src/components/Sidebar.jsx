import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ open }) {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "bi-speedometer2",
    },
    {
      name: "Staff",
      path: "/staff",
      icon: "bi-people",
    },
    {
      name: "Announcement",
      path: "/announcement",
      icon: "bi-megaphone",
    },
    {
      name: "Vacation & Leave",
      path: "/vacation-leave",
      icon: "bi-calendar-heart",
    },
    {
      name: "Departments",
      path: "/departments",
      icon: "bi-building",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "bi-gear",
    },
  ];

  return (
    <aside className={`sidebar ${open ? "" : "sidebar-hidden"}`}>
      <div className="sidebar-brand">
        <i className="bi bi-person-workspace"></i>

        <span>StaffSystem</span>
      </div>

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

      <div className="sidebar-footer">
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/login";
          }}
        >
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
