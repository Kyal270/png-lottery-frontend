// src/components/admin/AdminLayout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminLayout = ({ children, activeTab, setActiveTab }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_session_token");
    sessionStorage.removeItem("user_role");
    
    toast.success("System Logged Out. Goodbye Master!");
    window.location.href =("/admin/login");
  };

  const menuItems = [
    { id: "dashboard", icon: "fa-house", label: "Home", color: "text-amber-400" },
    { id: "pending", icon: "fa-download", label: "Deposits", color: "text-sky-400" },
    { id: "withdrawals", icon: "fa-upload", label: "Withdraws", color: "text-orange-500" },
    { id: "winners", icon: "fa-trophy", label: "Winners", color: "text-emerald-500" },
    { id: "history", icon: "fa-clock-rotate-left", label: "History", color: "text-slate-400" },
    { id: "financials", icon: "fa-chart-pie", label: "Financials", color: "text-purple-500" },
    { id: "usersearch", icon: "fa-users-viewfinder", label: "Users", color: "text-teal-500" },
  ];

  return (
    <div className="min-h-screen text-slate-50 font-sans pb-20 pt-24">
      
      {/* Fixed Top Header (h-16 မှ h-20 သို့ Logo နေရာဆန့်ရန် ပြင်ထားပါသည်) */}
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-20 glass-card shadow-2xl border-b border-white/10 flex justify-between items-center px-4 sm:px-6 z-50 rounded-b-[2rem]">
        
        {/* 🌟 ညီကို လိုချင်သော Glass Box Logo Section 🌟 */}
        <div className="flex flex-col items-center justify-center px-5 py-2.5 rounded-2xl glass-card border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)] relative overflow-hidden group">
          
          {/* အပေါ်ကနေ ဖြာကျနေတဲ့ အလင်းရောင် Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-2 bg-amber-500/50 blur-[10px] group-hover:bg-amber-400/80 transition-all duration-500"></div>

          <h1 className="text-lg sm:text-xl font-black text-white tracking-widest drop-shadow-md uppercase m-0 leading-none">
            PNG <span className="text-amber-400">3D</span>
          </h1>
          
          <div className="flex items-center gap-2 mt-1.5">
            <h2 className="text-[9px] sm:text-[10px] font-bold text-slate-200 tracking-[0.4em] uppercase m-0 drop-shadow-sm">
              Lottery
            </h2>
            {/* 🛡️ Admin Badge ကို Lottery စာသားဘေးတွင် ကပ်ထည့်ထားပါသည် */}
            
          </div>
          
        </div>
        <span className="text-[27px] font-black uppercase tracking-widest bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30 leading-none flex items-center gap-1">
              <i className="fa-solid fa-shield-halved text-[6px]"></i> Admin Portal
            </span>
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="bg-red-500/10 text-red-500 border border-red-500/30 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all flex items-center gap-2"
        >
          <i className="fa-solid fa-power-off"></i> <span className="hidden sm:inline">Logout</span>
        </button>
      </header>

      {/* Main Content Wrapper */}
      <main className="max-w-5xl mx-auto px-4">
        
        {/* Premium Menu Grid (Glowing Buttons) */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-amber-400 text-slate-900 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.5)] scale-95"
                  : "glass-card hover:bg-white/5 hover:border-amber-400/50 text-slate-400"
              }`}
            >
              <i className={`fa-solid ${item.icon} text-2xl mb-1.5 ${activeTab === item.id ? 'text-slate-900' : item.color}`}></i>
              <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>

        {/* View Component နေရာ */}
        {children}
      </main>

      {/* Live Clock */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 glass-card px-5 py-2.5 rounded-full text-amber-400 text-xs font-bold whitespace-nowrap z-50 border border-white/10 shadow-2xl tracking-wider">
        📅 {currentTime.toLocaleDateString('en-GB')} <span className="mx-2 text-slate-500">|</span> ⏰ {currentTime.toLocaleTimeString('en-US')}
      </div>
    </div>
  );
};

export default AdminLayout;
