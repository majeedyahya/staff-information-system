import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";

function UserLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="user-layout">
      <UserSidebar open={sidebarOpen} />

      <div className={`user-main ${sidebarOpen ? "" : "full-width"}`}>
        <UserNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="user-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default UserLayout;
