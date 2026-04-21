// src/pages/user/Deposit.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"; // 🌟 axios ထည့်ထားပါသည်

const Deposit = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [refId, setRefId] = useState("");
  const [fileName, setFileName] = useState("No file chosen");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  const adminBanks = [
    { id: 1, name: "BSP Bank", accountName: "Lottery Master Admin", accountNo: "123-456-7890" },
    { id: 2, name: "Kina Bank", accountName: "Lottery Master Co.", accountNo: "987-654-3210" },
    { id: 3, name: "Cellmoni", accountName: "Jimmy Official", accountNo: "777-888-9999" }
  ];

  const [selectedBank, setSelectedBank] = useState(adminBanks[0]);
  const quickAmounts = [50, 100, 500, 1000];

  // 🌟 Backend သို့ Deposit Request ပို့မည့် Function 🌟
  const handleDeposit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem("app_session_token"); 
      
      // FormData တည်ဆောက်ခြင်း
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("bank", selectedBank.name);
      formData.append("ref_id", refId);
      formData.append("receipt", file); // 🌟 ပုံကို ထည့်လိုက်ပါပြီ
      
      await axios.post("https://png-lottery-api.onrender.com/api/user-auth/deposit", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" // 🌟 File ပါကြောင်း ပြောပြခြင်း
        }
      });

      toast.success("Deposit request sent! Admin will verify soon. ⏳");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to submit deposit request!");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(selectedBank.accountNo);
    toast.success(`${selectedBank.name} Account Copied!`);
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
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center font-sans pb-10 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[-5%] left-[-10%] w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Top Navbar */}
      <div className="sticky top-0 z-40 w-full flex justify-center pt-4 px-4">
        <div className="w-full max-w-md h-16 glass-card border border-white/10 shadow-2xl flex items-center px-5 rounded-2xl backdrop-blur-xl relative">
          <button onClick={() => navigate("/dashboard")} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-400 transition-all active:scale-90">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <h1 className="w-full text-center text-sm font-black text-white uppercase tracking-[0.3em]">Top Up Wallet</h1>
        </div>
      </div>

      <div className="flex-1 w-full max-w-md px-4 mt-8 z-10 space-y-6">
        
        {/* Golden VIP Bank Info Card */}
        <div className="bg-gradient-to-r from-amber-400 to-amber-600 rounded-[2rem] p-8 shadow-[0_20px_40px_rgba(245,158,11,0.2)] text-slate-950 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Transfer Funds To</p>
            
            <div className="relative">
              <select 
                value={selectedBank.id}
                onChange={(e) => setSelectedBank(adminBanks.find(b => b.id === parseInt(e.target.value)))}
                className="bg-slate-950/20 border border-slate-950/20 text-slate-900 text-[10px] font-black px-3 py-2 rounded-xl focus:outline-none cursor-pointer appearance-none pr-8 uppercase tracking-widest"
              >
                {adminBanks.map(bank => (
                  <option key={bank.id} value={bank.id} className="bg-slate-900 text-white font-bold">{bank.name}</option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-900 text-[8px]"></i>
            </div>
          </div>

          <div className="flex justify-between items-end relative z-10">
            <div>
              <p className="font-black text-3xl tracking-[0.1em] mb-1 drop-shadow-sm">{selectedBank.accountNo}</p>
              <p className="text-[11px] font-black uppercase tracking-widest opacity-80">{selectedBank.accountName}</p>
            </div>
            
            <button 
              onClick={copyToClipboard} 
              className="w-12 h-12 bg-slate-950/10 hover:bg-slate-950/20 border border-slate-950/10 rounded-2xl flex items-center justify-center transition-all active:scale-90"
            >
              <i className="fa-regular fa-copy text-xl"></i>
            </button>
          </div>
        </div>

        {/* Deposit Form */}
        <form onSubmit={handleDeposit} className="glass-card rounded-[2.5rem] p-8 border-amber-500/20 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
          
          {/* Amount Input */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 ml-1">Amount (PGK)</label>
            <div className="relative mb-4">
              <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-amber-400 font-black">K</span>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="glass-input pl-12 w-full py-4 text-xl font-black text-white focus:border-amber-400/50" placeholder="0.00" min="1" required />
            </div>
            <div className="flex gap-2">
              {quickAmounts.map(amt => (
                <button key={amt} type="button" onClick={() => setAmount(amt)} className="flex-1 bg-white/5 hover:bg-amber-400 border border-white/10 hover:border-amber-400 text-slate-400 hover:text-slate-900 font-black py-3 rounded-xl text-[10px] uppercase tracking-widest transition-all">+{amt}</button>
              ))}
            </div>
          </div>

          {/* Reference ID */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 ml-1">Transaction ID</label>
            <input type="text" value={refId} onChange={(e) => setRefId(e.target.value)} className="glass-input w-full py-4 text-sm font-black text-white focus:border-amber-400/50 uppercase tracking-widest" placeholder="e.g. TXN-8821" required />
          </div>

          {/* Screenshot Upload */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 ml-1">Transfer Receipt</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-[2rem] cursor-pointer bg-white/5 hover:bg-amber-400/5 hover:border-amber-400/30 transition-all group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <i className="fa-solid fa-cloud-arrow-up text-2xl text-slate-500 group-hover:text-amber-400 mb-2 transition-colors"></i>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest group-hover:text-slate-200">Upload Screenshot</p>
                <p className="text-[9px] text-amber-400/60 font-bold mt-2 truncate max-w-[200px] tracking-tight">{fileName}</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => {
    setFileName(e.target.files[0]?.name || "No file chosen");
    setFile(e.target.files[0]); // 🌟 ပုံအစစ်ကို သိမ်းလိုက်ပါပြီ
  }} required />
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isLoading || !amount || !refId} className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black text-sm uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex justify-center items-center gap-3">
            {isLoading ? (
              <><i className="fa-solid fa-circle-notch fa-spin"></i> Processing...</>
            ) : (
              <><i className="fa-solid fa-shield-check"></i> Confirm Deposit</>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Deposit;
