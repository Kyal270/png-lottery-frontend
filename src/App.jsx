// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import TitleUpdater from "./components/TitleUpdater";
import axios from "axios";

// Pages & Components Import
import UserLogin from "./pages/user/Login";
import WelcomeSpin from "./pages/user/WelcomeSpin";
import Register from "./pages/user/Register";
import Dashboard from "./pages/user/Dashboard";
import UserProfile from "./pages/user/UserProfile";
import Bet from "./pages/user/Bet";
import Deposit from "./pages/user/Deposit";
import Withdraw from "./pages/user/Withdraw";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPanel from "./pages/admin/AdminPanel";
import ProtectedRoute from "./components/admin/ProtectedRoute"; // Admin အတွက်
import UserProtectedRoute from "./components/user/UserProtectedRoute"; // User အတွက် 🌟

// Axios Interceptor: Token သက်တမ်းကုန်လျှင် ကိုယ်စီ Login ဆီ ပြန်ပို့ရန်
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.clear(); // အကုန်ဖျက်မယ် 🌟
      
      const isAdminPath = window.location.pathname.startsWith('/admin');
      
      if (isAdminPath) {
        window.location.href = "/admin-login"; // Admin ကို Admin Login သို့ 🌟
      } else {
        window.location.href = "/"; // User ကို User Login သို့ 🌟
      }
    }
    return Promise.reject(error);
  }
);

function App() {
  return (
    <Router>
      <TitleUpdater />
      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
        {/* 👤 Public Routes (Login မလိုပါ) */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* 👤 User Protected Routes (Login လိုအပ်သည်) 🌟 */}
        <Route path="/dashboard" element={<UserProtectedRoute><Dashboard /></UserProtectedRoute>} />
        <Route path="/profile" element={<UserProtectedRoute><UserProfile /></UserProtectedRoute>} />
        <Route path="/bet" element={<UserProtectedRoute><Bet /></UserProtectedRoute>} />
        <Route path="/deposit" element={<UserProtectedRoute><Deposit /></UserProtectedRoute>} />
        <Route path="/withdraw" element={<UserProtectedRoute><Withdraw /></UserProtectedRoute>} />
        <Route path="/welcome-spin" element={<UserProtectedRoute><WelcomeSpin /></UserProtectedRoute>} />

        {/* 🛡️ Admin Protected Routes (Admin Role လိုအပ်သည်) 🌟 */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />

        {/* မသိသော လမ်းကြောင်းမှန်သမျှ User Login သို့ ပို့မည် */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
