import React, { useState } from "react"; // 🌟 useState ကို import ထဲ ထည့်ပါ

const DrawTab = ({ 
  drawId, 
  setDrawId, 
  winningNumber, 
  setWinningNumber, 
  handlePayout, 
  declaredNumber, 
  handleNewDraw 
}) => {
  
  // 🌟 3. State များကို Component အထဲတွင်သာ ရေးရပါမည်
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [authCode, setAuthCode] = useState("");

  // 🌟 Payout နှိပ်လိုက်လျှင် ချက်ချင်းမပို့ဘဲ Modal အရင်ဖွင့်မည်
  const onFormSubmit = (e) => {
    e.preventDefault();
    if(winningNumber.length === 3) {
      setShowPayoutModal(true);
    }
  };

  // 🌟 Modal ထဲက Confirm နှိပ်မှ မိခင် DashboardView ဆီ authCode ပို့မည်
  const onConfirmPayout = () => {
    handlePayout(authCode); 
    setShowPayoutModal(false);
    setAuthCode("");
  };

  // Result ပေါ်လာသည့် အခြေအနေ
  if (declaredNumber) {
    return (
      <div className="glass-card rounded-[2.5rem] p-10 animate-fade-in relative overflow-hidden min-h-[260px] flex items-center border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.05)]">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>
        <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left border-r border-white/5 md:pr-10">
            <h3 className="text-amber-400 font-black tracking-[0.2em] text-[11px] uppercase mb-3 opacity-80">
              <i className="fa-solid fa-bolt mr-1"></i> Current Active Draw
            </h3>
            <div className="inline-block bg-slate-950/80 border border-emerald-500/30 text-emerald-400 px-6 py-2.5 rounded-xl font-mono text-2xl font-bold tracking-[0.2em] shadow-inner">
              {drawId}
            </div>
            <p className="text-emerald-400 font-bold text-xs mt-5 animate-pulse flex items-center justify-center md:justify-start gap-2">
              <i className="fa-solid fa-check-double"></i> Payouts Processed Successfully
            </p>
          </div>
          <div className="flex-1 w-full text-center py-4">
             <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] mb-3">Official Result</h4>
             <div className="text-7xl md:text-8xl font-black tracking-[0.15em] mb-6 select-none leading-none" style={{color: "#fbbf24", textShadow: `0 1px 0 #d97706, 0 2px 0 #b45309, 0 3px 0 #92400e, 0 8px 20px rgba(0,0,0,0.8), 0 0 40px rgba(251,191,36,0.3)`}}>
                {declaredNumber}
              </div>
              <button onClick={handleNewDraw} className="bg-white/5 hover:bg-amber-500/20 text-slate-400 hover:text-amber-400 px-6 py-2 rounded-full text-[10px] font-black transition-all border border-white/10 hover:border-amber-500/50 uppercase tracking-[0.2em]">
                Start New Draw <i className="fa-solid fa-arrow-rotate-right ml-1"></i>
              </button>
          </div>
        </div>
      </div>
    );
  }

  // မူလ Form အခြေအနေ
  return (
    <>
      <div className="glass-card rounded-[2.5rem] p-10 animate-fade-in relative overflow-hidden min-h-[260px] flex items-center">
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center w-full">
          <div className="flex-1 text-center md:text-left md:pr-10 border-r border-white/5">
            <h3 className="text-amber-400 font-black tracking-[0.2em] text-[11px] uppercase mb-4 flex items-center justify-center md:justify-start gap-2">
              <i className="fa-solid fa-bolt"></i> Current Active Draw
            </h3>
            <div className="mb-5">
              <input 
                type="text" 
                value={drawId} readOnly 
                onChange={(e) => setDrawId(e.target.value)} 
                className="glass-input max-w-[220px] text-center text-xl font-mono uppercase tracking-widest border-amber-500/20"
                placeholder="DRAW-001"
              />
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed max-w-[300px]">
              Input the 3-digit winning number to close the session and trigger automated payouts.
            </p>
          </div>

          <div className="flex-1 w-full bg-slate-950/40 p-6 rounded-[2rem] border border-white/5 shadow-inner backdrop-blur-md">
            {/* 🌟 ဤနေရာတွင် handlePayout အစား onFormSubmit သို့ ပြောင်းထားပါသည် */}
            <form onSubmit={onFormSubmit} className="flex flex-col gap-4">
              <div className="text-center">
                 <label className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-2 block">Enter Winner</label>
                 <input 
                  type="text" 
                  maxLength="3" 
                  value={winningNumber} 
                  onChange={(e) => setWinningNumber(e.target.value.replace(/\D/g, '').slice(0, 3))} 
                  placeholder="000" 
                  className="glass-input text-center text-5xl font-black text-amber-400 tracking-[0.4em] py-4 focus:border-amber-500"
                />
              </div>
              <button 
                type="submit" 
                disabled={winningNumber.length !== 3}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 font-black text-sm py-4 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                CONFIRM PAYOUT
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 🌟 2FA Security Modal 🌟 */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="glass-card w-full max-w-sm rounded-[2rem] p-8 border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
            
            <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-500 border border-red-500/20">
              <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
            </div>
            
            <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">Confirm Payout</h3>
            <p className="text-xs text-slate-400 mb-6 uppercase tracking-widest font-bold">
              Draw: <span className="text-amber-400">{drawId}</span> | Number: <span className="text-amber-400">{winningNumber}</span>
            </p>

            <div className="mb-6">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 text-left">Authenticator Code</label>
              <input 
                type="text" 
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                autoFocus
                className="glass-input w-full text-center text-2xl font-black text-red-500 tracking-[0.4em] py-3 focus:border-red-500/50 focus:bg-red-500/5"
                placeholder="000000"
              />
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => { setShowPayoutModal(false); setAuthCode(""); }} 
                className="flex-1 py-3 rounded-xl border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
              >
                Cancel
              </button>
              <button 
                onClick={onConfirmPayout}
                disabled={authCode.length !== 6}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white font-black uppercase tracking-widest text-xs hover:bg-red-500 shadow-lg shadow-red-500/20 disabled:opacity-50 transition-all"
              >
                Verify & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DrawTab;