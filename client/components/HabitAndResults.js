"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ORANGE } from "./constants";

const translations = {
  en: {
    workouts: "workouts completed which equals over",
    years: "7 years of training",
    biceps: "pumped bicepses",
    started: "started their fitness journey with us",
    habitSystem: "Habit building system",
    habitDesc1: "Improve not only physique but also develop healthy habits and fortitude.",
    habitDesc2: "With MadMuscles, you can build healthy routines, stay motivated, and take on new personal challenges.",
    resultsTitle: "Results we are proud of",
    anyQuestions: "Any questions?",
    supportAgents: "Our support agents will help you quickly!",
    supportBtn: "Support"
  },
  hi: {
    workouts: "पूरे किए गए वर्कआउट जो इसके बराबर हैं",
    years: "7 साल का प्रशिक्षण",
    biceps: "पंप किए गए बाइसेप्स",
    started: "हमारे साथ अपनी फिटनेस यात्रा शुरू की",
    habitSystem: "आदत निर्माण प्रणाली",
    habitDesc1: "न केवल काया में सुधार करें बल्कि स्वस्थ आदतें और दृढ़ संकल्प भी विकसित करें।",
    habitDesc2: "मैडमसल के साथ, आप स्वस्थ दिनचर्या बना सकते हैं, प्रेरित रह सकते हैं और नई व्यक्तिगत चुनौतियों का सामना कर सकते हैं।",
    resultsTitle: "परिणाम जिन पर हमें गर्व है",
    anyQuestions: "कोई सवाल?",
    supportAgents: "हमारे सहायता एजेंट आपकी तुरंत मदद करेंगे!",
    supportBtn: "सहायता"
  }
};

export default function HabitAndResults({ lang = 'en' }) {
  const t = translations[lang] || translations.en;
  const router = useRouter();

  const stats = [
    {
      icon: "🎯",
      value: "115 000",
      label: t.workouts,
      highlight: t.years,
    },
    { icon: "💪", value: "60 000", label: t.biceps },
    {
      icon: "🤩",
      value: "4+ Million",
      label: t.started,
    },
  ];

  return (
    <section
      style={{ backgroundColor: '#121212', fontFamily: "'Inter', 'Inter Fallback', sans-serif" }}
    >
      {/* ===== HABIT BUILDING SECTION ===== */}
      <div className="px-6 py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1000px]">
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between lg:gap-16">
            
            {/* Left: Image */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image 
                  src="/habit-training.png" 
                  alt="Habit building system" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center" 
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-1/2 text-left">
              <h2 className="text-[28px] font-bold leading-[40px] tracking-[-0.021em] text-white md:text-[34px] md:leading-[48px] lg:text-[48px] lg:leading-[67px]">
                {t.habitSystem}
              </h2>
              <p className="mt-6 text-[15px] leading-[22px] tracking-[-0.006em] text-white/70 md:text-[16px] md:leading-[26px]">
                {t.habitDesc1}
              </p>
              <p className="mt-4 text-[15px] leading-[22px] tracking-[-0.006em] text-white/70 md:text-[16px] md:leading-[26px]">
                {t.habitDesc2}
              </p>
            </div>
            
          </div>
        </div>
      </div>

      {/* ===== RESULTS SECTION ===== */}
      <div className="px-6 pb-16 md:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="text-[28px] font-bold leading-[40px] tracking-[-0.021em] text-white text-center md:text-[34px] md:leading-[48px] lg:text-[48px] lg:leading-[67px]">
            {t.resultsTitle}
          </h2>

          {/* Desktop 3-column grid, Mobile stacked or 2-column hybrid */}
          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-start ${index === 0 ? 'sm:col-span-2 md:col-span-1' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[28px]">{stat.icon}</span>
                  <span className="text-[28px] font-bold leading-[40px] tracking-[-0.021em] text-white md:text-[34px] md:leading-[48px]">
                    {stat.value}
                  </span>
                </div>
                <p className="mt-2 text-[15px] leading-[22px] text-white/70 md:text-[16px]">
                  {stat.label}
                  {stat.highlight && (
                    <>
                      <br />
                      <span className="font-bold" style={{ color: ORANGE }}>
                        {stat.highlight}
                      </span>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== ANY QUESTIONS SECTION ===== */}
      <div className="px-6 pb-16 md:pb-20 lg:pb-24">
        <div className="relative mx-auto max-w-[500px] min-h-[150px] px-10 py-12 text-center flex flex-col items-center justify-center">
          
          {/* Subtle cyan radial glow behind text */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ 
              background: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.12) 0%, transparent 65%)' 
            }}
          />

          {/* Orange corner brackets */}
          <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2" style={{ borderColor: ORANGE }} />
          <span className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2" style={{ borderColor: ORANGE }} />
          <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2" style={{ borderColor: ORANGE }} />
          <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2" style={{ borderColor: ORANGE }} />

          <h3 className="relative text-[24px] font-bold leading-[34px] tracking-[-0.018em] text-white md:text-[28px] md:leading-[40px]">
            {t.anyQuestions}
          </h3>
          <p className="relative mt-3 text-[16px] leading-[24px] text-white/70 md:text-[18px] md:leading-[26px]">
            {t.supportAgents}
          </p>

          <div className="relative mt-6 flex justify-center">
            <button
              onClick={() => router.push('/quiz')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 cursor-pointer transition-opacity hover:opacity-90"
              style={{ backgroundColor: ORANGE, borderRadius: 0, border: 'none' }}
            >
              <span className="text-[16px] font-semibold leading-[24px] text-white" style={{ fontFamily: "'Inter', 'Inter Fallback', sans-serif" }}>
                {t.supportBtn}
                
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
