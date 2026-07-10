"use client";

import Image from "next/image";
import { ORANGE } from "./constants";

const translations = {
  en: {
    current: "Current",
    workoutPlan: "Workout Plan",
    workoutDesc: "In our database, there are more than 200 exercises for different parts of the body",
    feat1: "We combine static and dynamic exercises to get the best result.",
    feat2: "A structured program to support your fitness journey",
    disclaimer: "*Weight-loss results are not guaranteed",
    mealPlan: "Meal plan based on your goal",
    mealDesc: "Mealplan is adjusted by your preferences and restrictions. Flexible meal plans built around your fitness goals and BMR — no foods totally off-limits."
  },
  hi: {
    current: "वर्तमान",
    workoutPlan: "वर्कआउट प्लान",
    workoutDesc: "हमारे डेटाबेस में, शरीर के विभिन्न हिस्सों के लिए 200 से अधिक व्यायाम हैं",
    feat1: "सर्वोत्तम परिणाम प्राप्त करने के लिए हम स्थिर और गतिशील व्यायामों का संयोजन करते हैं।",
    feat2: "आपकी फिटनेस यात्रा का समर्थन करने के लिए एक संरचित कार्यक्रम",
    disclaimer: "*वजन घटाने के परिणामों की गारंटी नहीं है",
    mealPlan: "आपके लक्ष्य के आधार पर भोजन योजना",
    mealDesc: "भोजन योजना को आपकी प्राथमिकताओं और प्रतिबंधों के अनुसार समायोजित किया गया है। आपके फिटनेस लक्ष्यों और बीएमआर के आसपास निर्मित लचीली भोजन योजनाएं — कोई भी भोजन पूरी तरह से वर्जित नहीं है।"
  }
};

export default function WorkoutAndMealPlan({ lang = 'en' }) {
  const t = translations[lang] || translations.en;

  return (
    <section
      className="px-6 py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: '#1e1e1e', fontFamily: "'Inter', 'Inter Fallback', sans-serif" }}
    >
      {/* ===== WORKOUT PLAN SECTION ===== */}
      <div className="mx-auto max-w-[900px]">
        {/* Desktop: 2-column (gauge left, text right). Mobile: single column centered */}
        <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:gap-12 lg:gap-16">

          {/* LEFT: Weight Gauge */}
          <div className="relative w-[280px] flex-shrink-0 md:w-[300px] lg:w-[340px]">
            <svg viewBox="0 0 220 130" className="w-full">
              <path
                d="M10 120 A100 100 0 0 1 210 120"
                fill="none"
                stroke="#2a2a2a"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <path
                d="M10 120 A100 100 0 0 1 178 45"
                fill="none"
                stroke={ORANGE}
                strokeWidth="14"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-x-0 top-8 flex flex-col items-center">
              <span className="text-[11px] font-semibold tracking-[0.15em] text-white/50 uppercase mt-18">
                {t.current}
              </span>
              <span className="mt-1 text-[36px] font-bold tracking-[-0.02em] text-white md:text-[40px]">
                88kg
              </span>
            </div>
            <div className="mt-1 flex justify-between px-1 text-[13px] font-medium text-white/50">
              <span>100</span>
              <span>70</span>
            </div>
          </div>

          {/* RIGHT: Title + Features */}
          <div className="mt-8 md:mt-0">
            <h2 className="text-[28px] font-bold leading-[40px] tracking-[-0.021em] text-white md:text-[34px] md:leading-[48px] lg:text-[48px] lg:leading-[67px]">
              {t.workoutPlan}
            </h2>
            <p className="mt-3 text-[15px] leading-[22px] tracking-[-0.006em] text-white/70 md:text-[16px] md:leading-[24px]">
              {t.workoutDesc}
            </p>

            {/* Feature list */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[18px] flex-shrink-0">🔥</span>
                <p className="text-[15px] leading-[22px] text-white">
                  {t.feat1}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[18px] flex-shrink-0">💪</span>
                <p className="text-[15px] leading-[22px] text-white">
                  {t.feat2}
                </p>
              </div>
            </div>

            <p className="mt-6 text-[14px] leading-[22px] text-white/40">
              {t.disclaimer}
            </p>
          </div>
        </div>
      </div>

      {/* ===== MEAL PLAN SECTION ===== */}
      <div className="mx-auto mt-16 max-w-[900px] md:mt-20 lg:mt-28">
        {/* Desktop: 2-column (text left, images right). Mobile: single column centered */}
        <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:gap-10 lg:gap-16">

          {/* LEFT: Title + Description */}
          <div className="md:flex-1 md:pt-4">
            <h2 className="text-[28px] font-bold leading-[40px] tracking-[-0.021em] text-white md:text-[34px] md:leading-[48px] lg:text-[48px] lg:leading-[67px]">
              {t.mealPlan}
            </h2>
            <p className="mt-6 text-[15px] leading-[22px] tracking-[-0.006em] text-white/70 md:text-[16px] md:leading-[24px]">
              {t.mealDesc}
            </p>
          </div>

          {/* RIGHT: 2x2 Food Image Grid */}
          <div
            className="mt-8 md:mt-0 md:flex-shrink-0"
            style={{ width: '100%', maxWidth: '360px' }}
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="relative overflow-hidden" style={{ paddingBottom: '100%' }}>
                <Image
                  src="/mealPlan.webp"
                  alt="Meal 1"
                  fill
                  sizes="180px"
                  className="object-cover object-center"
                />
              </div>
              <div className="relative overflow-hidden" style={{ paddingBottom: '100%' }}>
                <Image
                  src="/mealPlan.webp"
                  alt="Meal 2"
                  fill
                  sizes="180px"
                  className="object-cover object-right"
                />
              </div>
              <div className="relative overflow-hidden" style={{ paddingBottom: '100%' }}>
                <Image
                  src="/mealPlan.webp"
                  alt="Meal 3"
                  fill
                  sizes="180px"
                  className="object-cover object-left"
                />
              </div>
              <div className="relative overflow-hidden" style={{ paddingBottom: '100%' }}>
                <Image
                  src="/mealPlan.webp"
                  alt="Meal 4"
                  fill
                  sizes="180px"
                  className="object-cover object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
