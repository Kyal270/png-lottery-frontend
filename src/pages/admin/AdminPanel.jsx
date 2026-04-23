// src/pages/admin/AdminPanel.jsx
import React, { useState, useEffect } from 'react'; // 🌟 useEffect ကို Import လုပ်ပါသည်
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminLayout from "../../components/admin/AdminLayout";
import DashboardView from "../../components/admin/DashboardView";
import UserSearchView from "../../components/admin/UserSearchView";
import DepositsView from "../../components/admin/DepositsView"; 
import WithdrawalsView from "../../components/admin/WithdrawalsView";
import FinancialsView from "../../components/admin/FinancialsView";
import WinnersView from "../../components/admin/WinnersView";
import HistoryView from "../../components/admin/HistoryView";

const AdminPanel = () => {
  const navigate = useNavigate(); 
  const [activeTab, setActiveTab] = useState("dashboard");

  // 🌟 Admin Dashboard ထဲ ဝင်တာနဲ့ Token ရှိ/မရှိ စစ်မည့် အပိုင်း 🌟
  useEffect(() => {
    const checkAuth = () => {
      // ညီကို သိမ်းထားတဲ့ admin token နာမည်ကို ဒီမှာ သုံးပါ (app_session_token သို့မဟုတ် admin_session_token)
      const adminToken = sessionStorage.getItem("admin_session_token"); 
      
      if (!adminToken) {
        toast.error("Session expired! Please login again.");
        navigate("/admin/login"); // Token မရှိရင် Admin Login သို့ ပြန်ကန်ထုတ်မည်
      }
    };
    
    checkAuth();
  }, [navigate]);

  // 🌟 Logout လုပ်မည့် Function ကို ပြင်ဆင်ထားသည် 🌟
  const handleLogout = () => {
     // Token တွေဖျက်ပြီး ပြန်ထွက်မယ်
     sessionStorage.removeItem("admin_session_token"); // Token အမှန်တကယ် ဖျက်ရမည့် နေရာ
     sessionStorage.removeItem("user_role");
     toast.success("Logged out successfully");
     navigate("/admin/login");
  }

  return (
    // AdminLayout ဆီကို handleLogout လေးပါ တွဲပို့ပေးလိုက်ပါ
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
      
      {activeTab === "dashboard" && <DashboardView />}
      {activeTab === "usersearch" && <UserSearchView />}
      
      {activeTab === "pending" && <DepositsView />}
      {activeTab === "withdrawals" && <WithdrawalsView />}
      
      {activeTab === "winners" && <WinnersView />}
      {activeTab === "history" && <HistoryView />}
      
      {activeTab === "financials" && <FinancialsView />}
    </AdminLayout>
  );
};

export default AdminPanel;
