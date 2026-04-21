import React, { useState, useEffect } from "react"; // 🌟 useEffect ကို ထပ်ထည့်ပါ
import toast from "react-hot-toast";
import axios from "axios"; // 🌟 API ခေါ်ရန်

const DepositsView = () => {
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [pendingDeposits, setPendingDeposits] = useState([]); // 🌟 အလွတ်ထားပါမည်
  const [isLoading, setIsLoading] = useState(true);

  // 🌟 ၁။ Page စတက်တာနဲ့ Backend က Data ကို လှမ်းဆွဲမည့် Effect
  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const adminToken = localStorage.getItem("admin_session_token");
        const response = await axios.get("https://png-lottery-api.onrender.com/api/deposits/pending");
        headers: { Authorization: `Bearer ${adminToken}` }
        setPendingDeposits(response.data); // Data ကို State ထဲ ထည့်ပါမည်
      } catch (error) {
        toast.error("Failed to fetch pending deposits!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDeposits();
  }, []);

  // 🌟 ၂။ Approve / Reject လုပ်မည့် Action ကို API နှင့် ချိတ်ဆက်ခြင်း
  const handleAction = async (id, action) => {
    try {
      // Backend သို့ id နှင့် action (approve/reject) လှမ်းပို့ပါမည်
      const response = await axios.post("https://png-lottery-api.onrender.com/api/deposits/action", {
        id: id,
        action: action
      });

      // Backend က အောင်မြင်ကြောင်း ပြန်ပို့မှသာ...
      if (action === "approve") {
        toast.success(response.data.message, { style: { background: '#10b981', color: '#fff', fontWeight: 'bold' } });
      } else {
        toast.error(response.data.message, { style: { background: '#ef4444', color: '#fff', fontWeight: 'bold' } });
      }
      
      // UI ပေါ်မှ အဆိုပါ စာရင်းကို ဖျက်ပစ်ပါမည်
      setPendingDeposits(pendingDeposits.filter(d => d.id !== id));

    } catch (error) {
      toast.error(`Failed to ${action} deposit. Please try again.`);
    }
  };

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
        <i className="fa-solid fa-download text-sky-400"></i> Pending Deposits
      </h3>

      {/* 🌟 glass-table-container class ကို သုံးလိုက်ပါပြီ */}
      <div className="glass-table-container">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-950/60 text-slate-300">
            <tr>
              {/* 🌟 glass-th class ကို သုံးလိုက်ပါပြီ */}
              <th className="glass-th">User</th>
              <th className="glass-th">Amount (PGK)</th>
              <th className="glass-th">Bank & Ref ID</th>
              <th className="glass-th">Receipt</th>
              <th className="glass-th text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {pendingDeposits.length === 0 ? (
              <tr><td colSpan="5" className="glass-td text-center text-slate-500 font-medium">No pending deposits.</td></tr>
            ) : (
              pendingDeposits.map(req => (
                /* 🌟 glass-tr class ကို သုံးလိုက်ပါပြီ */
                <tr key={req.id} className="glass-tr">
                  {/* 🌟 glass-td class များကို သုံးလိုက်ပါပြီ */}
                  <td className="glass-td">
                    <p className="font-bold text-slate-200 text-base">{req.username}</p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">{req.time}</p>
                  </td>
                  <td className="glass-td font-black text-sky-400 text-lg">+{req.amount.toLocaleString()}</td>
                  <td className="glass-td">
                    <span className="bg-slate-900/80 border border-white/10 text-slate-300 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-inner">{req.bankName}</span>
                    <p className="text-xs text-slate-400 mt-2 font-mono tracking-widest">Ref: {req.refId}</p>
                  </td>
                  <td className="glass-td">
                    <button onClick={() => setSelectedReceipt(req.receiptUrl)} className="flex items-center gap-1.5 bg-slate-950/50 hover:bg-white/10 text-slate-200 px-4 py-2 rounded-xl text-xs font-bold transition-colors border border-white/10 shadow-sm">
                      <i className="fa-solid fa-image text-sky-400"></i> View
                    </button>
                  </td>
                  <td className="glass-td text-center space-x-3">
                    {/* 🌟 btn-approve နှင့် btn-reject ကို သုံးလိုက်ပါပြီ */}
                    <button onClick={() => handleAction(req.id, "approve")} className="btn-approve">Approve</button>
                    <button onClick={() => handleAction(req.id, "reject")} className="btn-reject">Reject</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🖼️ Premium Glass Receipt Modal (ဒီဇိုင်း မပြောင်းဘဲ ထိန်းထားပါသည်) */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in" onClick={() => setSelectedReceipt(null)}>
          <div className="relative max-w-md w-full glass-card p-3 rounded-[2rem] shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedReceipt(null)} className="absolute -top-4 -right-4 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:scale-110 transition-transform">
              <i className="fa-solid fa-times text-lg"></i>
            </button>
            <img src={selectedReceipt} alt="Transfer Receipt" className="w-full h-auto rounded-[1.5rem] object-contain max-h-[80vh]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositsView;
