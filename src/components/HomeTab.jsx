// src/components/HomeTab.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 🌟 onRefresh ဆိုတဲ့ Prop အသစ်ကို ထပ်တိုးထားပါတယ်
const HomeTab = ({ wallet, lastDraw, onRefresh }) => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 🌟 Refresh နှိပ်လိုက်ရင် အလုပ်လုပ်မည့် Function
  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (onRefresh) {
      await onRefresh(); // Parent Component က Data ပြန်ဆွဲတာကို စောင့်မည်
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Default 1s စောင့်မည်
    }
    setIsRefreshing(false);
  };

  return (
    <div className="space-y-6 flex flex-col items-center animate-fade-in w-full">
      
      {/* 🌟 💳 Ultra-Premium Wallet Card */}
      <div className="relative p-[1px] rounded-[2.5rem] w-full max-w-md mx-auto bg-gradient-to-b from-amber-500/40 via-slate-800/40 to-slate-900/80 shadow-[0_0_50px_rgba(245,158,11,0.1)] group hover:shadow-[0_0_60px_rgba(245,158,11,0.15)] transition-all duration-500">
        <div className="bg-slate-950/90 backdrop-blur-2xl p-8 rounded-[2.4rem] w-full h-full relative overflow-hidden">
          
          <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-amber-500/15 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div className="flex flex-col">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-1">Welcome back,</p>
              <h2 className="text-xl font-black text-slate-100 tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
                @{wallet?.username}
              </h2>
            </div>
            <div className="relative group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-amber-400/20 blur-md rounded-2xl"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-3.5 rounded-2xl border border-amber-500/30 shadow-lg">
                <i className="fa-solid fa-wallet text-amber-400 text-xl drop-shadow-[0_2px_5px_rgba(245,158,11,0.5)]"></i>
              </div>
            </div>
          </div>

          <div className="mb-10 relative z-10 flex flex-col items-center">
            
            {/* 🌟 Refresh Button ကို Total Balance နံဘေးတွင် ထည့်ထားပါသည် 🌟 */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] flex items-center gap-2">
                 <span className="h-[1px] w-4 bg-slate-700"></span> Total Balance <span className="h-[1px] w-4 bg-slate-700"></span>
              </p>
              <button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(245,158,11,0.2)] transition-all active:scale-90"
                title="Refresh Balance"
              >
                <i className={`fa-solid fa-rotate-right text-[10px] ${isRefreshing ? "fa-spin text-amber-400" : ""}`}></i>
              </button>
            </div>

            <h2 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 drop-shadow-[0_5px_15px_rgba(245,158,11,0.2)] flex items-baseline gap-1">
              <span className="text-amber-500/80 text-2xl font-bold tracking-normal mr-1">K</span>
              {wallet?.balance?.toFixed(2) || "0.00"}
            </h2>
            
            {(wallet?.bonus_balance > 0) && (
              <div className="mt-3 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full shadow-[inset_0_0_10px_rgba(16,185,129,0.1)]">
                <i className="fa-solid fa-gift text-emerald-400 text-[10px]"></i>
                <span className="text-[9px] text-emerald-400/80 font-bold uppercase tracking-widest">Bonus Credit:</span>
                <span className="text-sm text-emerald-300 font-black">K {wallet?.bonus_balance?.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="flex gap-4 relative z-10">
            <button onClick={() => navigate("/deposit")} className="flex-1 relative overflow-hidden group/btn rounded-2xl shadow-lg shadow-amber-500/20">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 transition-all duration-300"></div>
              <div className="relative py-4 px-2 text-slate-950 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 group-hover/btn:scale-[1.02] active:scale-95 transition-all">
                <i className="fa-solid fa-arrow-down flex-shrink-0 group-hover/btn:translate-y-1 transition-transform duration-300"></i> Deposit
              </div>
            </button>
            <button onClick={() => navigate("/withdraw")} className="flex-1 relative overflow-hidden group/btn rounded-2xl shadow-lg shadow-emerald-500/20">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 transition-all duration-300"></div>
              <div className="relative py-4 px-2 text-slate-950 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 group-hover/btn:scale-[1.02] active:scale-95 transition-all">
                <i className="fa-solid fa-arrow-up flex-shrink-0 group-hover/btn:-translate-y-1 transition-transform duration-300"></i> Withdraw
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 🌟 Locked Spin Bonus Card (Bonus ရှိမှသာ ပေါ်မည်) */}
      {(wallet?.locked_spin_bonus > 0) && (
        <div className="relative group w-full max-w-md mx-auto animate-fade-in">
          <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-[1.5rem] opacity-50"></div>
          <div className="relative bg-slate-900/80 border border-red-500/30 p-5 rounded-[1.5rem] backdrop-blur-md flex justify-between items-center shadow-[0_0_20px_rgba(239,68,68,0.15)]">
            <div>
              <p className="text-[9px] text-red-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                <i className="fa-solid fa-lock text-[8px]"></i> Locked Spin Bonus
              </p>
              <h3 className="text-2xl font-black text-slate-200 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                {wallet?.locked_spin_bonus} <span className="text-[11px] text-slate-400 font-bold">PGK</span>
              </h3>
            </div>
            <div className="text-right bg-slate-950/60 p-2.5 px-3 rounded-xl border border-red-500/10">
              <p className="text-[8px] text-slate-400 uppercase tracking-widest mb-1">Unlock Condition</p>
              <p className="text-[11px] text-emerald-400 font-black tracking-wide">
                Deposit Min 10 PGK
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 🏆 Premium Last Draw Card */}
      <div className="relative p-[1px] rounded-3xl w-full max-w-md mx-auto bg-gradient-to-b from-amber-500/30 via-slate-800/40 to-slate-900/80 shadow-[0_0_40px_rgba(245,158,11,0.15)] group hover:shadow-[0_0_50px_rgba(245,158,11,0.25)] transition-all duration-500">
        <div className="bg-slate-950/80 backdrop-blur-xl p-7 rounded-[23px] text-center w-full h-full relative overflow-hidden">
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h4 className="flex items-center gap-2 font-black text-slate-300 text-[10px] uppercase tracking-[0.2em]">
              <i className="fa-solid fa-trophy text-amber-500/80"></i> Previous Result
            </h4>
            <div className="relative group scale-90 origin-right">
              <div className="absolute inset-0 bg-amber-500/20 blur-lg rounded-full opacity-50"></div>
              <div className="draw-badge relative bg-slate-900/50 border border-white/10 px-3 py-1 rounded-xl backdrop-blur-md">
                <h2 className="text-[18px] font-black tracking-wider flex items-center">
                  <span className="bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                    {lastDraw?.draw_number || "WAITING"}
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <div className="py-5 relative z-10">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full"></div>
              <div className="relative bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 text-transparent bg-clip-text text-6xl md:text-7xl font-black px-6 py-2 tracking-[0.15em] drop-shadow-[0_5px_15px_rgba(245,158,11,0.4)]">
                {lastDraw?.winning_number || "---"}
              </div>
            </div>
            <p className="mt-4 text-[9px] text-slate-500 font-bold uppercase tracking-[0.5em] flex justify-center items-center gap-3 opacity-80">
              <span className="h-[1px] w-8 bg-slate-700 rounded-full"></span> Winning Number <span className="h-[1px] w-8 bg-slate-700 rounded-full"></span>
            </p>
            <div className="mt-7 flex justify-center">
               <div className="inline-flex items-center gap-2 bg-slate-900 border border-amber-500/20 px-4 py-2 rounded-full shadow-[inset_0_0_10px_rgba(245,158,11,0.05)]">
                 <i className="fa-regular fa-clock text-amber-500/70 text-[10px]"></i>
                 <p className="text-[10px] text-slate-400 font-medium tracking-widest">
                   {lastDraw?.date || "Waiting for draw..."}
                 </p>
               </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        </div>
      </div>

      {/* 🌟 Play Now Card */}
      <div className="w-full max-w-md bg-gradient-to-r from-amber-400 to-amber-600 p-8 rounded-[2.5rem] text-center shadow-[0_20px_40px_rgba(245,158,11,0.2)] mb-24 relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="text-slate-900 font-black text-xl uppercase tracking-tighter mb-1 italic">Ready to win big?</h3>
          <p className="text-slate-900/70 text-[10px] font-bold uppercase tracking-widest mb-6">Place your 3D bets now!</p>
          <button onClick={() => navigate("/bet")} className="bg-slate-950 text-amber-400 w-full py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-slate-900 transition-all flex items-center justify-center gap-2">
            <i className="fa-solid fa-play"></i> Start Playing
          </button>
        </div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-all"></div>
      </div>
    </div>
  );
};

export default HomeTab;
