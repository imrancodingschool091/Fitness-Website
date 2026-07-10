import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Personalized workout program - MadMuscles",
  description: "MadMuscles is a workout and nutrition app. Get a program that is tailored to your goals, age and fitness level.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "'Inter', 'Inter Fallback', sans-serif" }}>{children}</body>
    </html>
  );
}
