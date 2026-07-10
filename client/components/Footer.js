"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ORANGE } from "./constants";

const translations = {
  en: {
    joinNow: "Join now",
    chooseProgram: "Choose a program",
    tos: "Terms of service",
    privacy: "Privacy policy",
    support: "Support",
    helpMsg: "Need help? Reach us at support@madmuscles.com",
    company: "AmoApps Limited, HE 450507, Nicosia, Cyprus"
  },
  hi: {
    joinNow: "अभी जुड़ें",
    chooseProgram: "कोई प्रोग्राम चुनें",
    tos: "सेवा की शर्तें",
    privacy: "गोपनीयता नीति",
    support: "सहायता",
    helpMsg: "मदद चाहिए? हमसे support@madmuscles.com पर संपर्क करें",
    company: "एमोऐप्स लिमिटेड, HE 450507, निकोसिया, साइप्रस"
  }
};

function AccordionRow({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ backgroundColor: '#2a2a2a', marginBottom: '8px' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        style={{ fontFamily: "'Inter', 'Inter Fallback', sans-serif" }}
      >
        <span className="text-[16px] font-semibold leading-[24px] text-white md:text-[18px] md:leading-[26px]">
          {title}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="flex-shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
        >
          <path d="M9 6l6 6-6 6" stroke="#8d8d8d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && children && (
        <div className="px-5 pb-4 text-[14px] leading-[22px] text-white/60">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Footer({ lang = 'en' }) {
  const t = translations[lang] || translations.en;
  const router = useRouter();

  return (
    <footer style={{ fontFamily: "'Inter', 'Inter Fallback', sans-serif" }}>

      {/* ===== JOIN NOW SECTION ===== */}
      <div
        className="relative px-6 py-20 text-center md:py-24"
        style={{
          backgroundColor: '#121212',
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,96,37,0.3) 0%, rgba(255,68,0,0) 100%), #121212',
        }}
      >
        <h2
          className="text-[34px] font-bold leading-[48px] tracking-[-0.022em] text-white lg:text-[48px] lg:leading-[67px]"
        >
          {t.joinNow}
        </h2>

        {/* CTA Button */}
        <div className="mx-auto mt-6 max-w-[380px]">
          <button
            onClick={() => router.push('/quiz')}
            className="inline-flex w-full items-center px-4 py-4 cursor-pointer transition-opacity hover:opacity-90"
            style={{ backgroundColor: ORANGE, borderRadius: 0, border: 'none' }}
          >
            <p
              className="w-full text-left text-[18px] font-semibold leading-[24px] text-white"
            >
              {t.chooseProgram}
            </p>
            <svg className="ml-auto flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* ===== FOOTER BOTTOM ===== */}
      <div
        className="px-6 py-12 md:py-16"
        style={{ backgroundColor: '#1e1e1e' }}
      >
        <div className="mx-auto max-w-[520px]">

          {/* App Store Badges */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://apps.apple.com/app/madmuscles"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition hover:opacity-80"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="Download on the App Store"
                className="h-[52px] w-auto object-contain"
              />
            </a>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition hover:opacity-80"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-[52px] w-auto object-contain"
              />
            </a>
          </div>

          {/* Accordion Links */}
          <div className="mt-8">
            <AccordionRow title={t.tos} />
            <AccordionRow title={t.privacy} />
            <AccordionRow title={t.support}>
              <p>{t.helpMsg}</p>
            </AccordionRow>
          </div>

          {/* Company Info */}
          <div className="mt-8 text-center text-[13px] leading-[20px] text-white/40">
            <p>{t.company}</p>
            <p className="mt-1">support@madmuscles.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
