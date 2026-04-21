// src/components/HistoryTab.jsx
import React from "react";

const HistoryTab = ({ transactions }) => {

  return (
    <div className="flex flex-col items-center animate-fade-in pb-24 w-full">
      <div className="glass-card rounded-[2.5rem] border-white/5 w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h4 className="font-black text-white text-xs uppercase tracking-[0.2em]">Transactions 💳</h4>
          <span className="text-[9px] bg-slate-800 text-slate-400 border border-white/10 px-3 py-1 rounded-full font-black uppercase">Statement</span>
        </div>

        <div className="flex flex-col divide-y divide-white/5">
          {transactions.map(txn => (
            <div key={txn.id} className="p-6 hover:bg-white/5 transition-all flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                    txn.type === 'deposit' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                  }`}>
                    <i className={`fa-solid ${txn.type === 'deposit' ? 'fa-arrow-down-long' : 'fa-arrow-up-long'} text-lg`}></i>
                  </div>
                  <div>
                    <p className="font-black text-white capitalize text-xs tracking-widest">{txn.type}</p>
                    <p className="text-[9px] text-slate-500 font-bold mt-1 uppercase">{txn.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-black text-lg tracking-tighter ${txn.type === 'deposit' ? 'text-emerald-400' : 'text-red-500'}`}>
                    {txn.type === 'deposit' ? '+' : '-'}{txn.amount} <span className="text-[10px] opacity-50 ml-1">PGK</span>
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center bg-black/20 px-4 py-3 rounded-2xl border border-white/5">
                <div className="flex flex-col">
                  <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">Method / Ref</p>
                  <p className="text-[10px] text-slate-300 font-bold">{txn.method} <span className="text-slate-500 ml-1">#{txn.ref}</span></p>
                </div>
                <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg ${
                  txn.status === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                  txn.status === 'failed' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                  'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse'
                }`}>
                  {txn.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryTab;