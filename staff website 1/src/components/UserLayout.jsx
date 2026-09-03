import React from "react";
import { Outlet } from "react-router-dom";

import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";

function UserLayout() {
  return (
    <div className="user-layout">

      <UserSidebar />

      <div className="user-main">

        <UserNavbar />

        <main className="user-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default UserLayout;