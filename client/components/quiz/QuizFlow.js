"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import QuizHeader from "./QuizHeader";
import {
  RowSelect,
  GridSelect,
  SliderStep,
  MultiSelect,
  DietSelect,
  IconList,
  InfoStep,
  MeasurementStep,
} from "./QuizSteps";
import {STEPS,TOTAL_STEPS} from "../../app/lib/quizConfig";

const STEP_COMPONENTS = {
  "row-select": RowSelect,
  "grid-select": GridSelect,
  slider: SliderStep,
  "multi-select": MultiSelect,
  "diet-select": DietSelect,
  "icon-list": IconList,
  info: InfoStep,
  measurement: MeasurementStep,
};

export default function QuizFlow() {
  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const step = STEPS[stepIdx];
  const StepComponent = STEP_COMPONENTS[step.type];
  const isLastStep = stepIdx === STEPS.length - 1;

  async function handleSubmitQuiz() {
    try {
      setIsSubmitting(true);
      setSubmitError("");

      const heightAnswer = answers.height;
      const height = heightAnswer?.unit === "imperial"
        ? (Number(heightAnswer.ft) * 12 + Number(heightAnswer.in || 0)) * 2.54
        : Number(heightAnswer?.cm);

      // Map quiz answers to the API format. The measurement step stores metric
      // values as `cm`, and imperial values as `ft`/`in`.
      const quizData = {
        sessionId,
        answers: {
          gender: answers.gender,
          bodyType: answers['body-type'],
          goal: answers.goal,
          problemAreas: answers['problem-areas'] || [],
          height,
          heightUnit: heightAnswer?.unit || "metric",
        },
      };

      const validationErrors = [];
      if (!quizData.answers.gender) validationErrors.push("Choose a gender.");
      if (!quizData.answers.bodyType) validationErrors.push("Choose a body type.");
      if (!quizData.answers.goal) validationErrors.push("Choose a goal.");
      if (!quizData.answers.problemAreas.length) validationErrors.push("Select at least one problem area.");
      if (!Number.isFinite(height) || height <= 0) validationErrors.push("Enter a valid height.");

      if (validationErrors.length) {
        setSubmitError(validationErrors.join(" "));
        return;
      }

      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData),
      });

      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json")
        ? await response.json()
        : { message: "The quiz service returned an invalid response." };

      if (!response.ok) {
        setSubmitError(result.errors?.join(" ") || result.message || 'Failed to submit quiz');
        return;
      }

      // Save the quiz data for the personalized plan and for account linking.
      localStorage.setItem("quizSessionId", result.data.sessionId);
      localStorage.setItem("quizPlanAnswers", JSON.stringify(quizData.answers));

      // Redirect to success page
      router.push('/quiz-success');
    } catch (error) {
      console.error('Quiz submission error:', error);
      setSubmitError('Unable to submit your quiz right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleAnswer(value) {
    const nextAnswers = { ...answers, [step.id]: value };
    setAnswers(nextAnswers);

    if (stepIdx + 1 < STEPS.length) {
      setStepIdx(stepIdx + 1);
    }
  }

  function handleBack() {
    if (stepIdx === 0) {
      router.back();
      return;
    }
    setStepIdx(stepIdx - 1);
  }

  if (!StepComponent) return null;

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <QuizHeader stepIndex={stepIdx + 1} totalSteps={TOTAL_STEPS} onBack={handleBack} />
      <div className="flex flex-1 items-start justify-center px-6 py-12 sm:py-16">
        {/* key={step.id} forces a clean remount so each step starts with fresh local state */}
        <div className="w-full max-w-[600px]">
          <StepComponent key={step.id} step={step} onAnswer={handleAnswer} />
          
          {/* Show Submit Button on Last Step */}
          {isLastStep && (
            <div className="mt-12 space-y-4">
              {submitError && (
                <div role="alert" className="rounded-lg border border-red-400/40 bg-red-500/20 p-4 text-sm text-red-100">
                  <p className="font-semibold">Please fix the following before submitting:</p>
                  <p className="mt-1">{submitError}</p>
                </div>
              )}
              <button
                onClick={handleSubmitQuiz}
                disabled={isSubmitting}
                className="w-full rounded-lg bg-orange-500 py-4 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Complete Quiz'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
