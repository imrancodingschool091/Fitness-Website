"use client";

import { useState } from "react";
import Image from "next/image";
import { ORANGE } from "../constants";
import QuizIcon from "./QuizIcon";

/* -------------------------------------------------------------------------- */
/* Shared bits                                                                */
/* -------------------------------------------------------------------------- */

function ContinueButton({ enabled, onClick, children = "Continue" }) {
  return (
    <button
      onClick={enabled ? onClick : undefined}
      disabled={!enabled}
      className="mt-8 w-full rounded-full py-4 text-[17px] font-semibold text-white transition-opacity disabled:cursor-not-allowed"
      style={{ backgroundColor: enabled ? ORANGE : "rgba(255,90,31,0.35)" }}
    >
      {children}
    </button>
  );
}

function StepTitle({ children }) {
  return (
    <h1 className="mb-10 text-center text-[30px] font-extrabold leading-tight text-white sm:text-[36px]">
      {children}
    </h1>
  );
}

/* -------------------------------------------------------------------------- */
/* row-select: full width rows, label left, image right — auto advances      */
/* used by: gender, goal, target-body                                        */
/* -------------------------------------------------------------------------- */

export function RowSelect({ step, onAnswer }) {
  const [selected, setSelected] = useState(null);

  function pick(value) {
    setSelected(value);
    setTimeout(() => onAnswer(value), 220); // small delay so the highlight is visible
  }

  return (
    <div className="mx-auto w-full max-w-[600px]">
      <StepTitle>{step.title}</StepTitle>
      <div className="flex flex-col gap-4">
        {step.options.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => pick(opt.value)}
              className="flex items-center justify-between overflow-hidden rounded-lg px-8 text-left transition-colors"
              style={{ backgroundColor: isSelected ? "#3a2318" : "#1a1a1a" }}
            >
              <span className="text-[20px] font-semibold text-white">{opt.label}</span>
              {opt.image && (
                <div className="relative h-[130px] w-[110px] shrink-0">
                  <Image src={opt.image} alt={opt.label} fill sizes="110px" className="object-contain object-bottom" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* grid-select: 2x2 image grid — auto advances                                */
/* used by: body-type                                                        */
/* -------------------------------------------------------------------------- */

export function GridSelect({ step, onAnswer }) {
  const [selected, setSelected] = useState(null);

  function pick(value) {
    setSelected(value);
    setTimeout(() => onAnswer(value), 220);
  }

  return (
    <div className="mx-auto w-full max-w-[700px]">
      <StepTitle>{step.title}</StepTitle>
      <div className="grid grid-cols-2 gap-6">
        {step.options.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => pick(opt.value)}
              className="flex flex-col items-center overflow-hidden rounded-lg transition-colors"
              style={{ backgroundColor: isSelected ? "#3a2318" : "#1a1a1a" }}
            >
              <div className="relative h-[220px] w-full">
                <Image src={opt.image} alt={opt.label} fill sizes="(max-width: 640px) 50vw, 350px" className="object-contain" />
              </div>
              <div className="w-full bg-black/30 py-3 text-center text-[18px] font-bold text-white">
                {opt.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* slider: body-fat style slider with preview image + explicit Continue      */
/* -------------------------------------------------------------------------- */

export function SliderStep({ step, onAnswer }) {
  const [index, setIndex] = useState(step.defaultIndex ?? 0);

  return (
    <div className="mx-auto w-full max-w-[520px] text-center">
      <StepTitle>{step.title}</StepTitle>

      {step.image && (
        <div className="relative mx-auto mb-8 h-[320px] w-[220px]">
          <Image src={step.image} alt="Preview" fill sizes="220px" className="object-contain" />
        </div>
      )}

      <div className="rounded-xl bg-[#1a1a1a] px-6 py-6">
        <div className="mb-4 inline-block rounded-md bg-[#2a2a2a] px-4 py-2 text-[15px] font-semibold text-white">
          {step.marks[index]}
        </div>
        <input
          type="range"
          min={step.min}
          max={step.max}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          className="w-full accent-[#FF5A1F]"
          style={{ accentColor: ORANGE }}
        />
        <div className="mt-3 flex justify-between text-[14px] font-medium text-white/70">
          <span>{step.minLabel}</span>
          <span>{step.maxLabel}</span>
        </div>
      </div>

      <ContinueButton enabled onClick={() => onAnswer(step.marks[index])} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* multi-select: plain pill cards (problem areas) — explicit Continue        */
/* -------------------------------------------------------------------------- */

export function MultiSelect({ step, onAnswer }) {
  const [selected, setSelected] = useState([]);

  function toggle(value) {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <StepTitle>{step.title}</StepTitle>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
        {step.image && (
          <div className="relative mx-auto h-[260px] w-[160px] shrink-0 sm:mx-0">
            <Image src={step.image} alt="" fill sizes="160px" className="object-contain" />
          </div>
        )}
        <div className="flex w-full flex-col gap-3">
          {step.options.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => toggle(opt.value)}
                className="rounded-lg py-4 text-center text-[17px] font-bold transition-colors"
                style={{
                  backgroundColor: isSelected ? ORANGE : "#1a1a1a",
                  color: "white",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <ContinueButton enabled={selected.length > 0} onClick={() => onAnswer(selected)} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* diet-select: icon + label + description cards, plus an exclusive "No"     */
/* row — explicit Continue                                                   */
/* -------------------------------------------------------------------------- */

export function DietSelect({ step, onAnswer }) {
  const [selected, setSelected] = useState([]);

  function toggle(value) {
    if (value === step.exclusiveOption?.value) {
      setSelected((prev) => (prev.includes(value) ? [] : [value]));
      return;
    }
    setSelected((prev) => {
      const withoutExclusive = prev.filter((v) => v !== step.exclusiveOption?.value);
      return withoutExclusive.includes(value)
        ? withoutExclusive.filter((v) => v !== value)
        : [...withoutExclusive, value];
    });
  }

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <StepTitle>{step.title}</StepTitle>

      <div className="flex flex-col gap-4">
        {step.options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              onClick={() => toggle(opt.value)}
              className="flex items-center gap-4 rounded-lg px-6 py-4 text-left transition-colors"
              style={{ backgroundColor: isSelected ? "#3a2318" : "#1a1a1a" }}
            >
              <QuizIcon name={opt.icon} size={26} className="shrink-0 text-white" />
              <div>
                <div className="text-[17px] font-bold text-white">{opt.label}</div>
                <div className="text-[14px] text-white/60">{opt.description}</div>
              </div>
            </button>
          );
        })}

        {step.exclusiveOption && (
          <>
            <div className="my-1 h-px bg-white/10" />
            <button
              onClick={() => toggle(step.exclusiveOption.value)}
              className="flex items-center justify-between rounded-lg px-6 py-4 text-left transition-colors"
              style={{
                backgroundColor: selected.includes(step.exclusiveOption.value) ? "#3a2318" : "#1a1a1a",
              }}
            >
              <span className="text-[17px] font-bold text-white">{step.exclusiveOption.label}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      <ContinueButton enabled={selected.length > 0} onClick={() => onAnswer(selected)} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* icon-list: icon + label (+ optional sub-label) rows — auto advances       */
/* used by: sugar-frequency, water-intake                                    */
/* -------------------------------------------------------------------------- */

export function IconList({ step, onAnswer }) {
  const [selected, setSelected] = useState(null);

  function pick(value) {
    setSelected(value);
    setTimeout(() => onAnswer(value), 220);
  }

  const allOptions = step.exclusiveOption ? [...step.options, step.exclusiveOption] : step.options;

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <StepTitle>{step.title}</StepTitle>
      <div className="flex flex-col gap-4">
        {allOptions.map((opt, i) => {
          const isSelected = selected === opt.value;
          const isExclusive = step.exclusiveOption && opt.value === step.exclusiveOption.value;
          return (
            <div key={opt.value}>
              {isExclusive && <div className="my-2 h-px bg-white/10" />}
              <button
                onClick={() => pick(opt.value)}
                className="flex w-full items-center gap-4 rounded-lg px-6 py-4 text-left transition-colors"
                style={{ backgroundColor: isSelected ? "#3a2318" : "#1a1a1a" }}
              >
                <QuizIcon name={opt.icon} size={24} className="shrink-0 text-white" />
                <div>
                  <div className="text-[16px] font-bold text-white">{opt.label}</div>
                  {opt.sub && <div className="text-[13px] text-white/50">{opt.sub}</div>}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* info: educational interstitial (image + heading + checklist)              */
/* -------------------------------------------------------------------------- */

export function InfoStep({ step, onAnswer }) {
  return (
    <div className="mx-auto w-full max-w-[560px] text-center">
      {step.image && (
        <div className="relative mx-auto mb-8 h-[350px] w-full max-w-[480px] overflow-hidden rounded-xl">
          <Image src={step.image} alt="" fill sizes="(max-width: 560px) 100vw, 480px" className="object-cover" />
        </div>
      )}
      <h1 className="mb-6 whitespace-pre-line text-[28px] font-extrabold leading-tight text-white sm:text-[32px]">
        {step.heading}
      </h1>
      {step.intro && <p className="mb-6 text-left text-[16px] text-white/80">{step.intro}</p>}
      <ul className="flex flex-col gap-4 text-left">
        {step.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-[16px] text-white">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              className="mt-[2px] shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12.5l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <ContinueButton enabled onClick={() => onAnswer(true)} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* measurement: unit toggle + numeric field + consent checkbox               */
/* used by: height (reuse for weight too)                                    */
/* -------------------------------------------------------------------------- */

export function MeasurementStep({ step, onAnswer }) {
  const [unit, setUnit] = useState(step.defaultUnit);
  const [value, setValue] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [consent, setConsent] = useState(false);

  const isMetric = unit === "metric";
  const metricHeight = Number(value);
  const imperialFeet = Number(feet);
  const imperialInches = Number(inches || 0);
  const hasValue = isMetric
    ? Number.isFinite(metricHeight) && metricHeight > 0
    : Number.isFinite(imperialFeet) && imperialFeet > 0 && Number.isFinite(imperialInches) && imperialInches >= 0 && imperialInches < 12;
  const canContinue = hasValue && consent;

  function submit() {
    if (!canContinue) return;
    onAnswer(isMetric ? { unit, cm: value } : { unit, ft: feet, in: inches });
  }

  return (
    <div className="mx-auto w-full max-w-[520px]">
      <StepTitle>{step.title}</StepTitle>

      <div className="mb-8 flex items-center gap-3">
        <span className="text-[15px] text-white/60">Units</span>
        <div className="flex overflow-hidden rounded-full border border-white/20">
          {step.units.map((u) => (
            <button
              key={u.value}
              onClick={() => setUnit(u.value)}
              className="px-5 py-2 text-[14px] font-semibold text-white transition-colors"
              style={{
                backgroundColor: unit === u.value ? "transparent" : "transparent",
                border: unit === u.value ? `1px solid ${ORANGE}` : "1px solid transparent",
              }}
            >
              {u.label}
            </button>
          ))}
        </div>
      </div>

      <label className="mb-2 block text-[15px] text-white/70">
        {step.label} ({isMetric ? "cm" : "ft, in"})
      </label>

      {isMetric ? (
        <div className="mb-8 flex items-end gap-2 border-b border-white/30 pb-2">
          <input
            type="number"
            inputMode="numeric"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="___"
            className="w-24 bg-transparent text-[20px] text-white placeholder-white/30 outline-none"
          />
          <span className="pb-1 text-[16px] text-white/60">cm</span>
        </div>
      ) : (
        <div className="mb-8 flex items-end gap-6">
          <div className="flex items-end gap-2 border-b border-white/30 pb-2">
            <input
              type="number"
              inputMode="numeric"
              value={feet}
              onChange={(e) => setFeet(e.target.value)}
              placeholder="_"
              className="w-12 bg-transparent text-[20px] text-white placeholder-white/30 outline-none"
            />
            <span className="pb-1 text-[16px] text-white/60">ft</span>
          </div>
          <div className="flex items-end gap-2 border-b border-white/30 pb-2">
            <input
              type="number"
              inputMode="numeric"
              value={inches}
              onChange={(e) => setInches(e.target.value)}
              placeholder="_"
              className="w-12 bg-transparent text-[20px] text-white placeholder-white/30 outline-none"
            />
            <span className="pb-1 text-[16px] text-white/60">in</span>
          </div>
        </div>
      )}

      <label className="mb-6 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[#FF5A1F]"
          style={{ accentColor: ORANGE }}
        />
        <span className="text-[14px] leading-relaxed text-white/80">
          {step.consentText}{" "}
          <a href="/privacy" className="underline" style={{ color: ORANGE }}>
            {step.consentLinkText}
          </a>
        </span>
      </label>

      <p className="mb-8 text-[13px] text-white/50">
        {step.withdrawText}{" "}
        <a href="/contact" className="underline" style={{ color: "white" }}>
          {step.withdrawLinkText}
        </a>{" "}
        anytime.
      </p>

      <ContinueButton enabled={canContinue} onClick={submit} />
    </div>
  );
}
