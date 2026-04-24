// src/pages/user/WelcomeSpin.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import SpinWheel from "../../components/SpinWheel"; // လမ်းကြောင်းမှန်အောင် ချိန်ပါ

const WelcomeSpin = () => {
  const navigate = useNavigate();

  // Spin Wheel ကနေ လှည့်လို့ပြီးသွားရင် အလုပ်လုပ်မည့် Function
  const handleSpinComplete = (prize) => {
    // ၃ စက္ကန့်လောက် ဆုရတဲ့အကြောင်း ပြပြီးမှ Dashboard ကို ပို့မည်
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-lg glass-card rounded-[2.5rem] p-8 shadow-2xl border-amber-500/20">
         <h1 className="text-center text-amber-400 font-black text-xl tracking-widest uppercase mb-2">
            Welcome Bonus
         </h1>
         <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-wider mb-6">
            Spin the wheel to claim your starting bonus!
         </p>

         {/* 🌟 SpinWheel Component ကို လှမ်းခေါ်ခြင်း */}
         <SpinWheel onSpinComplete={handleSpinComplete} />
         
      </div>
    </div>
  );
};

export default WelcomeSpin;