// src/components/HomeTab.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

  const HomeTab = ({ wallet, lastDraw }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 flex flex-col items-center animate-fade-in w-full">
      
      {/* 🌟 Premium Wallet Card (Black Gold Style) */}
      <div className="glass-card p-8 rounded-[2.5rem] border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.1)] text-white w-full max-w-md relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-sm text-blue-100 mb-1">Welcome back,</p>
            <h2 className="text-2xl font-bold tracking-wide">@{wallet.username}</h2>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-1">Total Balance</p>
            <h2 className="text-4xl font-black tracking-tight text-white flex items-baseline gap-2">
              <span className="text-amber-400 text-xl font-bold">K</span>
              {wallet.balance.toFixed(2)}
            </h2>
          </div>
          <div className="bg-amber-400/10 p-3 rounded-2xl border border-amber-500/20">
            <i className="fa-solid fa-wallet text-amber-400 text-xl"></i>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => navigate("/deposit")} className="flex-1 bg-amber-400 text-slate-900 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all">Deposit</button>
          <button onClick={() => navigate("/withdraw")} className="flex-1 bg-white/5 border border-white/10 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Withdraw</button>
        </div>
      </div>

      {/* 🌟 Last Draw Card (Glowing Amber) */}
      <div className="glass-card p-6 rounded-3xl border-white/5 w-full max-w-md text-center">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-black text-slate-300 text-[10px] uppercase tracking-widest">Previous Result 🏆</h4>
          {/* 🌟 2. Draw Number အစစ်ကို ပြမည် */}
          <span className="draw-badge text-[10px] px-2 py-1">
            #{lastDraw?.draw_number || "WAITING"}
          </span>
        </div>
        
        <div className="py-4">
          <div className="inline-block bg-gradient-to-b from-amber-300 to-amber-500 text-slate-950 text-5xl font-black px-8 py-3 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.3)] tracking-tighter">
            {lastDraw?.winning_number || "---"}
          </div>
          <p className="mt-6 text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em]">Winning Number</p>
          
          {/* 🌟 ဒီနေရာလေးမှာ Date ကို ထည့်ပါမည် */}
          <div className="mt-3 inline-block bg-slate-900/50 border border-white/5 px-4 py-1.5 rounded-full">
             <p className="text-[9px] text-slate-400 font-medium tracking-widest flex items-center gap-2">
               <i className="fa-solid fa-calendar-check text-amber-500"></i>
               {lastDraw?.date || "Waiting for draw..."}
             </p>
          </div>
        </div>
      </div>

      {/* 🌟 Play Now Card (Gold Gradient) */}
      <div className="w-full max-w-md bg-gradient-to-r from-amber-400 to-amber-600 p-8 rounded-[2.5rem] text-center shadow-[0_20px_40px_rgba(245,158,11,0.2)] mb-24 relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="text-slate-900 font-black text-xl uppercase tracking-tighter mb-1 italic">Ready to win big?</h3>
          <p className="text-slate-900/70 text-[10px] font-bold uppercase tracking-widest mb-6">Place your 3D bets now!</p>
          <button onClick={() => navigate("/bet")} className="bg-slate-950 text-amber-400 w-full py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-slate-900 transition-all flex items-center justify-center gap-2">
            <i className="fa-solid fa-play"></i> Start Playing
          </button>
        </div>
        {/* Decorative Circle */}
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-all"></div>
      </div>
    </div>
  );
};

export default HomeTab;