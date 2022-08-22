import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

import NavIconButton from "@/components/Navbar/NavIconButton";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return theme === "light" ? (
    <NavIconButton
      icon="moon"
      data-testid="dark theme"
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    />
  ) : (
    <NavIconButton
      icon="sun"
      data-testid="light theme"
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    />
  );
}

export default ThemeToggle;
