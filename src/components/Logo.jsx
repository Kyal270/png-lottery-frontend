import React from 'react';

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-2.5 rounded-2xl glass-card border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)] relative overflow-hidden group">
      {/* အပေါ်ကနေ ဖြာကျနေတဲ့ အလင်းရောင် Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-2 bg-amber-500/50 blur-[10px] group-hover:bg-amber-400/80 transition-all duration-500"></div>

      <h1 className="text-lg sm:text-xl font-black text-white tracking-widest drop-shadow-md uppercase m-0 leading-none">
        PNG <span className="text-amber-400">3D</span>
      </h1>
      
      <div className="flex items-center gap-2 mt-1.5">
        <h2 className="text-[9px] sm:text-[10px] font-bold text-slate-200 tracking-[0.4em] uppercase m-0 drop-shadow-sm">
          Lottery
        </h2>
      </div>
    </div>
  );
};

export default Logo;