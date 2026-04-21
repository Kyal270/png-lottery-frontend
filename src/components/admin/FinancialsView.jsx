import React, { useState, useEffect } from "react"; // 🌟 useEffect ကို ထပ်ထည့်ပါ
import axios from "axios"; // 🌟 API ခေါ်ရန်
import toast from "react-hot-toast";

const FinancialsView = () => {
  const [searchDraw, setSearchDraw] = useState("");

  // 🌟 ၁။ Hardcoded Data များကို အလွတ် (Default Data) များဖြင့် အစားထိုးခြင်း
  const [summary, setSummary] = useState({ totalDeposits: 0, totalWithdrawals: 0 });
  const [rounds, setRounds] = useState([]);
  const [activeBets, setActiveBets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🌟 ၂။ Page စတက်တာနဲ့ Backend က Data ကို လှမ်းဆွဲမည့် Effect
  useEffect(() => {
    const fetchFinancials = async () => {
      try {
        const adminToken = localStorage.getItem("admin_session_token"); // နာမည်လွဲနေရင် ပြင်ပါ
        
        // 🌟 headers ကို axios ရဲ့ ဒုတိယ parameter အဖြစ် ထည့်ပေးပါ
        const response = await axios.get("http://127.0.0.1:8000/api/financials/overview", {
          headers: { Authorization: `Bearer ${adminToken}` }
        });
        
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
  }, []);

  // 🌟 ၃။ Logic များ (Backend က Data ဝင်လာသည်နှင့် အလိုအလျောက် အလုပ်လုပ်မည်)
  const filteredBets = searchDraw 
    ? activeBets.filter(bet => bet.draw.toLowerCase() === searchDraw.toLowerCase())
    : activeBets; // 🌟 ဤနေရာတွင် [] အစား activeBets ဟု ပြောင်းလိုက်ပါ (ဘာမှမရှာထားရင် အကုန်ပြရန်)
    
  const totalVolume = filteredBets.reduce((sum, bet) => sum + bet.amount, 0);

  const getProfitStyle = (amount) => {
    if (amount > 0) return "text-emerald-400";
    if (amount < 0) return "text-red-400";
    return "text-slate-300";
  };

  const netBalance = summary.totalDeposits - summary.totalWithdrawals;

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] animate-pulse">
        <i className="fa-solid fa-circle-notch fa-spin text-5xl text-sky-500 mb-4 drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]"></i>
        <h3 className="text-slate-400 font-black uppercase tracking-[0.3em] text-sm">Loading Data...</h3>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      
      {/* 📊 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Deposits Card */}
        <div className="glass-card rounded-[2.5rem] p-8 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-colors"></div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Total Approved Deposits</p>
          <h2 className="text-3xl font-black text-sky-400 m-0">+{summary.totalDeposits.toLocaleString()} <span className="text-xs text-slate-500 font-medium">PGK</span></h2>
        </div>

        {/* Total Withdrawals Card */}
        <div className="glass-card rounded-[2.5rem] p-8 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-colors"></div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Total Approved Withdraws</p>
          <h2 className="text-3xl font-black text-orange-400 m-0">-{summary.totalWithdrawals.toLocaleString()} <span className="text-xs text-slate-500 font-medium">PGK</span></h2>
        </div>

        {/* Net Balance Card */}
        <div className="glass-card rounded-[2.5rem] p-8 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-colors"></div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">System Net Balance</p>
          <h2 className="text-3xl font-black text-purple-400 m-0">{netBalance.toLocaleString()} <span className="text-xs text-slate-500 font-medium">PGK</span></h2>
        </div>
      </div>

      {/* 🌟 Live Draw Exposure Section */}
      <div className="glass-card rounded-[2.5rem] p-8">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 m-0">
          <i className="fa-solid fa-satellite-dish text-sky-400 animate-pulse"></i> Live Draw Exposure
        </h3>
        
        <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-950/40 p-6 rounded-[1.5rem] border border-white/5">
          <div className="w-full md:w-1/3">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Target Draw ID</label>
            {/* 🌟 glass-input class ကို သုံးလိုက်ပါပြီ */}
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

        {/* 🌟 glass-table-container class ကို သုံးလိုက်ပါပြီ */}
        <div className="glass-table-container">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr>
                {/* 🌟 glass-th class များကို သုံးလိုက်ပါပြီ */}
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
                  /* 🌟 glass-tr class ကို သုံးလိုက်ပါပြီ */
                  <tr key={r.id} className="glass-tr">
                    <td className="glass-td">
                      {/* 🌟 index.css မှ draw-badge ကို သုံးထားသည် */}
                      <span className="draw-badge mb-1">{r.drawId}</span>
                      <p className="text-[10px] text-slate-500 font-mono tracking-tighter">{r.date}</p>
                    </td>
                    <td className="glass-td text-center">
                      {/* 🌟 index.css မှ win-badge ကို သုံးထားသည် */}
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
  );
};

export default FinancialsView;