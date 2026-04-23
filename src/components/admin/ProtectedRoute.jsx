// src/components/admin/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Browser ရဲ့ မှတ်ဉာဏ်ထဲကနေ Token နဲ့ Role ကို လှမ်းစစ်ပါမယ်
  const adminToken = sessionStorage.getItem("admin_session_token");
  const role = sessionStorage.getItem('user_role');

  // တကယ်လို့ Token မရှိဘူး (သို့) Role က 'admin' မဟုတ်ဘူးဆိုရင်...
  if (!adminToken || role !== 'admin') {
    // Login Page ကို အတင်းပြန်ပို့လိုက်ပါမယ် (replace သုံးထားလို့ Back ပြန်ဆွဲလည်း မရတော့ပါဘူး)
    return <Navigate to="/admin-login" replace />;
  }

  // အားလုံးမှန်ကန်ရင်တော့ တောင်းဆိုထားတဲ့ Page (Admin Panel) ကို ပြပေးပါမယ်
  return children;
};

export default ProtectedRoute;
