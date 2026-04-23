import React, { useState, useEffect } from "react"; // 🌟 useEffect ကို ထပ်ထည့်ပါ
import axios from "axios"; // 🌟 API ခေါ်ရန်
import toast from "react-hot-toast";
import { getStatusBadge } from "../../utils/helpers"; 

const HistoryView = () => {
  const [searchUser, setSearchUser] = useState("");
  const [filterType, setFilterType] = useState("All");

  // 🌟 ၁။ Hardcoded Data အစား State အလွတ်တစ်ခု ပြောင်းသုံးပါမည်
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🌟 ၂။ Page စတက်တာနဲ့ Backend က Data ကို လှမ်းဆွဲမည့် Effect
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // 🌟 Admin Token ကို ယူပါမည်
        const adminToken = sessionStorage.getItem("admin_session_token"); 

        // 🌟 URL လမ်းကြောင်းသေချာစစ်ပါ (Admin Route ဖြစ်ရန်) နှင့် Token တွဲပို့ပါ
        const response = await axios.get("https://png-lottery-api.onrender.com/api/history/all", {
          headers: { Authorization: `Bearer ${adminToken}` }
        });
        
        setHistory(response.data); 
      } catch (error) {
        toast.error("Failed to fetch history data!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // 🌟 ၃။ Frontend Filtering Logic (လုံးဝ မပြောင်းလဲပါ၊ ဆက်လက်ထိန်းသိမ်းထားသည်)
  const filteredHistory = history.filter(h => {
    const matchUser = h.userId.toLowerCase().includes(searchUser.toLowerCase());
    const matchType = filterType === "All" || h.type === filterType;
    return matchUser && matchType;
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] animate-pulse">
        <i className="fa-solid fa-circle-notch fa-spin text-5xl text-sky-500 mb-4 drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]"></i>
        <h3 className="text-slate-400 font-black uppercase tracking-[0.3em] text-sm">Loading Data...</h3>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-[2.5rem] p-8 animate-fade-in relative">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 m-0">
        <i className="fa-solid fa-clock-rotate-left text-slate-400"></i> System Master History
      </h3>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input 
            type="text" 
            placeholder="Search User ID..." 
            className="glass-input flex-1" 
            value={searchUser} 
            onChange={e => setSearchUser(e.target.value)} 
        />
        <select 
            className="glass-input sm:w-[220px] cursor-pointer" 
            value={filterType} 
            onChange={e => setFilterType(e.target.value)}
        >
          <option value="All">All Transactions</option>
          <option value="Deposit">Deposits Only</option>
          <option value="Withdrawal">Withdrawals Only</option>
          <option value="Bet">Bets Only</option>
          <option value="Win">Payouts/Wins Only</option>
        </select>
      </div>

      <div className="glass-table-container">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr>
              <th className="glass-th">User ID</th>
              <th className="glass-th">Type</th>
              <th className="glass-th">Amount (PGK)</th>
              <th className="glass-th">Status</th>
              <th className="glass-th">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length === 0 ? (
              <tr><td colSpan="5" className="glass-td text-center text-slate-500 font-medium">No records found.</td></tr>
            ) : (
              filteredHistory.map(h => (
                <tr key={h.id} className="glass-tr">
                  <td className="glass-td font-bold text-slate-200 text-base">{h.userId}</td>
                  <td className={`glass-td font-bold uppercase text-xs tracking-wider ${
                    h.type === 'Win' ? 'text-yellow-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.3)]' : 
                    h.type === 'Withdrawal' ? 'text-orange-400' : 
                    h.type === 'Bet' ? 'text-slate-400' : 'text-emerald-400'
                  }`}>
                    {h.type}
                  </td>
                  <td className={`glass-td font-black text-lg ${
                    h.status === 'Rejected' ? 'line-through text-slate-500 decoration-red-500/50 decoration-2' : 
                    h.type === 'Win' ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]' : 
                    h.type === 'Withdrawal' ? 'text-orange-400' : 
                    h.type === 'Bet' ? 'text-slate-400' : 'text-sky-400'
                  }`}>
                    {h.type === 'Withdrawal' || h.type === 'Bet' ? '-' : '+'}{h.amount.toLocaleString()}
                  </td>
                  {/* 🌟 Import လုပ်ထားသော getStatusBadge ကို ဤနေရာတွင် သုံးထားသည် */}
                  <td className="glass-td">{getStatusBadge(h.status)}</td>
                  <td className="glass-td text-xs text-slate-400 font-mono">{h.time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryView;
