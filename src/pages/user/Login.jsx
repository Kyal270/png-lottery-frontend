// src/pages/user/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    const response = await axios.post("https://png-lottery-api.onrender.com/api/user-auth/login", {
  username,
  password
  });

    if (response.data.access_token) {
      // Token ကို သိမ်းဆည်းပါ
      sessionStorage.setItem("app_session_token", response.data.access_token);
      sessionStorage.setItem("username", response.data.username);
      
      toast.success(`Welcome back, ${response.data.username}! 🎰`);
      navigate("/dashboard"); // User Dashboard ဆီ သွားပါ
    }
  } catch (error) {
    toast.error("Invalid username or password!");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans relative overflow-hidden text-slate-50">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        
        {/* 🌟 Typography Logo Section 🌟 */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] glass-card border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)] relative overflow-hidden group w-full">
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-3 bg-amber-500/50 blur-[20px] group-hover:bg-amber-400/80 transition-all duration-500"></div>

            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-widest drop-shadow-md uppercase m-0 leading-none">
              PNG <span className="text-amber-400">3D</span>
            </h1>
            {/* 🌟 ဤနေရာရှိ mb-5 ကို ဖြုတ်လိုက်ပါပြီ 🌟 */}
            <h2 className="text-xl sm:text-2xl font-bold text-slate-200 tracking-[0.4em] sm:tracking-[0.5em] uppercase mt-3 m-0 drop-shadow-sm">
              Lottery
            </h2>
            
          </div>
        </div>

        {/* Login Form Card */}
        <div className="glass-card rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
          
          <h2 className="text-amber-400 text-xl font-black mb-8 text-center uppercase tracking-widest bg-amber-500/10 px-6 py-2 rounded-xl border border-amber-500/20">
              User Access Portal
          </h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Input */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Username</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  className="glass-input pl-5 w-full text-lg focus:border-amber-400/50" 
                  placeholder="e.g. jimmy99" 
                  required 
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="glass-input pl-5 w-full text-lg focus:border-amber-400/50 tracking-widest" 
                  placeholder="••••••••" 
                  required 
                />
              </div>
            </div>

            <div className="flex justify-end mt-2">
              <a href="#" className="text-[10px] font-bold text-slate-400 hover:text-amber-400 transition-colors uppercase tracking-widest">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full mt-8 bg-amber-400 text-slate-900 font-black text-sm uppercase tracking-widest py-4 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:bg-amber-300 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex justify-center items-center gap-2"
            >
              {isLoading ? "Authenticating..." : "Enter Portal"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Don't have an account? 
              <Link to="/register" className="text-amber-400 font-black hover:text-amber-300 ml-2 drop-shadow-md">
                Register Here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
