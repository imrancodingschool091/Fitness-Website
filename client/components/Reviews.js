"use client";

import { useState } from "react";
import { ORANGE } from "./constants";

const translations = {
  en: {
    title: "And even more",
    outOf5: "out of 5",
    subdesc: "Over 200 000 5-star ratings from happy users (App Store & Play Market, June 2026)",
    disclaimer: "Featured comments/feedback from our clients. Reviews do not represent the typical user experience. You can read how we gather reviews in our ",
    policy: "Review Policy"
  },
  hi: {
    title: "और भी बहुत कुछ",
    outOf5: "में से 5",
    subdesc: "खुश उपयोगकर्ताओं की ओर से 200 000 से अधिक 5-स्टार रेटिंग (ऐप स्टोर और प्ले मार्केट, जून 2026)",
    disclaimer: "हमारे ग्राहकों की विशेष टिप्पणियां/प्रतिक्रिया। समीक्षाएं सामान्य उपयोगकर्ता अनुभव का प्रतिनिधित्व नहीं करती हैं। आप पढ़ सकते हैं कि हम अपनी ",
    policy: "समीक्षा नीति में समीक्षाएं कैसे एकत्र करते हैं"
  }
};

const ALL_TESTIMONIALS = [
  {
    name: "Edgar",
    avatar: "https://i.pravatar.cc/150?u=Edgar",
    rating: 5,
    quote: "I'm continously using taichi exercise, it's great awesome maintain my shape and got additional energy everyday. I want to try the chair taichi also.",
  },
  {
    name: "Abdullah Saeb Al Dandashi",
    avatar: "https://i.pravatar.cc/150?u=Abdullah",
    rating: 5,
    quote: "After three days Training I found this Training better than GYM Training.",
  },
  {
    name: "El Hefe",
    avatar: "https://i.pravatar.cc/150?u=Hefe",
    rating: 5,
    quote: "I started MadMuscles a few months ago and I am enjoying the program. I especially like the guided workouts and daily itinerary, which keeps me focused and moving. Keep up the great work! 💪",
  },
  {
    name: "Mark T.",
    avatar: "https://i.pravatar.cc/150?u=Mark",
    rating: 5,
    quote: "Amazing application for people who want to start their fitness journey at home. The meal plans are easy to follow and the workouts are challenging but doable.",
  },
  {
    name: "David S.",
    avatar: "https://i.pravatar.cc/150?u=David",
    rating: 5,
    quote: "Highly recommended! It pushes you to stay on track and get results quickly. The support team is also very responsive if you ever have questions.",
  },
  {
    name: "James",
    avatar: "https://i.pravatar.cc/150?u=James",
    rating: 5,
    quote: "The personalized plans are actually personalized. I feel the difference after just 2 weeks. Everything is tailored perfectly to my goals and equipment.",
  },
];

export default function Reviews({ lang = 'en' }) {
  const [page, setPage] = useState(0);
  const t = translations[lang] || translations.en;

  // 3 testimonials per page to match the reference exactly
  const CARDS_PER_PAGE = 3;
  const totalPages = Math.ceil(ALL_TESTIMONIALS.length / CARDS_PER_PAGE);
  const visible = ALL_TESTIMONIALS.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

  return (
    <section
      className="px-6 py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: '#181818', fontFamily: "'Inter', 'Inter Fallback', sans-serif" }}
    >
      <div className="mx-auto max-w-[1000px] text-center">
        {/* Title */}
        <h2 className="text-[28px] font-bold leading-[40px] tracking-[-0.021em] text-white md:text-[34px] md:leading-[48px] lg:text-[48px] lg:leading-[67px]">
          {t.title}
        </h2>

        {/* Rating Summary Box - VERY faint background matching reference */}
        <div 
          className="mx-auto mt-6 max-w-[340px] rounded-lg px-6 py-4" 
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}
        >
          <div className="flex justify-center gap-1 text-[18px]" style={{ color: ORANGE }}>
            ★★★★<span style={{ color: '#555' }}>★</span>
          </div>
          <p className="mt-1 text-[16px] font-bold text-white">
            <span style={{ color: ORANGE }}>4.4</span>{" "}
            <span className="text-white">{t.outOf5}</span>
          </p>
        </div>

        {/* Sub-description */}
        <p className="mx-auto mt-6 max-w-[600px] text-[15px] leading-[22px] font-bold text-white md:text-[16px] md:leading-[24px]">
          {t.subdesc}
        </p>

        {/* Testimonials Carousel */}
        <div className="relative mt-12 flex items-center justify-center w-full">
          
          {/* Prev Button */}
          <div className="absolute left-[-20px] lg:left-[-60px] z-10 flex items-center h-full">
            <button
              aria-label="Previous reviews"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:opacity-80 disabled:opacity-30 disabled:hover:opacity-30 cursor-pointer"
              style={{ backgroundColor: '#333' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M15 6l-6 6 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Cards */}
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 items-start">
            {visible.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-sm p-6 text-left"
                style={{ backgroundColor: '#222' }}
              >
                {/* Header: avatar + name + stars */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-8 w-8 rounded-full object-cover"
                      style={{ backgroundColor: '#444' }}
                    />
                    <span className="text-[14px] font-semibold text-white leading-[20px]">
                      {testimonial.name}
                    </span>
                  </div>
                  {/* Stars */}
                  <div className="flex gap-0.5 text-[14px] flex-shrink-0" style={{ color: ORANGE }}>
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
                {/* Quote */}
                <p className="mt-4 text-[14px] leading-[22px] text-white/70">
                  {testimonial.quote}
                </p>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <div className="absolute right-[-20px] lg:right-[-60px] z-10 flex items-center h-full">
            <button
              aria-label="Next reviews"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:opacity-80 disabled:opacity-30 disabled:hover:opacity-30 cursor-pointer"
              style={{ backgroundColor: '#333' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Go to page ${i + 1}`}
              className="h-2 w-2 rounded-full transition cursor-pointer"
              style={{ backgroundColor: page === i ? '#ffffff' : '#444' }}
            />
          ))}
        </div>

        {/* Legal disclaimer */}
        <p className="mx-auto mt-10 max-w-[800px] text-[13px] leading-[20px] text-white/40">
          {t.disclaimer}
          <a href="/review-policy" className="underline" style={{ color: '#888' }}>
            {t.policy}
          </a>
        </p>
      </div>
    </section>
  );
}
