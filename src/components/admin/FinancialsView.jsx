import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminBanksTab from "./AdminBanksTab"; // 🌟 ဖိုင်အသစ်ကို လှမ်းခေါ်ပါမည်

const FinancialsView = () => {
  // 🌟 Tab အတွက် State အသစ်
  const [activeTab, setActiveTab] = useState("overview"); // "overview" သို့မဟုတ် "banks"

  const [searchDraw, setSearchDraw] = useState("");
  const [summary, setSummary] = useState({ totalDeposits: 0, totalWithdrawals: 0 });
  const [rounds, setRounds] = useState([]);
  const [activeBets, setActiveBets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // VITE_API_URL မရှိရင် Local ကို Auto သုံးမည်
  const API_BASE = import.meta.env.VITE_API_URL || "https://png-lottery-api.onrender.com";

  useEffect(() => {
    const fetchFinancials = async () => {
      try {
        const adminToken = sessionStorage.getItem("admin_session_token"); 
        
        const response = await axios.get(`${API_BASE}/api/financials/overview`, {
          headers: { Authorization: `Bearer ${adminToken}` }
        }, []);
        
        setSummary(response.data.summary);
        setRounds(response.data.rounds);
        setActiveBets(response.data.activeBets);
      } catch (error) {
        toast.error("Failed to fetch financial data!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFinancials();
  }, [API_BASE]); 

  const filteredBets = searchDraw 
    ? activeBets.filter(bet => bet.draw.toLowerCase() === searchDraw.toLowerCase())
    : activeBets; 
    
  const totalVolume = filteredBets.reduce((sum, bet) => sum + bet.amount, 0);

  const getProfitStyle = (amount) => {
    if (amount > 0) return "text-emerald-400";
    if (amount < 0) return "text-red-400";
    return "text-slate-300";
  };

  const netBalance = summary.totalDeposits - summary.totalWithdrawals;

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <i className="fa-solid fa-circle-notch fa-spin text-5xl text-sky-500 mb-4"></i>
        <h3 className="text-slate-400 font-black uppercase tracking-[0.3em] text-sm animate-pulse">
          Loading Data...
        </h3>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      
      {/* 🌟 Tab Navigation Bar */}
      <div className="flex gap-2 p-1 bg-slate-950/40 border border-white/5 rounded-[1rem] w-fit">
        <button 
          onClick={() => setActiveTab("overview")} 
          className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
            activeTab === "overview" ? "bg-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]" : "text-slate-500 hover:text-white"
          }`}
        >
          <i className="fa-solid fa-chart-line mr-2"></i> Financial Overview
        </button>
        <button 
          onClick={() => setActiveTab("banks")} 
          className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
            activeTab === "banks" ? "bg-amber-500 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.3)]" : "text-slate-500 hover:text-white"
          }`}
        >
          <i className="fa-solid fa-building-columns mr-2"></i> Manage Banks
        </button>
      </div>

      {/* =========================================
          TAB 1: FINANCIAL OVERVIEW
      ========================================= */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-fade-in">
          {/* 📊 Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card rounded-[2.5rem] p-8 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-colors"></div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Total Approved Deposits</p>
              <h2 className="text-3xl font-black text-sky-400 m-0">+{summary.totalDeposits.toLocaleString()} <span className="text-xs text-slate-500 font-medium">PGK</span></h2>
            </div>
            <div className="glass-card rounded-[2.5rem] p-8 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-colors"></div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Total Approved Withdraws</p>
              <h2 className="text-3xl font-black text-orange-400 m-0">-{summary.totalWithdrawals.toLocaleString()} <span className="text-xs text-slate-500 font-medium">PGK</span></h2>
            </div>
            <div className="glass-card rounded-[2.5rem] p-8 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-colors"></div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">System Net Balance</p>
              <h2 className="text-3xl font-black text-purple-400 m-0">{netBalance.toLocaleString()} <span className="text-xs text-slate-500 font-medium">PGK</span></h2>
            </div>
          </div>

          {/* 🌟 Live Draw Exposure Section */}
          <div className="glass-card rounded-[2.5rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 m-0">
              <i className="fa-solid fa-satellite-dish text-sky-400"></i> Live Draw Exposure
            </h3>
            
            <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-950/40 p-6 rounded-[1.5rem] border border-white/5">
              <div className="w-full md:w-1/3">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Target Draw ID</label>
                <input 
                  type="text" 
                  placeholder="e.g. DRAW-001" 
                  className="glass-input text-center text-lg font-mono font-bold tracking-widest" 
                  value={searchDraw} 
                  onChange={e => setSearchDraw(e.target.value)} 
                />
              </div>

              <div className="flex-1 flex justify-around w-full border-t md:border-t-0 md:border-l border-white/5 pt-5 md:pt-0">
                <div className="text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Active Tickets</span>
                  <span className="text-3xl font-black text-white">{searchDraw ? filteredBets.length : 0}</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Total Bet Volume</span>
                  <span className="text-3xl font-black text-emerald-400">{searchDraw ? totalVolume.toLocaleString() : 0} <span className="text-xs text-emerald-500/50">PGK</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* 📈 Draw-by-Draw Profit/Loss Table */}
          <div className="glass-card rounded-[2.5rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 m-0">
              <i className="fa-solid fa-chart-pie text-purple-500"></i> Draw Performance Analysis
            </h3>
            <div className="glass-table-container">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr>
                    <th className="glass-th">Draw Session</th>
                    <th className="glass-th text-center">Result</th>
                    <th className="glass-th text-right">Inflow (+)</th>
                    <th className="glass-th text-right">Outflow (-)</th>
                    <th className="glass-th text-right">Net Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {rounds.length === 0 ? (
                    <tr><td colSpan="5" className="glass-td text-center text-slate-500">No transaction data available.</td></tr>
                  ) : (
                    rounds.map(r => (
                      <tr key={r.id} className="glass-tr">
                        <td className="glass-td py-3">
  <div className="flex flex-col gap-1.5">
    {/* 🌟 Glass-Neon Style Badge (Table Version) */}
    <div className="relative inline-flex group">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-amber-500/10 blur-md rounded-full opacity-30"></div>
      
      {/* Badge Box */}
      <div className="draw-badge relative bg-slate-900/70 border border-white/10 px-2.5 py-0.5 rounded-lg backdrop-blur-sm">
        <span className="text-[13px] font-black tracking-widest bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
          {r.drawId}
        </span>
      </div>
    </div>
  </div>
</td>
                        <td className="glass-td text-center">
                          <span className="win-badge">{r.winNumber}</span>
                        </td>
                        <td className="glass-td font-bold text-sky-400 text-right">+{r.totalReceived.toLocaleString()}</td>
                        <td className="glass-td font-bold text-orange-400 text-right">-{r.totalPaid.toLocaleString()}</td>
                        <td className={`glass-td font-black text-lg text-right ${getProfitStyle(r.profit)}`}>
                          {r.profit > 0 ? '+' : ''}{r.profit.toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          TAB 2: MANAGE BANKS (Component အသစ်)
      ========================================= */}
      {activeTab === "banks" && (
        <AdminBanksTab />
      )}

    </div>
  );
};

export default FinancialsView;
