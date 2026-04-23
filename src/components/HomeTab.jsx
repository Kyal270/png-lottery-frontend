// src/components/HomeTab.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

  const HomeTab = ({ wallet, lastDraw }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 flex flex-col items-center animate-fade-in w-full">
      
      {/* 🌟 💳 Ultra-Premium Wallet Card (Obsidian Gold Edition) */}
<div className="relative p-[1px] rounded-[2.5rem] w-full max-w-md mx-auto bg-gradient-to-b from-amber-500/40 via-slate-800/40 to-slate-900/80 shadow-[0_0_50px_rgba(245,158,11,0.1)] group hover:shadow-[0_0_60px_rgba(245,158,11,0.15)] transition-all duration-500">
  
  {/* Inner Glass Card */}
  <div className="bg-slate-950/90 backdrop-blur-2xl p-8 rounded-[2.4rem] w-full h-full relative overflow-hidden">
    
    {/* 🌟 Decorative Background Glows */}
    <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-amber-500/15 rounded-full blur-[40px] pointer-events-none"></div>
    <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] pointer-events-none"></div>

    {/* 🌟 Top Header: Greeting & Icon */}
    <div className="flex justify-between items-center mb-8 relative z-10">
      <div className="flex flex-col">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-1">Welcome back,</p>
        <h2 className="text-xl font-black text-slate-100 tracking-wide flex items-center gap-2">
          {/* Active Green Dot */}
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
          @{wallet.username}
        </h2>
      </div>
      
      {/* Wallet Icon Box */}
      <div className="relative group-hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 bg-amber-400/20 blur-md rounded-2xl"></div>
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-3.5 rounded-2xl border border-amber-500/30 shadow-lg">
          <i className="fa-solid fa-wallet text-amber-400 text-xl drop-shadow-[0_2px_5px_rgba(245,158,11,0.5)]"></i>
        </div>
      </div>
    </div>

    {/* 🌟 Main Content: Balance */}
    <div className="mb-10 relative z-10 flex flex-col items-center">
      <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] mb-3 flex items-center gap-2">
         <span className="h-[1px] w-4 bg-slate-700"></span>
         Total Balance
         <span className="h-[1px] w-4 bg-slate-700"></span>
      </p>
      
      {/* Gold Glowing Balance */}
      <h2 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 drop-shadow-[0_5px_15px_rgba(245,158,11,0.2)] flex items-baseline gap-1">
        <span className="text-amber-500/80 text-2xl font-bold tracking-normal mr-1">K</span>
        {wallet.balance.toFixed(2)}
      </h2>
    </div>

    {/* 🌟 Bottom Actions: Deposit & Withdraw */}
    <div className="flex gap-4 relative z-10">
      {/* Deposit Button (Solid Gold Premium Style) 🌟 */}
    <button 
      onClick={() => navigate("/deposit")} 
      className="flex-1 relative overflow-hidden group/btn rounded-2xl shadow-lg shadow-amber-500/20"
    >
      {/* Amber/Gold Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 transition-all duration-300"></div>
   
      {/* Button Content */}
      <div className="relative py-4 px-2 text-slate-950 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 group-hover/btn:scale-[1.02] active:scale-95 transition-all">
        {/* 🌟 Arrow လေးက Hover လုပ်ရင် အောက်ကို နည်းနည်း ဆင်းသွားမယ့် Effect */}
        <i className="fa-solid fa-arrow-down flex-shrink-0 group-hover/btn:translate-y-1 transition-transform duration-300"></i>
      Deposit
      </div>
    </button>
      
      {/* Withdraw Button (Solid Emerald Premium Style) 🌟 */}
      <button 
        onClick={() => navigate("/withdraw")} 
        className="flex-1 relative overflow-hidden group/btn rounded-2xl shadow-lg shadow-emerald-500/20"
      >
      {/* Emerald Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 transition-all duration-300"></div>
   
      {/* Button Content */}
      <div className="relative py-4 px-2 text-slate-950 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 group-hover/btn:scale-[1.02] active:scale-95 transition-all">
        {/* Arrow လေးက Hover လုပ်ရင် အပေါ်ကို နည်းနည်း တက်သွားမယ့် Effect */}
      <i className="fa-solid fa-arrow-up flex-shrink-0 group-hover/btn:-translate-y-1 transition-transform duration-300"></i>
      Withdraw
      </div>
      </button>
    </div>

  </div>
</div>

      {/* 🌟 🏆 Premium Last Draw Card (Golden Glow Edition) */}
<div className="relative p-[1px] rounded-3xl w-full max-w-md mx-auto bg-gradient-to-b from-amber-500/30 via-slate-800/40 to-slate-900/80 shadow-[0_0_40px_rgba(245,158,11,0.15)] group hover:shadow-[0_0_50px_rgba(245,158,11,0.25)] transition-all duration-500">
  
  {/* Inner Glass Card */}
  <div className="bg-slate-950/80 backdrop-blur-xl p-7 rounded-[23px] text-center w-full h-full relative overflow-hidden">
    
    {/* 🌟 Top Header: Title & Draw Badge */}
    <div className="flex justify-between items-center mb-6 relative z-10">
      <h4 className="flex items-center gap-2 font-black text-slate-300 text-[10px] uppercase tracking-[0.2em]">
        <i className="fa-solid fa-trophy text-amber-500/80"></i>
        Previous Result
      </h4>
      {/* 🌟 အရင်နေရာမှာရှိတဲ့ span အစား ဒီ code လေးကို အစားထိုးလိုက်ပါ */}
<div className="relative group scale-90 origin-right"> {/* scale-90 က ဆိုဒ်ကို နည်းနည်းလေး သေးပေးထားတာပါ */}
  {/* Glow Effect */}
  <div className="absolute inset-0 bg-amber-500/20 blur-lg rounded-full opacity-50"></div>
  
  {/* ပင်မ Box */}
  <div className="draw-badge relative bg-slate-900/50 border border-white/10 px-3 py-1 rounded-xl backdrop-blur-md">
    <h2 className="text-[18px] font-black tracking-wider flex items-center">
      <span className="bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
        {lastDraw?.draw_number || "WAITING"}
      </span>
    </h2>
  </div>
</div>
    </div>
    
    {/* 🌟 Main Content: Winning Number */}
    <div className="py-5 relative z-10">
      <div className="relative inline-block">
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full"></div>
        
        {/* Number Box */}
        <div className="relative bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 text-transparent bg-clip-text text-6xl md:text-7xl font-black px-6 py-2 tracking-[0.15em] drop-shadow-[0_5px_15px_rgba(245,158,11,0.4)]">
          {lastDraw?.winning_number || "---"}
        </div>
      </div>

      <p className="mt-4 text-[9px] text-slate-500 font-bold uppercase tracking-[0.5em] flex justify-center items-center gap-3 opacity-80">
        <span className="h-[1px] w-8 bg-slate-700 rounded-full"></span>
        Winning Number
        <span className="h-[1px] w-8 bg-slate-700 rounded-full"></span>
      </p>
      
      {/* 🌟 Bottom: Date Info */}
      <div className="mt-7 flex justify-center">
         <div className="inline-flex items-center gap-2 bg-slate-900 border border-amber-500/20 px-4 py-2 rounded-full shadow-[inset_0_0_10px_rgba(245,158,11,0.05)]">
           <i className="fa-regular fa-clock text-amber-500/70 text-[10px]"></i>
           <p className="text-[10px] text-slate-400 font-medium tracking-widest">
             {lastDraw?.date || "Waiting for draw..."}
           </p>
         </div>
      </div>
    </div>

    {/* 🌟 Decorative Background Elements (Optional) */}
    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
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
