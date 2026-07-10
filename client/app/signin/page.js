"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import { ORANGE } from "@/components/constants";

export default function SignInPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Get quiz session ID from localStorage
      const quizSessionId = localStorage.getItem("quizSessionId");

      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          quizSessionId: quizSessionId || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sign in failed");
      }

      // Save auth data to localStorage
      localStorage.setItem("userId", data._id);
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);

      // Clear quiz session ID after linking
      if (quizSessionId) {
        localStorage.removeItem("quizSessionId");
      }

      // Redirect to dashboard or home
      router.push("/pricing");
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: '#121212', fontFamily: "'Inter', 'Inter Fallback', sans-serif" }}>
      <Header onMenuOpen={() => setMenuOpen(true)} lang={lang} setLang={setLang} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} lang={lang} />
      
      <div className="flex-1 flex flex-col items-center px-6 py-12 md:py-16">
        <div className="w-full max-w-[420px]">
          
          {/* Back Button */}
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-[15px] font-semibold transition-opacity hover:opacity-80"
            style={{ color: ORANGE }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>

          {/* Heading */}
          <h1 className="mt-6 text-[32px] font-bold leading-[40px] tracking-tight text-white md:text-[36px] md:leading-[44px]">
            Sign In
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-[16px] leading-[24px] text-white/90">
            Enter your e-mail address to access your account.
          </p>

          {/* Form */}
          <form onSubmit={handleSignIn} className="mt-8">
            <label className="block text-[15px] font-medium text-white mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md px-4 py-4 text-[16px] text-white outline-none focus:ring-1 focus:ring-orange-500 transition"
              style={{ backgroundColor: '#1e1e1e', border: '1px solid rgba(255, 255, 255, 0.1)' }}
            />

            {error && (
              <div className="mt-4 p-3 rounded-md bg-red-500/20 text-red-200 text-sm">
                {error}
              </div>
            )}
          </form>

          {/* Contact Us Row */}
          <div className="mt-12 flex items-center justify-between">
            <span className="text-[16px] font-bold text-white">
              Any questions?
            </span>
            <button
              className="px-6 py-2.5 rounded-sm font-semibold text-[15px] transition-colors"
              style={{ border: `1px solid ${ORANGE}`, color: ORANGE }}
            >
              Contact us
            </button>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleSignIn}
            disabled={!email || isLoading}
            className="mt-12 w-full flex items-center justify-between px-6 py-4 rounded-sm transition-opacity"
            style={{
              backgroundColor: email ? ORANGE : '#3a2015',
              color: email ? 'white' : 'rgba(255, 255, 255, 0.4)',
              border: 'none',
              opacity: isLoading ? 0.7 : 1,
              cursor: email && !isLoading ? 'pointer' : 'not-allowed',
            }}
          >
            <span className="text-[18px] font-semibold">
              {isLoading ? 'Signing in...' : 'Continue'}
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          
        </div>
      </div>
    </main>
  );
}


