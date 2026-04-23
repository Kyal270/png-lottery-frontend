// src/pages/user/Withdraw.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"; // 🌟 axios ထည့်ထားပါသည်

const Withdraw = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("BSP Bank");
  const [accountName, setAccountName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [wallet, setWallet] = useState({ balance: 0 }); // 🌟 currentBalance အစား wallet သုံးပါ

// Withdraw.jsx ထဲတွင်
useEffect(() => {
  const fetchBalance = async () => {
    try {
      const token = sessionStorage.getItem("app_session_token");
      const response = await axios.get("https://png-lottery-api.onrender.com/api/user-auth/dashboard-data", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && response.data.wallet) {
        const userData = response.data.wallet;
        setWallet(userData);
        
        // 🌟 User register တုန်းက ထည့်ထားတဲ့ data တွေကို state ထဲ တန်းထည့်မယ်
        setBank(userData.bank_name || "Not Set");
        setAccountName(userData.bank_account_name || "Not Set");
        setAccountNo(userData.bank_account_number || "Not Set");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };
  fetchBalance();
}, []);

  // 🌟 Backend သို့ Withdraw Request ပို့မည့် Function 🌟
  const handleWithdraw = async (e) => {
  e.preventDefault();
  
  // 🌟 wallet.balance နဲ့ တိုက်စစ်ပါ
  if (parseFloat(amount) > wallet.balance) {
    toast.error("Insufficient balance! Your limit is K " + wallet.balance);
    return;
  }
    
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("app_session_token");
      
      // API သို့ လှမ်းပို့ခြင်း
      await axios.post("http://127.0.0.1:8000/api/user-auth/withdraw", {
        amount: parseFloat(amount),
        bank: bank,
        account_name: accountName,
        account_no: accountNo
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Withdrawal requested successfully! 💸");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.detail || "Failed to request withdrawal.");
    } finally {
      setIsLoading(false);
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
          <h1 className="w-full text-center text-sm font-black text-white uppercase tracking-[0.3em]">Cash Out Funds</h1>
        </div>
      </div>

      <div className="flex-1 w-full max-w-md px-4 mt-8 z-10 space-y-6">
        
        {/* Available Balance Card */}
        <div className="glass-card p-6 rounded-[2rem] border-amber-500/20 shadow-xl flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl -mr-8 -mt-8"></div>
          <div className="relative z-10">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Available Balance</p>
            <div className="flex items-baseline gap-2">
              <span className="text-amber-400 text-lg font-black">K</span>
              <span className="text-3xl font-black text-white">
  {/* 900.00 လို့ ပေါ်လာပါလိမ့်မယ် */}
  {(wallet?.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
</span>
            </div>
          </div>
          <div className="bg-amber-400/10 w-12 h-12 rounded-2xl border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner">
             <i className="fa-solid fa-sack-dollar text-xl"></i>
          </div>
        </div>

        {/* Withdrawal Form */}
        <form onSubmit={handleWithdraw} className="glass-card rounded-[2.5rem] p-8 border-white/5 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
          
          {/* Amount Input */}
          <div>
            <div className="flex justify-between items-center mb-3 px-1">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Withdraw Amount</label>
              <button 
  type="button" 
  // ❌ အရင်က: onClick={() => setAmount(currentBalance.toString())} 
  onClick={() => setAmount(wallet.balance.toString())} // ✅ ပြင်ရမည့်ပုံစံ
  className="..."
>
  Max Limit
</button>
            </div>
            <div className="relative">
               <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-amber-400 font-black">K</span>
               <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                className="glass-input pl-12 w-full py-5 text-2xl font-black text-white text-center focus:border-amber-400/50 tracking-wider" 
                placeholder="0.00" 
                min="1" 
                required 
              />
            </div>
          </div>

          <div className="border-t border-dashed border-white/10 my-6"></div>

          {/* Bank Selection */}
          <div className="relative">
  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 ml-1">Receiving Bank</label>
  <input 
    type="text" 
    value={bank} 
    disabled 
    className="glass-input w-full py-4 px-5 text-sm font-black text-amber-400/80 bg-white/5 border-white/10 cursor-not-allowed uppercase"
  />
</div>

{/* Account Name */}
<div>
  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 ml-1">Account Name</label>
  <input 
    type="text" 
    value={accountName} 
    disabled 
    className="glass-input w-full py-4 px-5 text-sm font-black text-amber-400/80 bg-white/5 border-white/10 cursor-not-allowed uppercase"
  />
</div>

{/* Account Number */}
<div>
  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 ml-1">Account / Phone No.</label>
  <input 
    type="text" 
    value={accountNo} 
    disabled 
    className="glass-input w-full py-4 px-5 text-sm font-black text-amber-400/80 bg-white/5 border-white/10 cursor-not-allowed"
  />
</div>

          {/* Submit Button */}
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isLoading || !amount || !accountName || !accountNo} 
              className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black text-sm uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex justify-center items-center gap-3"
            >
              {isLoading ? (
                <><i className="fa-solid fa-circle-notch fa-spin"></i> Processing...</>
              ) : (
                <><i className="fa-solid fa-paper-plane"></i> Submit Request</>
              )}
            </button>
          </div>
          
          <p className="text-[9px] text-center text-slate-500 font-black uppercase tracking-widest opacity-60">
            Note: Withdrawals may take up to 24 hours to verify.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;
