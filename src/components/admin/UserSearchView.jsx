import React, { useState } from "react";
import axios from "axios"; // 🌟 API ခေါ်ရန်
import toast from "react-hot-toast";

const UserSearchView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 🌟 Loading status ထည့်ထားပါသည်

  // 🌟 Backend သို့ လှမ်း၍ ရှာဖွေမည့် Logic
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      // 🌟 Admin Token ကို ယူပါမည်
      const adminToken = sessionStorage.getItem("admin_session_token"); // နာမည်လွဲနေရင် ပြင်ပါ
        
      // 🌟 Backend သို့ User ID နှင့်တကွ Token လှမ်းပို့၍ Data တောင်းခံခြင်း
      const response = await axios.get(`https://png-lottery-api.onrender.com/api/users/${searchQuery}`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      
      setSearchedUser(response.data); 
      toast.success("User successfully located!", { id: "search-toast" });

    } catch (error) {
      setSearchedUser(null); 
      
      if (error.response && error.response.status === 404) {
        toast.error("User not found in the system.");
      } else if (error.response && error.response.status === 401) {
        // Session timeout ဖြစ်ပါက App.jsx က ဖမ်းမည်ဖြစ်၍ ဒီနေရာတွင် အထူးတလည် မရေးတော့ပါ
      } else {
        toast.error("Failed to search user. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] animate-pulse">
        <i className="fa-solid fa-circle-notch fa-spin text-5xl text-sky-500 mb-4 drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]"></i>
        <h3 className="text-slate-400 font-black uppercase tracking-[0.3em] text-sm">Loading Data...</h3>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      
      {/* 🔍 Search Bar Section */}
      <div className="glass-card rounded-[2.5rem] p-8 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <h3 className="text-xl font-bold text-teal-400 mb-6 flex items-center gap-2 m-0 drop-shadow-[0_0_8px_rgba(45,212,191,0.3)]">
          <i className="fa-solid fa-users-viewfinder"></i> User Explorer
        </h3>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 relative z-10">
          <input 
            type="text" 
            placeholder="Enter exact User ID to search..." 
            className="glass-input flex-1 text-lg py-4 focus:border-teal-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-teal-500/20 border border-teal-500/40 text-teal-400 px-10 py-4 rounded-2xl font-black transition-all hover:bg-teal-500 hover:text-slate-900 shadow-[0_0_15px_rgba(45,212,191,0.1)] hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] active:scale-95 uppercase tracking-widest text-sm disabled:opacity-50"
          >
            <i className={`fa-solid ${isLoading ? 'fa-spinner fa-spin' : 'fa-magnifying-glass'} mr-2`}></i> 
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* 👤 User Result Profile Section (လုံးဝ မပြောင်းလဲပါ၊ မူလအတိုင်း ဆက်ထားပါ) */}
      {searchedUser && (
        <div className="glass-card rounded-[2.5rem] p-8 animate-fade-in relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center border-b border-white/5 pb-8 mb-8 relative z-10">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-slate-950/80 border-2 border-teal-500/30 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(45,212,191,0.2)]">
              🧔🏽‍♂️
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-black text-white m-0 mb-2 tracking-tight">{searchedUser.id}</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.15em]">
                  <i className="fa-solid fa-circle-check mr-1"></i> {searchedUser.status}
                </span>
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest bg-slate-950/50 px-3 py-1 rounded-lg border border-white/5">
                  ID: {searchedUser.db_id}
                </span>
              </div>
              <p className="text-slate-500 text-[11px] mt-4 font-mono uppercase tracking-widest">Joined Since: {searchedUser.joinDate}</p>
            </div>

            {/* Current Balance Display */}
            <div className="bg-slate-950/60 p-6 rounded-[2rem] border border-white/5 text-center shadow-inner min-w-[220px] backdrop-blur-md">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2">Available Balance</span>
              <h3 className="text-3xl font-black text-amber-400 m-0">
                {searchedUser.balance.toLocaleString()} <span className="text-xs text-slate-500 font-medium ml-1">PGK</span>
              </h3>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
             <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 flex justify-between items-center group hover:border-sky-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
                    <i className="fa-solid fa-arrow-down-long"></i>
                  </div>
                  <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">Total Deposits</span>
                </div>
                <span className="text-xl font-black text-white">{searchedUser.totalDeposits.toLocaleString()} <span className="text-[10px] text-slate-600 ml-1">PGK</span></span>
             </div>

             <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 flex justify-between items-center group hover:border-orange-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <i className="fa-solid fa-arrow-up-long"></i>
                  </div>
                  <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">Total Withdraws</span>
                </div>
                <span className="text-xl font-black text-white">{searchedUser.totalWithdraws.toLocaleString()} <span className="text-[10px] text-slate-600 ml-1">PGK</span></span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSearchView;
