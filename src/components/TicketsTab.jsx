// src/components/TicketsTab.jsx
import React from "react";

const TicketsTab = ({ tickets }) => {

  return (
    <div className="flex flex-col items-center animate-fade-in pb-24 w-full">
      <div className="glass-card rounded-[2.5rem] border-white/5 w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h4 className="font-black text-white text-xs uppercase tracking-[0.2em]">My Tickets 🎟️</h4>
          <span className="text-[9px] bg-amber-400/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full font-black uppercase">Active Log</span>
        </div>
        
        <div className="flex flex-col divide-y divide-white/5">
          {tickets.map(ticket => {
            // 🌟 ၂။ Space အပိုတွေ ပါနေခဲ့ရင် အကုန်ဖြတ်ထုတ်ဖို့ .trim() ကိုပါ ထပ်တိုးလိုက်ပါသည်
            const currentStatus = String(ticket.status || "pending").toLowerCase().trim();

            return (
            <div key={ticket.id} className="p-6 hover:bg-white/5 transition-all flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-400/5 border border-amber-500/30 rounded-2xl px-4 py-2 shadow-inner">
                    <span className="font-black text-2xl text-amber-400 tracking-widest">{ticket.number}</span>
                  </div>
                  <div className="flex flex-col items-start gap-2">
  {/* 🌟 Glass-Neon Style Badge (Compact Version) */}
  <div className="relative group">
    {/* Glow Effect - နေရာသေးတာမို့ blur ကို နည်းနည်းလျှော့ထားပါတယ် */}
    <div className="absolute inset-0 bg-amber-500/20 blur-lg rounded-full opacity-40"></div>
    
    {/* ပင်မ Badge Box */}
    <div className="draw-badge relative bg-slate-900/60 border border-white/10 px-3 py-1 rounded-xl backdrop-blur-md">
      <span className="text-[15px] font-black tracking-widest bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
        {ticket.draw || ticket.draw_number}
      </span>
    </div>
  </div>

  {/* Date - Badge နဲ့ လိုက်ဖက်အောင် style နည်းနည်း ပြင်ထားပါတယ် */}
  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider pl-1">
    {ticket.date}
  </p>
</div>
                </div>
                <div className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                    currentStatus === 'won' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                    currentStatus === 'lost' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                    'bg-amber-500/10 text-amber-500 border-amber-500/20'
                  }`}>
                    {/* Status မရှိခဲ့ရင် Unknown ဟု ပြပါမည် */}
                    {ticket.status || "Unknown"} 
                </div>
              </div>
              
              <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-400 font-bold">Bet: <span className="text-white ml-1">{ticket.bet_amount} PGK</span></p>
                {currentStatus === 'won' ? (
                  <p className="text-sm font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">+{ticket.win_amount} PGK</p>
                ) : currentStatus === 'lost' ? (
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Sorry, Goodluck Next Draw</p>
                ) : (
                  <p className="text-[9px] font-black text-amber-400 uppercase tracking-widest animate-pulse">Pending...</p>
                )}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TicketsTab;
