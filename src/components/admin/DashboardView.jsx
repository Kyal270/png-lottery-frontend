import React, { useState, useEffect } from "react"; // 🌟 useEffect ကို ထပ်ထည့်ပါ
import toast from "react-hot-toast";
import axios from "axios"; // 🌟 API ခေါ်ရန်
import DrawTab from "./DrawTab";

const DashboardView = () => {
  // ... (အရင် State တွေ အတိုင်းပဲ) ...
  const [drawId, setDrawId] = useState("");
  const [winningNumber, setWinningNumber] = useState("");
  const [declaredNumber, setDeclaredNumber] = useState(null); 
  const [activeSubTab, setActiveSubTab] = useState("explorer"); 
  const [search, setSearch] = useState({ user: "", num: "", draw: "" });
  const fetchNextDrawId = async () => {
    try {
      const adminToken = localStorage.getItem("admin_session_token");
      const response = await axios.get("https://png-lottery-api.onrender.com/api/dashboard/next-draw", {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      setDrawId(response.data.next_draw_id); // State ထဲ အလိုအလျောက် ထည့်ပေးမည်
    } catch (error) {
      console.error("Failed to fetch next draw ID", error);
    }
  };

  // 🌟 Dashboard စပွင့်ပွင့်ချင်း တစ်ခါတန်းခေါ်ပါမည်
  useEffect(() => {
    fetchNextDrawId();
  }, []);

  // 🌟 ၁။ Hardcoded Data အစား State အလွတ်တစ်ခု ပြောင်းသုံးပါမည်
  const [bets, setBets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🌟 ၂။ Page စတက်တာနဲ့ Backend က Data ကို လှမ်းဆွဲမည့် Effect
  useEffect(() => {
    const fetchBets = async () => {
  try {
    const adminToken = localStorage.getItem("admin_session_token"); // Token ယူပါ
    const response = await axios.get("https://png-lottery-api.onrender.com/api/dashboard/bets", {
      headers: { Authorization: `Bearer ${adminToken}` } // 🌟 Header ထည့်ပါ
    });
    setBets(response.data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBets();
  }, []);

  // 🌟 ၃။ ထီပေါက်စဉ် ကြေညာမည့် Action ကို API နှင့် ချိတ်ဆက်ခြင်း
  const handlePayout = async (authCode) => {
    if (winningNumber.length !== 3) {
      toast.error("Please enter a valid 3-digit number!");
      return;
    }

    try {
      const adminToken = localStorage.getItem("admin_session_token"); 
      const response = await axios.post("https://png-lottery-api.onrender.com/api/dashboard/payout", {
        draw_id: drawId,
        winning_number: winningNumber,
        auth_code: authCode // 🌟 Backend ဆီကို Code လှမ်းပို့ပါမည်
      }, {
        headers: { Authorization: `Bearer ${adminToken}` } 
      });

      // အောင်မြင်ပါက UI ကို Update လုပ်ပါမည်
      toast.success(response.data.message, {
        style: { background: '#10b981', color: '#fff', fontWeight: 'bold' }
      });
      setDeclaredNumber(winningNumber); 
      setWinningNumber(""); 
    } catch (error) {
      toast.error(error.response?.data?.detail || "Payout failed. Please try again.");
    }
  };

  const handleNewDraw = () => {
    // Result တွေကို ပြန်ဖျက်ပြီး Form ကို အသစ်ပြန်လုပ်မည်
    setDeclaredNumber("");
    setWinningNumber("");

    // 🌟 Frontend ကနေ ကိုယ်တိုင်မတွက်တော့ဘဲ Database ဆီကနေ အတိအကျ လှမ်းတောင်းမည်
    fetchNextDrawId(); 
  };

  const filteredBets = bets.filter(bet => {
    // Data တစ်ခုချင်းစီကို ဘေးကင်းအောင် (Safe) အရင်လုပ်ပါမည်
    const safeUser = bet.userId ? String(bet.userId).toLowerCase() : "";
    const safeNum = bet.number ? String(bet.number) : "";
    const safeDraw = bet.draw ? String(bet.draw).toLowerCase() : "";
    
    const searchUser = search.user ? search.user.toLowerCase() : "";
    const searchNum = search.num ? search.num : "";
    const searchDraw = search.draw ? search.draw.toLowerCase() : "";

    return safeUser.includes(searchUser) && 
           safeNum.includes(searchNum) && 
           safeDraw.includes(searchDraw);
  });

  const drawSpecificBets = bets.filter(bet => {
    const safeDraw = bet.draw ? String(bet.draw).toLowerCase() : "";
    const searchDraw = search.draw ? search.draw.toLowerCase() : "";
    return safeDraw.includes(searchDraw);
  });

  const exposureMap = {};
  drawSpecificBets.forEach(bet => {
    // number မရှိရင် ကျော်သွားပါမည်
    if (!bet.number) return; 
    
    if (!exposureMap[bet.number]) {
      exposureMap[bet.number] = { number: bet.number, totalAmount: 0, ticketCount: 0 };
    }
    exposureMap[bet.number].totalAmount += bet.amount || 0;
    exposureMap[bet.number].ticketCount += 1;
  });

  const sortedExposure = Object.values(exposureMap).sort((a, b) => b.totalAmount - a.totalAmount);
  const finalExposureList = search.num ? sortedExposure.filter(exp => exp.number.includes(search.num)) : sortedExposure;

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
      
      {/* 🌟 Draw Section (အကုန်လုံးကို DrawTab ထဲတွင် စုစည်းထားသည်) */}
      <DrawTab 
        drawId={drawId} 
        setDrawId={setDrawId} 
        winningNumber={winningNumber} 
        setWinningNumber={setWinningNumber} 
        handlePayout={handlePayout}
        declaredNumber={declaredNumber}
        handleNewDraw={handleNewDraw}
      />

      {/* 🌟 Tabbed Data Section */}
      <div className="glass-card rounded-[2.5rem] p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
                <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Select Draw:</span>
                <input type="text" className="glass-input w-[160px] text-center font-bold text-amber-400 border-amber-500/30 uppercase" value={search.draw} onChange={e => setSearch({...search, draw: e.target.value})} />
            </div>
            <div className="flex bg-slate-950/50 p-1.5 rounded-2xl border border-white/5">
                <button onClick={() => setActiveSubTab("explorer")} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeSubTab === "explorer" ? "bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.3)]" : "text-slate-400 hover:text-white"}`}><i className="fa-solid fa-list"></i> Bets Explorer</button>
                <button onClick={() => setActiveSubTab("exposure")} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeSubTab === "exposure" ? "bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]" : "text-slate-400 hover:text-white"}`}><i className="fa-solid fa-fire"></i> Number Exposure</button>
            </div>
        </div>

        {activeSubTab === "explorer" && (
            <div className="animate-fade-in">
                <div className="flex gap-3 mb-5">
                    <input type="text" placeholder="Search User ID..." className="glass-input flex-1" value={search.user} onChange={e => setSearch({...search, user: e.target.value})} />
                    <input type="text" placeholder="Number..." className="glass-input w-[150px]" value={search.num} onChange={e => setSearch({...search, num: e.target.value})} />
                </div>
                <div className="glass-table-container">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead>
                            <tr>
                              <th className="glass-th">User ID</th>
                              <th className="glass-th">Draw Number</th>
                              <th className="glass-th">Number</th>
                              <th className="glass-th">Amount (PGK)</th>
                              <th className="glass-th">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredBets.length === 0 ? (
                                <tr><td colSpan="4" className="glass-td text-center text-slate-500">No bets match criteria.</td></tr>
                            ) : (
                                filteredBets.map(bet => (
                                <tr key={bet.id} className="glass-tr">
                                    <td className="glass-td font-medium text-slate-200">{bet.userId}</td>
                                    <td className="glass-td font-medium text-slate-200"><span className="draw-badge text-[10px] px-2 py-1">{bet.draw}</span></td>
                                    <td className="glass-td text-amber-400 font-black text-lg">{bet.number}</td>
                                    <td className="glass-td text-emerald-400 font-bold">{bet.amount.toLocaleString()}</td>
                                    <td className="glass-td text-slate-400 text-xs font-mono">{bet.time}</td>
                                </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {activeSubTab === "exposure" && (
            <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-5">
                    <p className="text-slate-400 text-sm">Exposure for <strong className="text-amber-400">{search.draw}</strong></p>
                    <input type="text" placeholder="Filter Number..." className="glass-input w-[200px] border-purple-500/30 focus:border-purple-400" value={search.num} onChange={e => setSearch({...search, num: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {finalExposureList.length === 0 ? (
                        <div className="col-span-full glass-td text-center border border-white/5 rounded-2xl bg-slate-950/30">No bets yet.</div>
                    ) : (
                        finalExposureList.map((exp, index) => (
                            <div key={index} className="bg-slate-950/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-center items-center relative overflow-hidden hover:border-purple-500/50 transition-colors group">
                                {index === 0 && !search.num && <div className="absolute top-0 w-full h-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>}
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Number</span>
                                <h4 className={`text-3xl font-black m-0 mb-3 tracking-[0.2em] ${index === 0 && !search.num ? 'text-red-400' : 'text-amber-400'}`}>{exp.number}</h4>
                                <div className="w-full border-t border-white/10 pt-2 flex justify-between items-center">
                                    <span className="text-xs text-slate-400">x{exp.ticketCount}</span>
                                    <span className="text-sm font-bold text-emerald-400">{exp.totalAmount.toLocaleString()} <span className="text-[10px] text-slate-500">PGK</span></span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default DashboardView;
