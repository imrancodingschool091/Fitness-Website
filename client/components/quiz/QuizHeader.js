"use client";

import { ORANGE } from "../constants";

export default function QuizHeader({ stepIndex, totalSteps, onBack, lang = "en" }) {
  const percent = Math.max(4, Math.min(100, (stepIndex / totalSteps) * 100));

  return (
    <div className="sticky top-0 z-30 bg-black">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        {/* Back */}
        <button
          onClick={onBack}
          aria-label="Go back"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-opacity hover:opacity-70 disabled:opacity-30"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-1 text-[22px] font-extrabold tracking-tight">
          <span
            className="px-1 text-white"
            style={{ border: `2px solid ${ORANGE}`, color: ORANGE }}
          >
            MAD
          </span>
          <span className="px-1" style={{ backgroundColor: ORANGE, color: "white" }}>
            MUSCLES
          </span>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-6 text-white">
          <button className="hidden text-[15px] font-medium sm:block hover:opacity-80">Help</button>
          <button className="hidden text-[15px] font-medium sm:block hover:opacity-80">
            {lang === "en" ? "English" : "हिन्दी"}
          </button>
          <button aria-label="Menu" className="flex flex-col gap-[5px] p-1">
            <span className="block h-[2px] w-6 bg-white" />
            <span className="block h-[2px] w-6 bg-white" />
            <span className="block h-[2px] w-6 bg-white" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3 px-6 pb-2">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${percent}%`, backgroundColor: ORANGE }}
          />
        </div>
        <span className="whitespace-nowrap text-[13px] font-medium text-white/60">
          {stepIndex}/{totalSteps}
        </span>
      </div>
    </div>
  );
}