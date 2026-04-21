import React, { useState, useEffect } from "react"; // 🌟 useEffect ကို ထပ်ထည့်ပါ
import axios from "axios"; // 🌟 API ခေါ်ရန်
import toast from "react-hot-toast";

const WinnersView = () => {
  const [searchDraw, setSearchDraw] = useState("");

  // 🌟 ၁။ Hardcoded Data အစား State အလွတ်တစ်ခု ပြောင်းသုံးပါမည်
  const [winners, setWinners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🌟 ၂။ Page စတက်တာနဲ့ Backend က Data ကို လှမ်းဆွဲမည့် Effect
  useEffect(() => {
    const fetchWinners = async () => {
      try {
        // 🌟 Admin Token ကို ယူပါမည် (နာမည်လွဲနေလျှင် ပြင်ပါ)
        const adminToken = localStorage.getItem("admin_session_token"); 
        
        // 🌟 URL တွင် admin လမ်းကြောင်းဖြစ်ကြောင်း သေချာစေရန် /api/admin/winners/all ဟု ပြောင်းထားပါသည် (Backend နှင့် ချိန်ပါ)
        const response = await axios.get("https://png-lottery-api.onrender.com/api/winners/all", {
          headers: { Authorization: `Bearer ${adminToken}` } // 🌟 Token တွဲပို့ပါမည်
        });
        
        setWinners(response.data); // Backend က Data ကို State ထဲ ထည့်ပါမည်
      } catch (error) {
        toast.error("Failed to fetch winners data!");
        // Session ကုန်သွားရင် Login ပြန်ပို့ချင်ရင် ဒီမှာ ထည့်ရေးလို့ရပါတယ်
      } finally {
        setIsLoading(false);
      }
    };
    fetchWinners();
  }, []);

  // 🌟 ၃။ Frontend Filtering Logic (လုံးဝ မပြောင်းလဲပါ၊ ဆက်လက်ထိန်းသိမ်းထားသည်)
  const filteredWinners = winners.filter(w => 
    w.drawId.toLowerCase().includes(searchDraw.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] animate-pulse">
        <i className="fa-solid fa-circle-notch fa-spin text-5xl text-sky-500 mb-4 drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]"></i>
        <h3 className="text-slate-400 font-black uppercase tracking-[0.3em] text-sm">Loading Data...</h3>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-[2.5rem] p-8 animate-fade-in relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute -left-10 -top-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <h3 className="text-xl font-bold text-white m-0 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <i className="fa-solid fa-trophy text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"></i>
          </div>
          Winners Hall of Fame
        </h3>
        
        {/* 🌟 glass-input class ကို သုံးလိုက်ပါပြီ */}
        <div className="w-full sm:w-auto relative">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
          <input 
            type="text" 
            placeholder="Search Draw ID..." 
            className="glass-input pl-10 w-full sm:w-[220px] uppercase tracking-widest font-bold" 
            value={searchDraw} 
            onChange={e => setSearchDraw(e.target.value)} 
          />
        </div>
      </div>

      {/* 🌟 glass-table-container class ကို သုံးလိုက်ပါပြီ */}
      <div className="glass-table-container">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr>
              {/* 🌟 glass-th class များကို သုံးလိုက်ပါပြီ */}
              <th className="glass-th">Draw Session</th>
              <th className="glass-th">User ID</th>
              <th className="glass-th text-center">Winning Number</th>
              <th className="glass-th text-right">Payout Amount</th>
              <th className="glass-th">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredWinners.length === 0 ? (
              <tr><td colSpan="5" className="glass-td text-center text-slate-500">No winners found for this draw.</td></tr>
            ) : (
              filteredWinners.map(w => (
                /* 🌟 glass-tr class ကို သုံးလိုက်ပါပြီ */
                <tr key={w.id} className="glass-tr">
                  <td className="glass-td">
                    {/* 🌟 index.css မှ .draw-badge class ကို သုံးထားသည် */}
                    <span className="draw-badge">{w.drawId}</span>
                  </td>
                  <td className="glass-td">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">👤</div>
                      <span className="font-bold text-slate-200">{w.userId}</span>
                    </div>
                  </td>
                  <td className="glass-td text-center">
                    {/* 🌟 index.css မှ .win-badge class ကို သုံးထားသည် */}
                    <span className="win-badge">{w.winNumber}</span>
                  </td>
                  <td className="glass-td font-black text-emerald-400 text-lg text-right">
                    +{w.payout.toLocaleString()} <span className="text-[10px] text-emerald-500/50">PGK</span>
                  </td>
                  <td className="glass-td text-[11px] text-slate-500 font-mono">{w.time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WinnersView;
