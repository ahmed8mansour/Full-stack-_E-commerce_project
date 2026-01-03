import React from "react";
import { backendURL } from '../../store/Constants'
// دالة للكشف عن نوع التوكن الموجود مع تفاصيل أكثر
const detectUserType = () => {
    const tokenTypes = ['user', 'admin'];
    
    for (const type of tokenTypes) {
    const accessToken = localStorage.getItem(`${type}Token`);
    const refreshToken = localStorage.getItem(`${type}TokenRefresh`);
    
    if (accessToken && refreshToken) {
        console.log(`[Token System] ✅ Detected ${type} tokens:`);
        console.log(`[Token System]   Access Token: ${accessToken.substring(0, 10)}...`);
        console.log(`[Token System]   Refresh Token: ${refreshToken.substring(0, 10)}...`);
        return type;
    } 
}
    
    console.log('[Token System] ❌ No valid token pairs found in localStorage');
    return null;
};



  // دالة تحديث التوكن مع تفاصيل أكثر
export const refreshTokens = async () => {
  const type = detectUserType();
  const refresh = localStorage.getItem(`${type}TokenRefresh`);
  if (!type || !refresh) return false;

  try {
    const res = await fetch(`${backendURL}auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });

    const data = await res.json();
    if (!res.ok) throw data;

    localStorage.setItem(`${type}Token`, data.access);
    if (data.refresh) localStorage.setItem(`${type}TokenRefresh`, data.refresh);

    console.log('[TokenManager] 🔁 Tokens refreshed successfully');
    return true;
  } catch (err) {
    console.error('[TokenManager] ❌ Refresh failed:', err);
    // logoutUser?.(); // اختياري
    return false;
  }
};

  // بدء دورة التحديث التلقائي مع تفاصيل أكثر
export const startAutoRefresh = () => {
  const type = detectUserType();
  if (!type) return;

  refreshTokens(); // تحديث فوري عند البدء

  const interval = setInterval(async () => {
    const activeType = detectUserType();
    if (!activeType) {
      clearInterval(interval);
      console.log('[TokenManager] 🛑 Tokens cleared, stopping auto-refresh');
    } else {
      await refreshTokens();
      console.log("تم تنفيذ ريكوست ريفريش بعد ان تم انتظار 15 دقيقة")
    }
  }, 14 * 60 * 1000); // كل 14 دقيقة

  const storageListener = (e) => {
    if (e.key?.endsWith('Token') || e.key?.endsWith('TokenRefresh')) {
      if (!detectUserType()) {
        clearInterval(interval);
        window.removeEventListener('storage', storageListener);
      }
    }
  };

  window.addEventListener('storage', storageListener);
  console.log('[TokenManager] ✅ Auto refresh initialized');
};


window.addEventListener('DOMContentLoaded', () => {
  console.log('[TokenManager] 🏁 DOM loaded - starting auto refresh');
  startAutoRefresh();
});