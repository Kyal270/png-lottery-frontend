// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import TitleUpdater from "./components/TitleUpdater";
import axios from "axios";

// 🌟 User Pages များကို Import လုပ်ပါ
import UserLogin from "./pages/user/Login"; // 👈 ညီကို့ရဲ့ လမ်းကြောင်းအတိုင်း ပြင်ပေးထားပါတယ်
import Register from "./pages/user/Register";
import Dashboard from "./pages/user/Dashboard";
import UserProfile from "./pages/user/UserProfile";
import Bet from "./pages/user/Bet";
import Deposit from "./pages/user/Deposit";
import Withdraw from ".//pages/user/Withdraw";// 🌟 Import လုပ်ဖို့ မမေ့ပါနဲ့

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPanel from "./pages/admin/AdminPanel";
import ProtectedRoute from "./components/admin/ProtectedRoute";

axios.interceptors.response.use(
  (response) => {
    // Error မရှိရင် ပုံမှန်အတိုင်း Data ကို ဆက်ပို့ပေးမည်
    return response;
  },
  (error) => {
    // အကယ်၍ Backend မှ 401 (Unauthorized - Token ကုန်သွားခြင်း) ပြန်လာပါက
    if (error.response && error.response.status === 401) {
      
      // ၁။ Storage ထဲရှိ သက်တမ်းကုန်နေသော Token များကို ဖျက်ပစ်မည်
      localStorage.removeItem("app_session_token");
      localStorage.removeItem("admin_session_token");
      localStorage.removeItem("user_role");
      
      // ၂။ Admin Login စာမျက်နှာသို့ အတင်း ပြန်ကန်ထုတ်မည် 
      // (မှတ်ချက်: ညီကို့ရဲ့ login လမ်းကြောင်းက /admin-login ဖြစ်နေရင် အဲဒီအတိုင်း ပြောင်းရေးပေးပါ)
      window.location.href = "/admin/login"; 
    }
    
    return Promise.reject(error);
  }
);

function App() {
  return (
    <Router>
      {/* TitleUpdater နှင့် Toaster ကို တစ်ခါတည်း ထည့်ထားပါသည် */}
      <TitleUpdater />
      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
        {/* 👤 User Routes */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/bet" element={<Bet />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />

        {/* 🛡️ Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />

        {/* မှားယွင်းသော လမ်းကြောင်းများအားလုံးကို Login သို့ ပြန်ပို့ပါမည် */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;