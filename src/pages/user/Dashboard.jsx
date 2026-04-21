// src/pages/user/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"; // 🌟 Axios ထည့်ထားပါသည်

import HomeTab from "../../components/HomeTab";
import TicketsTab from "../../components/TicketsTab";
import HistoryTab from "../../components/HistoryTab";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const storedUsername = localStorage.getItem("username") || "Loading...";
  const [wallet, setWallet] = useState({ username: storedUsername, balance: 0.00, currency: "PGK" });
  const [tickets, setTickets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastDraw, setLastDraw] = useState(null);

  useEffect(() => {
    // 🌟 API မှ Data များ လှမ်းယူခြင်း 🌟
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("app_session_token"); 

        if (!token) {
          navigate("/");
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/user-auth/dashboard-data", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setWallet(response.data.wallet);
        setTickets(response.data.tickets);
        setTransactions(response.data.transactions);
        setLastDraw(response.data.last_draw);
      } catch (error) {
        console.error("Dashboard Error:", error);
        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          localStorage.clear();
          navigate("/");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out! Goodbye Master! 👋");
    navigate("/");
  };

  if (isLoading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center font-black text-amber-400 tracking-widest uppercase">Syncing Server...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans relative overflow-x-hidden">
      
      <div className="absolute top-[-5%] left-[-10%] w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <header className="w-full flex flex-col items-center pt-8 pb-4 px-4 z-40">
        <div className="w-full max-w-md p-8 rounded-[2.5rem] glass-card border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)] relative overflow-hidden group text-center animate-fade-in">
          
          {/* Top Light Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-3 bg-amber-500/50 blur-[20px] group-hover:bg-amber-400/80 transition-all duration-500"></div>

          {/* Logo Section */}
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-widest drop-shadow-md uppercase m-0 leading-none">
            PNG <span className="text-amber-400">3D</span>
          </h1>
          <h2 className="text-lg sm:text-xl font-bold text-slate-200 tracking-[0.4em] uppercase mt-2 drop-shadow-sm">
            Lottery
          </h2>

          {/* 🌟 Action Buttons (Logout & Profile) 🌟 */}
          <div className="absolute top-6 right-6 flex flex-col gap-3">
            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              title="Logout"
              className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all active:scale-90"
            >
              <i className="fa-solid fa-power-off"></i>
            </button>

            {/* Profile Button */}
            <button 
              onClick={() => navigate("/profile")}
              title="View Profile"
              className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center hover:bg-teal-500 hover:text-slate-900 hover:shadow-[0_0_15px_rgba(45,212,191,0.4)] transition-all active:scale-90"
            >
              <i className="fa-solid fa-user"></i>
            </button>
          </div>

        </div>
      </header>

      {/* Main Tabs */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-2 pb-32 z-10">
        <div className="animate-fade-in">
          {activeTab === "home" && <HomeTab wallet={wallet} lastDraw={lastDraw} />}
          {activeTab === "tickets" && <TicketsTab tickets={tickets} />}
          {activeTab === "history" && <HistoryTab transactions={transactions} />}
        </div>
      </main>

      {/* Bottom Menu */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex justify-between p-2 z-50">
        <button onClick={() => setActiveTab("home")} className={`flex-1 flex flex-col items-center justify-center py-3 rounded-2xl transition-all duration-300 ${activeTab === 'home' ? 'bg-amber-400 text-slate-900 shadow-[0_0_20px_rgba(245,158,11,0.4)]' : 'text-slate-400 hover:text-amber-400'}`}>
           <i className="fa-solid fa-house-chimney text-lg mb-1"></i>
           <span className="text-[9px] font-black uppercase tracking-widest">Home</span>
        </button>
        <button onClick={() => setActiveTab("tickets")} className={`flex-1 flex flex-col items-center justify-center py-3 rounded-2xl transition-all duration-300 ${activeTab === 'tickets' ? 'bg-amber-400 text-slate-900 shadow-[0_0_20px_rgba(245,158,11,0.4)]' : 'text-slate-400 hover:text-amber-400'}`}>
           <i className="fa-solid fa-ticket text-lg mb-1"></i>
           <span className="text-[9px] font-black uppercase tracking-widest">Tickets</span>
        </button>
        <button onClick={() => setActiveTab("history")} className={`flex-1 flex flex-col items-center justify-center py-3 rounded-2xl transition-all duration-300 ${activeTab === 'history' ? 'bg-amber-400 text-slate-900 shadow-[0_0_20px_rgba(245,158,11,0.4)]' : 'text-slate-400 hover:text-amber-400'}`}>
           <i className="fa-solid fa-clock-rotate-left text-lg mb-1"></i>
           <span className="text-[9px] font-black uppercase tracking-widest">History</span>
        </button>
      </nav>

    </div>
  );
};

export default Dashboard;