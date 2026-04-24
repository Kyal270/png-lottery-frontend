import React, { useState } from "react";
import axios from "axios";

const SpinWheel = ({ onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState(null);

  const prizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const sliceAngle = 360 / prizes.length;

  const handleSpin = async () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setPrize(null);

    try {
      // 🌟 ၁။ Backend API ဆီကနေ ဘယ်ဂဏန်းပေါက်လဲ လှမ်းတောင်းမည်
      // (ညီကို့ရဲ့ Render API Link နဲ့ Token ကို သေချာ ထည့်ပေးပါ)
      const response = await axios.post("https://png-lottery-api.onrender.com/api/spin/play", {}, {
          // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      const winningNumber = response.data.winning_number;
      
      // ၂။ Backend က ပို့လိုက်တဲ့ ဂဏန်းရဲ့ နေရာ (Index) ကို ရှာမည်
      const winningIndex = prizes.indexOf(winningNumber);

      // ၃။ ဘီးလည်မည့် အကွာအဝေး (Degree) ကို တွက်မည်
      const extraSpins = 360 * 5; 
      const stopAngle = 360 - (winningIndex * sliceAngle); 
      const newRotation = rotation + extraSpins + stopAngle;

      setRotation(newRotation);

      // ၄။ ဘီးလည်တာ ၄ စက္ကန့် စောင့်မည်
      setTimeout(() => {
        setIsSpinning(false);
        setPrize(winningNumber);
        if (onSpinComplete) {
          onSpinComplete(winningNumber); 
        }
      }, 4000);

    } catch (error) {
      console.error("Spin failed:", error);
      setIsSpinning(false);
      alert(error.response?.data?.detail || "Something went wrong. Try again!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-8 animate-fade-in">
      
      <div className="text-center">
        <h2 className="text-2xl font-black text-slate-100 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
          Lucky Spin
        </h2>
        <p className="text-[10px] text-amber-400 font-bold uppercase tracking-[0.2em] mt-1">
          Win up to 10 PGK Bonus!
        </p>
      </div>

      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full"></div>
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
          <i className="fa-solid fa-location-pin text-4xl text-red-500"></i>
        </div>

        {/* 🌟 လည်မည့် ဘီး (The Wheel) */}
        <div 
          className="w-full h-full rounded-full border-4 border-slate-800 shadow-[0_0_30px_rgba(245,158,11,0.3)] relative overflow-hidden transition-transform ease-out"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transitionDuration: "4s",
            
            // 🌟 အောက်ကလိုင်းမှာ conic-gradient ရဲ့ အထဲ (အရှေ့ဆုံး) မှာ from -18deg, ဆိုတာလေး ထပ်ထည့်လိုက်ပါပြီ 🌟
            background: "conic-gradient(from -18deg, #0f172a 0 36deg, #1e293b 36deg 72deg, #0f172a 72deg 108deg, #1e293b 108deg 144deg, #0f172a 144deg 180deg, #1e293b 180deg 216deg, #0f172a 216deg 252deg, #1e293b 252deg 288deg, #0f172a 288deg 324deg, #1e293b 324deg 360deg)"
          }}
        >
          {prizes.map((p, index) => {
            const angle = index * sliceAngle;
            return (
              <div key={index} className="absolute w-full h-full flex items-start justify-center pt-4" style={{ transform: `rotate(${angle}deg)` }}>
                <span className="text-xl font-black text-amber-400 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
                  {p}
                </span>
              </div>
            );
          })}
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-[inset_0_0_10px_rgba(245,158,11,0.5)]">
            <i className="fa-solid fa-star text-amber-500 text-xs"></i>
          </div>
        </div>
      </div>

      <button 
        onClick={handleSpin}
        disabled={isSpinning}
        className={`w-full max-w-xs py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-2 ${
          isSpinning ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 hover:scale-105 active:scale-95"
        }`}
      >
        {isSpinning ? <><i className="fa-solid fa-spinner fa-spin"></i> Spinning...</> : <><i className="fa-solid fa-rotate-right"></i> Spin Now</>}
      </button>

      {prize && (
        <div className="bg-emerald-500/20 border border-emerald-500/50 p-4 rounded-xl backdrop-blur-md animate-fade-in text-center w-full max-w-xs">
          <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-1">Congratulations!</p>
          <h3 className="text-2xl font-black text-emerald-300">You won {prize} PGK!</h3>
          <p className="text-[9px] text-slate-400 mt-2">Deposit at least 10 PGK to unlock this bonus.</p>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
