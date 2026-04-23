import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminBanksTab = () => {
  const [banks, setBanks] = useState([]);
  const [newBank, setNewBank] = useState({ name: '', account_name: '', account_no: '' });
  const [isLoading, setIsLoading] = useState(false);

  // VITE_API_URL မရှိရင် Local ကို Auto သုံးမည်
  const API_BASE = import.meta.env.VITE_API_URL || "https://png-lottery-api.onrender.com";

  const fetchBanks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/dashboard/banks`);
      setBanks(res.data);
    } catch (error) {
      toast.error("Failed to load banks data");
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const handleAddBank = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("admin_session_token");
      await axios.post(`${API_BASE}/api/dashboard/banks`, newBank, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Bank Added Successfully! 🏦");
      setNewBank({ name: '', account_name: '', account_no: '' });
      fetchBanks();
    } catch (error) {
      toast.error("Failed to add bank");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this bank?")) return;
    try {
      const token = sessionStorage.getItem("admin_session_token");
      await axios.delete(`${API_BASE}/api/dashboard/banks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Bank Deleted! 🗑️");
      fetchBanks();
    } catch (error) {
      toast.error("Failed to delete bank");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* 🌟 Add New Bank Form */}
      <div className="glass-card rounded-[2.5rem] p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 m-0">
          <i className="fa-solid fa-building-columns text-amber-400"></i> Add New Deposit Bank
        </h3>
        
        <form onSubmit={handleAddBank} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input type="text" placeholder="Bank Name (e.g. BSP)" value={newBank.name} onChange={e => setNewBank({...newBank, name: e.target.value})} className="glass-input w-full py-3 px-4 font-bold text-white uppercase tracking-widest text-xs" required />
          </div>
          <div className="flex-1">
            <input type="text" placeholder="Account Name (e.g. Admin Co)" value={newBank.account_name} onChange={e => setNewBank({...newBank, account_name: e.target.value})} className="glass-input w-full py-3 px-4 font-bold text-white uppercase tracking-widest text-xs" required />
          </div>
          <div className="flex-1">
            <input type="text" placeholder="Account Number" value={newBank.account_no} onChange={e => setNewBank({...newBank, account_no: e.target.value})} className="glass-input w-full py-3 px-4 font-bold text-white uppercase tracking-widest text-xs" required />
          </div>
          <button type="submit" disabled={isLoading} className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 disabled:opacity-50">
            {isLoading ? "Adding..." : "Add Bank"}
          </button>
        </form>
      </div>

      {/* 🌟 Existing Banks List */}
      <div className="glass-card rounded-[2.5rem] p-8">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 m-0">
          <i className="fa-solid fa-list-check text-sky-400"></i> Active Deposit Banks
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {banks.length === 0 || !Array.isArray(banks) ? (
         <div className="col-span-full text-center text-slate-500 py-8">No banks available or invalid data.</div>
            ) : (
            banks.map(bank => (
              <div key={bank.id} className="bg-slate-950/40 border border-white/5 p-6 rounded-[1.5rem] flex flex-col justify-between group hover:border-amber-500/30 transition-all">
                <div>
                  <h4 className="text-amber-400 font-black text-xl mb-1 uppercase tracking-widest">{bank.name}</h4>
                  <p className="text-white font-mono text-lg tracking-wider mb-1">{bank.account_no}</p>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{bank.account_name}</p>
                </div>
                <button onClick={() => handleDelete(bank.id)} className="mt-4 w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all">
                  Delete Bank
                </button>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default AdminBanksTab;
