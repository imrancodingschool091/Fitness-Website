"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import Hero from "@/components/Hero";
import WorkoutAndMealPlan from "@/components/WorkoutAndMealPlan";
import HabitAndResults from "@/components/HabitAndResults";
import Reviews from "@/components/Reviews";
import VideoSection from "@/components/VideoSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState("en");

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#121212' }}>
      <Header onMenuOpen={() => setMenuOpen(true)} lang={lang} setLang={setLang} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} lang={lang} />
      <Hero lang={lang} />
      <WorkoutAndMealPlan lang={lang} />
      <HabitAndResults lang={lang} />
      <Reviews lang={lang} />
      <VideoSection />
      <Footer lang={lang} />
    </main>
  );
}
