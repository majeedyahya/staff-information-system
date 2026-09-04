import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function UserProtectedRoute() {
  const isLoggedIn =
    localStorage.getItem("userLoggedIn") === "true";

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/user/login"
        replace
      />
    );
  }

  return <Outlet />;
}

export default UserProtectedRoute;