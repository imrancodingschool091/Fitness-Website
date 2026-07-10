"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const goalPlans = {
  "lose-weight": {
    title: "Fat-loss foundation plan",
    summary: "Build sustainable habits with strength training, daily movement, and balanced meals.",
    workouts: ["Full-body strength Â· 35 min", "Brisk walk or cycling Â· 30 min", "Full-body strength Â· 35 min", "Mobility + easy walk Â· 20 min"],
    nutrition: "Prioritize protein and vegetables at each meal, and choose a modest calorie deficit instead of extreme dieting.",
  },
  "gain-muscle": {
    title: "Muscle-building starter plan",
    summary: "Progressively build strength while giving your body enough fuel and recovery.",
    workouts: ["Upper-body strength Â· 40 min", "Lower-body strength Â· 40 min", "Rest or easy mobility Â· 20 min", "Full-body strength Â· 40 min"],
    nutrition: "Include protein in every meal, add energy-rich whole foods, and eat consistently to support training recovery.",
  },
  "get-shredded": {
    title: "Lean strength plan",
    summary: "Keep strength as the priority while adding focused conditioning and consistent recovery.",
    workouts: ["Strength circuit Â· 40 min", "Interval cardio Â· 20 min", "Strength circuit Â· 40 min", "Mobility + easy walk Â· 20 min"],
    nutrition: "Base meals on lean protein, fibre-rich carbohydrates, vegetables, and adequate water; avoid aggressive restriction.",
  },
};

const areaLabels = {
  chest: "chest",
  arms: "arms",
  belly: "core",
  legs: "legs",
  "full-body": "full body",
};

export default function QuizSuccessPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const savedAnswers = localStorage.getItem("quizPlanAnswers");
        if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
      } catch {
        localStorage.removeItem("quizPlanAnswers");
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const plan = goalPlans[answers?.goal] || goalPlans["get-shredded"];
  const focusAreas = (answers?.problemAreas || []).map((area) => areaLabels[area]).filter(Boolean);
  const focusText = focusAreas.length ? focusAreas.join(", ") : "full-body strength";

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-12 text-white sm:py-16">
      <section className="mx-auto w-full max-w-[720px]">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold" aria-hidden="true">âœ“</div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-400">Your personalized plan</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{plan.title}</h1>
        <p className="mt-4 max-w-[620px] text-lg leading-7 text-white/70">{plan.summary}</p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/[0.06] p-6">
            <h2 className="text-xl font-bold">Your weekly schedule</h2>
            <ol className="mt-5 space-y-4">
              {plan.workouts.map((workout, index) => (
                <li key={`${workout}-${index}`} className="flex items-center gap-3 text-white/85">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold">{index + 1}</span>
                  {workout}
                </li>
              ))}
            </ol>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.06] p-6">
            <h2 className="text-xl font-bold">Your focus</h2>
            <p className="mt-4 text-white/75">Your sessions will emphasize <span className="font-semibold text-white">{focusText}</span> while keeping your program balanced.</p>
            <h3 className="mt-6 font-semibold text-orange-400">Nutrition guideline</h3>
            <p className="mt-2 text-sm leading-6 text-white/70">{plan.nutrition}</p>
            <p className="mt-5 text-sm text-white/50">Take at least one full rest day each week and adjust intensity if you feel persistent pain or unusual fatigue.</p>
          </article>
        </div>

        <p className="mt-6 text-sm leading-6 text-white/45">This suggestion is for general fitness information and is not medical advice. Consult a qualified professional for individual health concerns.</p>

        <button onClick={() => router.push("/signup")} className="mt-9 w-full rounded-lg bg-orange-500 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90">
          Create account and choose a plan
        </button>
        <button onClick={() => router.push("/")} className="mt-4 w-full rounded-lg border border-white/20 py-4 font-semibold text-white transition-colors hover:bg-white/10">
          Go back home
        </button>
      </section>
    </main>
  );
}

