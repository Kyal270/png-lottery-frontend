// src/pages/user/Bet.jsx
import React, { useState, useEffect } from "react"; // 🌟 useEffect ကို ထပ်ထည့်ထားပါသည်
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"; 

const Bet = () => {
  const navigate = useNavigate();
  const [activeDraw, setActiveDraw] = useState("Loading...");
  const [balance, setBalance] = useState(0); // 🌟 Balance အတွက် State အသစ်
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickAmounts = [10, 50, 100, 500];

  // 🌟 Page စတက်တာနဲ့ Backend ကနေ Draw Number နဲ့ Balance ကို လှမ်းယူပါမည် 🌟
  useEffect(() => {
    const fetchBetData = async () => {
      try {
        const token = localStorage.getItem("app_session_token");
        if (!token) return;

        const response = await axios.get("http://localhost:8000/api/user-auth/dashboard-data", {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Backend ကပို့လိုက်တဲ့ Data တွေကို UI မှာ ပြဖို့ သိမ်းပါမည်
        setActiveDraw(response.data.active_draw);
        setBalance(response.data.wallet.balance);
      } catch (error) {
        console.error("Failed to load active draw and balance.");
      }
    };

    fetchBetData();
  }, []);

  // 🌟 Backend သို့ Bet Request ပို့မည့် Function 🌟
  const handleBet = async (e) => {
    e.preventDefault();
    if (number.length !== 3) {
      toast.error("Please enter exactly 3 digits (e.g., 123)");
      return;
    }
    
    setIsLoading(true);
    try {
      const token = localStorage.getItem("app_session_token"); 
      
      const response = await axios.post("http://localhost:8000/api/user-auth/bet", {
        number: number,
        amount: parseFloat(amount)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success("Ticket purchased successfully! 🎉");
      navigate("/dashboard");
    } catch (error) {
      console.error("Bet Error:", error);
      toast.error(error.response?.data?.detail || "Failed to place bet. Check your balance.");
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
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center font-sans pb-10 relative overflow-x-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-[-5%] left-[-10%] w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-5%] w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* 🌟 Top Navbar / Header (max-w-md အတိုင်းထားပါမည်) 🌟 */}
      <header className="w-full flex flex-col items-center pt-8 pb-4 px-4 z-40">
        <div className="w-full max-w-md p-8 rounded-[2.5rem] glass-card border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)] relative overflow-hidden group text-center animate-fade-in">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-3 bg-amber-500/50 blur-[20px] group-hover:bg-amber-400/80 transition-all duration-500"></div>
            
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-widest drop-shadow-md uppercase m-0 leading-none">
              PNG <span className="text-amber-400">3D</span>
            </h1>
            <h2 className="text-lg sm:text-xl font-bold text-slate-200 tracking-[0.4em] uppercase mt-2 drop-shadow-sm">
              Lottery
            </h2>

            <button 
              onClick={() => navigate("/dashboard")} 
              className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-400 transition-all active:scale-90 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
        </div>
      </header>

      <div className="flex-1 w-full max-w-md px-4 mt-2 z-10 space-y-6">
        
        {/* Jackpot Info Card */}
        <div className="w-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-[2rem] p-6 shadow-[0_20px_40px_rgba(245,158,11,0.2)] text-slate-900 text-center relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-70">Next Draw: 16 April 2026</p>
            <h2 className="text-3xl font-black mb-1 italic tracking-tighter uppercase">Jackpot 500x</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Win 500 PGK for every 1 PGK bet!</p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
        </div>

        <form onSubmit={handleBet} className="glass-card rounded-[2.5rem] p-8 border-amber-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
          
          <div className="bg-amber-500/20 border border-amber-500/50 p-2 rounded-xl text-center mb-4">
            <p className="text-[10px] text-amber-400 uppercase font-black tracking-widest">
              Current Active Draw
            </p>
            <h2 className="text-xl text-white font-bold">#{activeDraw}</h2>
          </div>

          {/* ဂဏန်းရိုက်ရန် */}
          <div className="mb-8">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 text-center">Pick Your 3 Numbers</label>
            <input 
              type="text" 
              value={number} 
              onChange={(e) => setNumber(e.target.value.replace(/\D/g, '').slice(0, 3))} 
              className="w-full bg-slate-900/50 border-2 border-white/5 text-center text-6xl tracking-[0.2em] font-black text-amber-400 py-8 rounded-[2rem] focus:outline-none focus:border-amber-400/50 focus:bg-amber-400/5 transition-all shadow-inner placeholder:text-slate-800" 
              placeholder="000"
              required 
            />
          </div>

          {/* ထိုးကြေးရိုက်ရန် */}
          <div className="mb-8">
            {/* 🌟 Balance ကို ဒီမှာ ပြပါမည် 🌟 */}
            
            <div className="flex justify-center items-end mb-2">
              <span className="text-[15px] font-bold text-slate-300 bg-slate-800 px-4 py-2 rounded border border-slate-700 flex items-center gap-2">
                <i className="fa-solid fa-wallet text-amber-400"></i> Balance: <span className="text-emerald-400">K {Number(balance).toFixed(2)}</span>
              </span>
            </div>
            
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 ml-1">Bet Amount (PGK)</label>
              <div className="relative">
              <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-amber-400 font-black">K</span>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                className="glass-input pl-12 w-full py-4 text-xl font-black text-white focus:border-amber-400/50 transition-all" 
                placeholder="0.00"
                min="1"
                required 
              />
            </div>
            
            <div className="flex gap-2 mt-4">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt)}
                  className="flex-1 bg-white/5 hover:bg-amber-400 border border-white/10 hover:border-amber-400 text-slate-400 hover:text-slate-900 font-black py-3 rounded-xl text-[10px] uppercase tracking-widest transition-all"
                >
                  +{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Potential Win */}
          <div className="bg-emerald-500/5 rounded-2xl p-5 border border-emerald-500/20 flex justify-between items-center mb-8">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-1">Potential Win</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-emerald-400">
                  {amount ? (amount * 500).toLocaleString() : "0"}
                </span>
                <span className="text-[10px] font-bold text-emerald-400/60 uppercase">PGK</span>
              </div>
            </div>
            <i className="fa-solid fa-coins text-emerald-500 text-xl opacity-50"></i>
          </div>

          {/* Confirm Button */}
          <button 
            type="submit" 
            disabled={isLoading || number.length !== 3 || !amount} 
            className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black text-sm uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex justify-center items-center gap-3"
          >
            {isLoading ? (
              <><i className="fa-solid fa-circle-notch fa-spin"></i> Processing...</>
            ) : (
              <><i className="fa-solid fa-ticket"></i> Confirm Ticket</>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Bet;