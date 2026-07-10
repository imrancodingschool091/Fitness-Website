"use client";

import { useState, useEffect } from "react";

const translations = {
  en: {
    terms: "Terms & Policies",
    account: "My Account",
    support: "Support",
    about: "About Us",
    blog: "Blog",
    subscription: "My subscription"
  },
  hi: {
    terms: "नियम और नीतियां",
    account: "मेरा खाता",
    support: "सहायता",
    about: "हमारे बारे में",
    blog: "ब्लॉग",
    subscription: "मेरी सदस्यता"
  }
};

export default function SideMenu({ open, onClose, lang = 'en' }) {
  const t = translations[lang] || translations.en;
  
  const [activeView, setActiveView] = useState('main');

  // Reset menu view when sidebar closes
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => setActiveView('main'), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);
  
  const links = [
    { label: t.terms, href: "/terms" },
    { label: t.account, action: () => setActiveView('account') },
    { label: t.support, href: "/support" },
    { label: t.about, href: "/about" },
    { label: t.blog, href: "/blog" },
  ];

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
      <div onClick={onClose} className="absolute inset-0 bg-black/70" />

      <div className={`absolute right-0 top-0 h-full w-full max-w-[440px] bg-[#222222] shadow-2xl transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10 shrink-0">
          {activeView === 'account' ? (
            <button onClick={() => setActiveView('main')} aria-label="Back" className="text-white hover:opacity-70 transition cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <div className="w-6" /> // Placeholder to keep title centered or X on right
          )}
          
          {activeView === 'account' && (
            <span className="text-[17px] font-medium text-white tracking-wide">
              {t.account}
            </span>
          )}

          <button onClick={onClose} aria-label="Close menu" className="text-white cursor-pointer hover:opacity-70 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeView === 'main' ? (
            <nav className="flex flex-col">
              {links.map((link) => (
                link.href ? (
                  <a key={link.label} href={link.href} className="flex items-center justify-between border-b border-white/10 px-8 py-5 text-[17px] font-medium text-white hover:bg-white/5 transition-colors">
                    {link.label}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ) : (
                  <button key={link.label} onClick={link.action} className="flex items-center justify-between border-b border-white/10 px-8 py-5 text-[17px] font-medium text-white hover:bg-white/5 transition-colors text-left w-full cursor-pointer">
                    {link.label}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )
              ))}
            </nav>
          ) : (
            <nav className="flex flex-col py-4">
              <a href="/signin?destination=/my-account/subscription" className="px-8 py-3 text-[17px] font-medium text-white hover:bg-white/5 transition-colors">
                {t.subscription}
              </a>
            </nav>
          )}
        </div>

      </div>
    </div>
  );
}
