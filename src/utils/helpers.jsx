import React from 'react';

/**
 * Status အလိုက် Badge ပြုလုပ်ပေးသော Function
 * @param {string} status - Approved, Success, Paid, Pending, Rejected
 */
export const getStatusBadge = (status) => {
  const baseStyle = "inline-block w-[85px] text-center px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border shadow-inner transition-all";
  
  switch(status) {
    case "Approved": 
    case "Success": 
      return <span className={`${baseStyle} bg-emerald-500/10 text-emerald-400 border-emerald-500/30`}>{status}</span>;
    
    // 🌟 Paid: ခရမ်းရောင် Background နှင့် ဝါရောင်စာလုံး
    case "Paid": 
      return <span className={`${baseStyle} bg-purple-500/10 text-yellow-400 border-yellow-500/30 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]`}>{status}</span>;
    
    case "Pending": 
      return <span className={`${baseStyle} bg-orange-500/10 text-orange-400 border-orange-500/30`}>{status}</span>;
    
    case "Rejected": 
      return <span className={`${baseStyle} bg-red-500/10 text-red-400 border-red-500/30`}>{status}</span>;
    
    default: 
      return <span className={`${baseStyle} bg-slate-500/10 text-slate-300 border-slate-500/30`}>{status}</span>;
  }
};