import React, { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Staff from "./pages/Staff";
import Reports from "./pages/Reports";
import VacationLeave from "./pages/VacationLeave";

import Announcement from "./pages/Announcement";
import Departments from "./pages/Departments";
import Settings from "./pages/Settings";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app-container">
      <Sidebar open={sidebarOpen} />

      <div className={`main-content ${sidebarOpen ? "" : "full-width"}`}>
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTE */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/staff" element={<Staff />} />

          <Route path="/announcement" element={<Announcement />} />

          <Route path="/vacation-leave" element={<VacationLeave />} />

          <Route path="/attendance-history" element={<Reports />} />

          <Route path="/leave-history" element={<Reports />} />

          <Route path="/departments" element={<Departments />} />

          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* DEFAULT ROUTE */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* UNKNOWN ROUTES */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
