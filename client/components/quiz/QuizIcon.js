"use client";

// Lightweight inline-SVG icon set so the quiz has zero extra icon dependencies.
// Swap any of these for your own asset/icon library if you prefer.
const paths = {
  leaf: (
    <path d="M4 14c0-6 5-10 12-10 0 7-4 12-10 12H4v-2z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "leaf-outline": (
    <>
      <path d="M4 20c8-1 14-6 16-16C10 5 4 11 4 20z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 20c3-4 6-7 9-11" strokeLinecap="round" />
    </>
  ),
  egg: <ellipse cx="12" cy="13" rx="6" ry="8" />,
  olive: (
    <>
      <circle cx="9" cy="15" r="4" />
      <path d="M12 8c2-3 5-4 7-3-1 2-3 4-6 4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  apple: (
    <>
      <path d="M12 9c-4 0-7 3-7 7 0 3 2 5 4 5s2-1 3-1 1 1 3 1 4-2 4-5c0-3-2-5-4-6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 9c0-2 1-3 3-4" strokeLinecap="round" />
    </>
  ),
  icecream: (
    <>
      <path d="M8 10a4 4 0 018 0" strokeLinecap="round" />
      <path d="M8 10l4 11 4-11" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  soda: (
    <>
      <path d="M7 8h10l-1 12H8L7 8z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6h12" strokeLinecap="round" />
    </>
  ),
  "drop-1": <path d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z" strokeLinecap="round" strokeLinejoin="round" />,
  "drop-2": (
    <>
      <path d="M9 4s4 5 4 8a4 4 0 01-8 0c0-3 4-8 4-8z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 8s3 4 3 6a3 3 0 01-6 0c0-2 3-6 3-6z" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  "drop-3": (
    <>
      <path d="M7 6s3 4 3 6a3 3 0 01-6 0c0-2 3-6 3-6z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 3s4 5 4 8a4 4 0 01-8 0c0-3 4-8 4-8z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 8s3 4 3 6a3 3 0 01-6 0c0-2 3-6 3-6z" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  cloud: (
    <path d="M7 17a4 4 0 010-8 5 5 0 019.6-1.5A4 4 0 0119 17H7z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  cup: (
    <>
      <path d="M6 8h10v7a4 4 0 01-4 4H10a4 4 0 01-4-4V8z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 9h1.5a2.5 2.5 0 010 5H16" strokeLinecap="round" />
    </>
  ),
};

export default function QuizIcon({ name, size = 22, className = "" }) {
  const path = paths[name];
  if (!path) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
    >
      {path}
    </svg>
  );
}