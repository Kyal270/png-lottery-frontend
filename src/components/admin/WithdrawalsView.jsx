import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const WithdrawalsView = () => {
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🌟 ၁။ Backend URL အမှန်နှင့် Token ထည့်ပေးထားသည်
  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
       const adminToken = localStorage.getItem("admin_session_token"); // နာမည်အသစ်ဖြင့် ဆွဲထုတ်မည်
       const response = await axios.get("http://127.0.0.1:8000/api/admin/transactions/pending", {
  headers: { Authorization: `Bearer ${adminToken}` }
});
        
        // Withdraw type တွေကိုပဲ စစ်ထုတ်ပါမည်
        const withdrawOnly = response.data.filter(txn => txn.type === "withdraw");
        setPendingWithdrawals(withdrawOnly);
      } catch (error) {
        toast.error("Failed to fetch pending withdrawals!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWithdrawals();
  }, []);

  // 🌟 ၂။ PUT Method နှင့် Admin Action URL အမှန်ကို သုံးထားသည်
  const handleAction = async (id, action) => {
    try {
      const adminToken = localStorage.getItem("admin_session_token");
      const response = await axios.put(`http://127.0.0.1:8000/api/admin/transaction/${id}/${action}`, {}, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });

      if (action === "approve") {
        toast.success(response.data.message || "Approved!", { style: { background: '#10b981', color: '#fff', fontWeight: 'bold' } });
      } else {
        toast.error(response.data.message || "Rejected!", { style: { background: '#ef4444', color: '#fff', fontWeight: 'bold' } });
      }
      
      setPendingWithdrawals(pendingWithdrawals.filter(w => w.id !== id));

    } catch (error) {
      toast.error(`Failed to ${action} withdrawal. Admin access required.`);
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
    <div className="glass-card rounded-[2.5rem] p-8 animate-fade-in relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 m-0">
        <i className="fa-solid fa-upload text-orange-500"></i> Pending Withdrawals
      </h3>

      <div className="glass-table-container hide-scrollbar">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr>
              <th className="glass-th">User</th>
              <th className="glass-th">Amount (PGK)</th>
              <th className="glass-th">Bank Name</th>
              <th className="glass-th">Account Name</th>
              <th className="glass-th">Account No.</th>
              <th className="glass-th text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {pendingWithdrawals.length === 0 ? (
              <tr><td colSpan="6" className="glass-td text-center text-slate-500 font-medium py-10">No pending withdrawals.</td></tr>
            ) : (
              pendingWithdrawals.map(req => (
                <tr key={req.id} className="glass-tr">
                  <td className="glass-td">
                    <p className="font-bold text-slate-200 text-base">{req.username}</p>
                    {/* 🌟 time အစား date ပြောင်းထားသည် */}
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">{req.date}</p>
                  </td>
                  
                  <td className="glass-td font-black text-orange-400 text-lg">
                    -K {req.amount.toLocaleString()}
                  </td>
                  
                  <td className="glass-td">
                    <span className="bg-slate-900/80 border border-white/10 text-amber-400 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-inner">
                      {/* 🌟 bankName အစား method ပြောင်းထားသည် */}
                      {req.method}
                    </span>
                  </td>

                  <td className="glass-td font-medium text-slate-300">
                     {/* 🌟 accountName ကို ခေါ်ထားသည် (Backend မှာ ဖြည့်ပေးရန်လိုသည်) */}
                    {req.account_name || req.username}
                  </td>

                  <td className="glass-td text-white font-mono text-base tracking-normal">
                     {/* 🌟 accountNo အစား ref ပြောင်းထားသည် */}
                    {req.ref}
                  </td>

                  <td className="glass-td text-center">
                    <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleAction(req.id, "approve")} className="btn-approve text-[11px] px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500 hover:text-white transition-all">
                        Approve
                        </button>
                        <button onClick={() => handleAction(req.id, "reject")} className="btn-reject text-[11px] px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                        Reject
                        </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawalsView;