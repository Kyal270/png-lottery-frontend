// src/components/TitleUpdater.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    // 🌟 လမ်းကြောင်း (Path) တွေပေါ် မူတည်ပြီး ပြချင်တဲ့ Title များကို သတ်မှတ်ခြင်း
    const pageTitles = {
      "/": "Login | PNG 3D Lottery",
      "/register": "Register | PNG 3D Lottery",
      "/dashboard": "User Dashboard | PNG 3D Lottery",
      "/admin-login": "Security Restricted Area",
      "/admin": "Admin Panel | PNG 3D Lottery",
      // နောက်ထပ် Page တွေ ရှိရင် ဒီမှာ ဆက်ထည့်သွားလို့ ရပါတယ်
    };

    // လက်ရှိရောက်နေတဲ့ လမ်းကြောင်းရဲ့ Title ကို ယူမယ် (စာရင်းထဲမှာ မပါတဲ့ Page ရောက်သွားရင် Default နာမည်ပြမယ်)
    const currentTitle = pageTitles[location.pathname] || "PNG 3D Lottery";

    // Browser ရဲ့ Document Title နေရာမှာ သွားအစားထိုးမယ်
    document.title = currentTitle;
    
  }, [location]); // location (လမ်းကြောင်း) ပြောင်းသွားတိုင်း ဒီ Code လေး ပြန်အလုပ်လုပ်ပါမယ်

  return null; // UI မှာ ဘာမှ ပြစရာမလိုလို့ null ပဲ ပြန်ပေးထားပါတယ်
};

export default TitleUpdater;