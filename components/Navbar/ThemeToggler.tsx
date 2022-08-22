import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

import NavIconButton from "@/components/Navbar/NavIconButton";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      className="w-8 h-8 rounded-lg flex items-center justify-center hover:ring-2 ring-black dark:ring-white transition-all duration-300 focus:outline-none"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle Dark Mode"
    >
      {theme === "light" ? (
        <NavIconButton icon="moon" data-testid="dark theme" />
      ) : (
        <NavIconButton icon="sun" data-testid="light theme" />
      )}
    </button>
  );
}

export default ThemeToggle;
