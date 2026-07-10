// lib/quizConfig.js
// Simplified quiz with core questions only

export const TOTAL_STEPS = 5; // shown as "x/5" in the progress bar

export const STEPS = [
  {
    id: "gender",
    type: "row-select",
    title: "Choose your gender",
    options: [
      { value: "male", label: "Male", image: "/SLIM_BODY (1).webp" },
      { value: "female", label: "Female", image: "/FROM_25_TO_29.webp" },
    ],
  },
  {
    id: "body-type",
    type: "grid-select",
    title: "Choose your body type",
    options: [
      { value: "slim", label: "Slim", image: "/SLIM_BODY (1).webp" },
      { value: "average", label: "Average", image: "/FROM_25_TO_29_NEW2.webp" },
      { value: "big", label: "Big", image: "/FROM_35_TO_39_NEW2.webp" },
      { value: "heavy", label: "Heavy", image: "/MORE_THAN_40NEW.webp" },
    ],
  },
  {
    id: "goal",
    type: "row-select",
    title: "Choose your goal",
    options: [
      { value: "lose-weight", label: "Lose Weight", image: "/FROM_25_TO_29.webp" },
      { value: "gain-muscle", label: "Gain Muscle Mass", image: "/FROM_25_TO_29 (1).webp" },
      { value: "get-shredded", label: "Get Shredded", image: "/FROM_35_TO_39.webp" },
    ],
  },
  {
    id: "problem-areas",
    type: "multi-select",
    title: "Select problem areas",
    options: [
      { value: "chest", label: "Chest" },
      { value: "arms", label: "Arms" },
      { value: "belly", label: "Belly" },
      { value: "legs", label: "Legs" },
      { value: "full-body", label: "Full body" },
    ],
  },
  {
    id: "height",
    type: "measurement",
    title: "What is your height?",
    label: "Height",
    units: [
      { value: "imperial", label: "ft, in" },
      { value: "metric", label: "cm" },
    ],
    defaultUnit: "metric",
  },
];