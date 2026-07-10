"use client";

import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'عربي' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'it', name: 'Italiano' },
  { code: 'ja', name: '日本語' },
  { code: 'pl', name: 'Polski' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'vi', name: 'Việt Nam' },
  { code: 'pt', name: 'Português' },
  { code: 'zh-CN', name: '简体中文' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'ko', name: '한국어' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'el', name: 'Ελληνικά' },
];

export default function Header({ onMenuOpen, lang = 'en', setLang }) {
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[radial-gradient(65.29% 66.81% at 31.38% 37.3%, rgba(31,147,255,0.3404) 0%, rgba(30,30,30,0) 100%)]">
      <div className="flex items-center justify-between px-6 py-4 w-full">
        {/* Logo */}
        <a href="/" className="flex items-center z-[2]">
          <img
            src="https://madmuscles.com/_next/static/assets/QqEicm7PUdPaysBLC07dQ/images/logos/logo.svg"
            alt="MadMuscles Logo"
            className="h-7 w-auto object-contain"
          />
        </a>

        {/* Right side navigation */}
        <nav className="flex items-center ml-auto z-[2]">
          <a
            href="/help"
            className="hidden md:flex items-center px-4 py-1.5 text-[16px] font-semibold text-white/70 hover:text-white transition tracking-[-0.011em] leading-[28px]"
          >
            {lang === 'hi' ? 'मदद' : 'Help'}
          </a>

          {/* Language Dropdown */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center px-4 py-1.5 text-[16px] font-semibold text-white/70 hover:text-white transition tracking-[-0.011em] leading-[28px] cursor-pointer"
            >
              {currentLang.name}
            </button>

            {langOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-[220px] max-h-[400px] overflow-y-auto shadow-2xl border border-[#333]"
                style={{ backgroundColor: '#2a2a2a' }}
              >
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      if (setLang) setLang(l.code);
                      setLangOpen(false);
                    }}
                    className={`block w-full text-left px-5 py-3 text-[15px] hover:bg-[#444] transition-colors border-b border-[#333] last:border-b-0 ${lang === l.code ? 'text-white font-semibold bg-[#333]' : 'text-white/80'
                      }`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={onMenuOpen}
            className="ml-4 flex h-10 w-10 flex-shrink-0 items-center justify-center cursor-pointer"
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}