// src/pages/user/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

// 🌟 စောစောက သိမ်းထားတဲ့ Logo Component ကို လှမ်းခေါ်ပါမည် (လမ်းကြောင်းမှန်အောင် ချိန်ပါ)
import Logo from "../../components/Logo"; 

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    password: "",
    bank_name: "BSP Bank",
    bank_account_name: "",
    bank_account_number: "",
    referral_code: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    const response = await axios.post("https://png-lottery-api.onrender.com/api/user-auth/register", formData);
    
    if (response.status === 200) {
      toast.success("Account created successfully! 🎉");
      navigate("/"); // Login သို့ ပြန်ပို့ပါ
    }
  } catch (error) {
    toast.error(error.response?.data?.detail || "Registration failed!");
  } finally {
    setIsLoading(false);
  }
};

  return (
    // 🌟 Admin Theme အတိုင်း နောက်ခံအမည်းရောင်နှင့် Glass Effects များကို အသုံးပြုထားပါသည်
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

        {/* 🌟 Register Form Card (glass-card) */}
        <div className="glass-card rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>

          <h2 className="text-amber-400 text-lg font-black mb-6 text-center uppercase tracking-widest bg-amber-500/10 px-6 py-2 rounded-xl border border-amber-500/20">
              Create New Account
          </h2>
          
          <form onSubmit={handleRegister} className="flex flex-col">
            
            {/* 🌟 Scrollable Area (Fields များလွန်း၍ ဖုန်းတွင် အဆင်ပြေစေရန်) */}
            <div className="space-y-6">
              
              {/* Account Info Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                  <i className="fa-solid fa-user-shield text-amber-400/70 text-xs"></i>
                  <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Account Info</h3>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Username</label>
                  <input type="text" name="username" value={formData.username} onChange={handleChange} className="glass-input w-full text-sm focus:border-amber-400/50" placeholder="e.g. jimmy99" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                  <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} className="glass-input w-full text-sm focus:border-amber-400/50" placeholder="09xxxxxxxxx" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className="glass-input w-full text-sm focus:border-amber-400/50 tracking-widest" placeholder="••••••••" required />
                </div>
              </div>

              {/* Bank Details Section */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                  <i className="fa-solid fa-building-columns text-amber-400/70 text-xs"></i>
                  <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Withdrawal Details</h3>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Bank Name</label>
                  <select name="bank_name" value={formData.bank_name} onChange={handleChange} className="glass-input w-full text-sm focus:border-amber-400/50 cursor-pointer appearance-none">
                    <option value="BSP Bank" className="bg-slate-900 text-white">BSP Bank</option>
                    <option value="Kina Bank" className="bg-slate-900 text-white">Kina Bank</option>
                    <option value="Cellmoni" className="bg-slate-900 text-white">Cellmoni</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Account Name</label>
                  <input type="text" name="bank_account_name" value={formData.bank_account_name} onChange={handleChange} className="glass-input w-full text-sm focus:border-amber-400/50" placeholder="e.g. Jimmy Doe" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Account Number</label>
                  <input type="text" name="bank_account_number" value={formData.bank_account_number} onChange={handleChange} className="glass-input w-full text-sm focus:border-amber-400/50" placeholder="Enter bank account" required />
                </div>
              </div>

              {/* Optional Section */}
              <div className="space-y-4 pt-2 pb-2">
                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                  <i className="fa-solid fa-gift text-amber-400/70 text-xs"></i>
                  <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Optional</h3>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Referral Code</label>
                  <input type="text" name="referral_code" value={formData.referral_code} onChange={handleChange} className="glass-input w-full text-sm focus:border-amber-400/50" placeholder="Enter code if any" />
                </div>
              </div>

            </div>

            {/* 🌟 Premium Submit Button */}
            <div className="pt-6 mt-2 border-t border-white/5">
              <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full bg-amber-400 text-slate-900 font-black text-sm uppercase tracking-widest py-4 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:bg-amber-300 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex justify-center items-center gap-2"
              >
                {isLoading ? (
                  <><i className="fa-solid fa-circle-notch fa-spin"></i> Processing...</>
                ) : (
                  <><i className="fa-solid fa-user-plus"></i> Join Now</>
                )}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Already have an account? 
              <Link to="/" className="text-amber-400 font-black hover:text-amber-300 ml-2 drop-shadow-md">
                Log In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
