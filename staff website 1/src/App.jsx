import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UserLogin from "./pages/UserLogin";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import UserLeave from "./pages/UserLeave";
import RequestLeave from "./pages/RequestLeave";
import UserNotifications from "./pages/UserNotification";

import UserLayout from "./components/UserLayout";
import UserProtectedRoute from "./components/UserProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Login */}
        <Route path="/user/login" element={<UserLogin />} />

        {/* Protected User Routes */}
        <Route element={<UserProtectedRoute />}>
          <Route element={<UserLayout />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />

            <Route path="/user/profile" element={<UserProfile />} />

            <Route path="/user/leave" element={<UserLeave />} />

            <Route path="/user/request-leave" element={<RequestLeave />} />

            <Route path="/user/notifications" element={<UserNotifications />} />
          </Route>
        </Route>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/user/login" replace />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/user/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
