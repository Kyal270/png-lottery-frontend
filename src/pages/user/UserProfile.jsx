import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("app_session_token");
        const response = await axios.get("https://png-lottery-api.onrender.com/api/user-auth/my-profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] animate-pulse">
        <i className="fa-solid fa-circle-notch fa-spin text-5xl text-sky-500 mb-4 drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]"></i>
        <h3 className="text-slate-400 font-black uppercase tracking-[0.3em] text-sm">Loading Data...</h3>
      </div>
    );
  }
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center font-sans pb-10 relative overflow-x-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-[-5%] left-[-10%] w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-5%] w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* 🌟 Top Navbar / Header (max-w-md အတိုင်းထားပါမည်) 🌟 */}
      <header className="w-full flex flex-col items-center pt-8 pb-4 px-4 z-40">
        <div className="w-full max-w-md p-8 rounded-[2.5rem] glass-card border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)] relative overflow-hidden group text-center animate-fade-in">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-3 bg-amber-500/50 blur-[20px] group-hover:bg-amber-400/80 transition-all duration-500"></div>
            
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-widest drop-shadow-md uppercase m-0 leading-none">
              PNG <span className="text-amber-400">3D</span>
            </h1>
            <h2 className="text-lg sm:text-xl font-bold text-slate-200 tracking-[0.4em] uppercase mt-2 drop-shadow-sm">
              Lottery
            </h2>

            <button 
              onClick={() => navigate("/dashboard")} 
              className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-400 transition-all active:scale-90 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
        </div>
      </header>

      {/* 🌟 Main Profile Section (Logo နှင့် တစ်ပုံစံတည်း ဖြစ်အောင် ပြင်ဆင်ထားသည်) 🌟 */}
      <main className="w-full max-w-md px-4 mt-2 z-10 flex flex-col gap-4">
        
        {/* Profile Details Card */}
        <div className="w-full p-8 rounded-[2.5rem] glass-card border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)] relative overflow-hidden text-center animate-fade-in flex flex-col items-center">
          
          {/* Top Light Effect (Logo အကွက်အတိုင်း) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-3 bg-amber-500/50 blur-[20px]"></div>

          {/* Avatar (Amber Theme) */}
          <div className="w-24 h-24 rounded-full bg-slate-950/80 border-2 border-amber-500/50 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(245,158,11,0.2)] mb-5 relative z-10">
            🧔🏽‍♂️
          </div>

          {/* Name & Badges */}
          <h2 className="text-3xl font-black text-white m-0 mb-3 tracking-tight">{profile.id}</h2>
          <div className="flex justify-center gap-2 items-center mb-6">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em]">
              <i className="fa-solid fa-circle-check mr-1"></i> {profile.status}
            </span>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              ID: #{profile.db_id}
            </span>
          </div>

          {/* Balance Display */}
          <div className="w-full bg-slate-950/60 p-5 rounded-[2rem] border border-amber-500/20 shadow-inner">
            <span className="text-[10px] font-bold text-amber-500/70 uppercase tracking-[0.2em] block mb-1">Available Balance</span>
            <h3 className="text-4xl font-black text-amber-400 m-0">
              {profile.balance.toLocaleString()} <span className="text-sm text-amber-500/50 font-medium ml-1">PGK</span>
            </h3>
          </div>

          <p className="text-slate-500 text-[10px] mt-6 font-mono uppercase tracking-widest">Joined Since: {profile.joinDate}</p>
        </div>

        {/* 🌟 Statistics Cards (အရင်ဒီဇိုင်းအတိုင်း ပြန်ပြောင်းထားပါသည်) 🌟 */}
        <div className="grid grid-cols-1 gap-4 w-full animate-fade-in" style={{animationDelay: "0.1s"}}>
           
           {/* Total Deposits (Sky Blue) */}
           <div className="glass-card border-white/5 rounded-[1.5rem] p-5 flex justify-between items-center group hover:border-sky-500/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
                  <i className="fa-solid fa-arrow-down-long text-lg"></i>
                </div>
                <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">Total Deposits</span>
              </div>
              <span className="text-2xl font-black text-white">{profile.totalDeposits.toLocaleString()} <span className="text-xs text-slate-600 ml-1">PGK</span></span>
           </div>

           {/* Total Withdraws (Orange) */}
           <div className="glass-card border-white/5 rounded-[1.5rem] p-5 flex justify-between items-center group hover:border-orange-500/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                  <i className="fa-solid fa-arrow-up-long text-lg"></i>
                </div>
                <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">Total Withdraws</span>
              </div>
              <span className="text-2xl font-black text-white">{profile.totalWithdraws.toLocaleString()} <span className="text-xs text-slate-600 ml-1">PGK</span></span>
           </div>

        </div>

      </main>
    </div>
  
  );
};

export default UserProfile;
