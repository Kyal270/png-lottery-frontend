import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login", {
        username: adminId,
        password: password,
        auth_code: authCode 
      });

      if (response.data.role !== "admin") {
        toast.error("Unauthorized: Admin access required!");
        setIsLoading(false);
        return; 
      }

      localStorage.setItem("admin_session_token", response.data.access_token);
      localStorage.setItem("user_role", response.data.role);

      toast.success(response.data.message || "Welcome Master!"); 
      
      // 🌟 သတိပြုရန်: App.jsx ထဲက Route မှာ Dashboard လမ်းကြောင်းက "/admin" ဟုတ်/မဟုတ် သေချာစစ်ပါ
      window.location.href = "/admin"; 

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("Network Error!");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 font-mono relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef444405_1px,transparent_1px),linear-gradient(to_bottom,#ef444405_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[400px] relative z-10">
        
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-slate-950 border border-red-500/30 rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.15)] mb-5 relative group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-[0.3em] uppercase">Security Terminal</h1>
          <p className="text-red-500/60 text-[10px] mt-3 font-bold tracking-[0.25em] uppercase">Encrypted Connection Active</p>
        </div>

        <div className="glass-card rounded-[2.5rem] p-10 border-red-500/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">System Access ID</label>
              <input 
                type="text" 
                value={adminId} 
                onChange={(e) => setAdminId(e.target.value)} 
                /* 🌟 အဖြူရောင်ပြောင်းသွားသည့် ပြဿနာကို အောက်ပါ Class များဖြင့် ရှင်းထားသည် */
                className="glass-input focus:outline-none focus:ring-0 focus:border-red-500/40 text-center text-white [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:#fff]" 
                placeholder="ADMIN-XXXX" 
                required 
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">Master Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="glass-input focus:outline-none focus:ring-0 focus:border-red-500/40 text-center text-white [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:#fff]" 
                placeholder="••••••••••••" 
                required 
              />
            </div>

            <div>
              <label className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
                <span>Auth Code</span>
                <span className="text-red-500 animate-pulse font-black">! Required</span>
              </label>
              <input 
                type="text" 
                value={authCode} 
                onChange={(e) => setAuthCode(e.target.value.replace(/\D/g, '').slice(0, 6))} 
                className="glass-input focus:outline-none focus:ring-0 text-center text-red-500 text-2xl font-black tracking-[0.4em] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:#ef4444]" 
                placeholder="000000" 
                required 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading || authCode.length !== 6} 
              className="w-full bg-red-600/10 border border-red-500/50 text-red-500 font-black py-4 rounded-2xl transition-all hover:bg-red-600 hover:text-white disabled:opacity-30 uppercase tracking-[0.3em] text-xs shadow-[0_0_20px_rgba(239,68,68,0.1)] active:scale-95 flex justify-center"
            >
              {isLoading ? "Verifying..." : "Authenticate"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;