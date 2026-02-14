"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "paytm-wallet-theme";

export function ThemeToggle(): JSX.Element {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;

    root.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    document.documentElement.classList.toggle("dark", nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme ? "dark" : "light");
    setIsDark(nextTheme);
  };

  if (!mounted) {
    return <div className="h-10 w-16 rounded-full bg-white/40" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="glass-toggle relative flex h-10 w-16 items-center rounded-full border border-white/50 px-1 transition-all duration-300"
    >
      <span
        className={`absolute h-7 w-7 rounded-full bg-gradient-to-br from-white to-slate-200 shadow-md transition-transform duration-300 ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      />
      <span className="sr-only">Theme toggle</span>
    </button>
  );
}
