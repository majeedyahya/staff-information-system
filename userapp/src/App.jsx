import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/UserRegister";

import UserLogin from "./pages/UserLogin";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import UserLeave from "./pages/UserLeave";
import RequestLeave from "./pages/RequestLeave";
import UserNotifications from "./pages/UserNotification";
import Settings from "./pages/Setting";

import UserLayout from "./components/UserLayout";
import UserProtectedRoute from "./components/UserProtectedRoute";

const THEME_KEY = "userTheme";

function getSavedTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  return ["light", "dark", "system"].includes(savedTheme) ? savedTheme : "light";
}

function App() {
  const [theme, setTheme] = useState(getSavedTheme);

  useEffect(() => {
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      document.documentElement.dataset.theme =
        theme === "system" && colorScheme.matches ? "dark" : theme === "system" ? "light" : theme;
    };

    applyTheme();
    localStorage.setItem(THEME_KEY, theme);
    colorScheme.addEventListener("change", applyTheme);
    return () => colorScheme.removeEventListener("change", applyTheme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>

        {/* User Login */}
        <Route path="/user/login" element={<UserLogin />} />

         <Route path="/register" element={<Register />} />

        {/* Protected User Routes */}
        <Route element={<UserProtectedRoute />}>
          <Route element={<UserLayout />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />

            <Route path="/user/profile" element={<UserProfile />} />

            <Route path="/user/leave" element={<UserLeave />} />

            <Route path="/user/request-leave" element={<RequestLeave />} />

            <Route path="/user/notifications" element={<UserNotifications />} />
            <Route
              path="/user/settings"
              element={<Settings theme={theme} onThemeChange={setTheme} />}
            />
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
