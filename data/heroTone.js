export const heroTone = {
  night: { ink: "#f7f0e4", accent: "#d4af37", bar: "dark" },
  gold: { ink: "#fff8e6", accent: "#f0d48a", bar: "dark" },
  champagne: { ink: "#fff6e8", accent: "#f3d5a0", bar: "dark" },
  teal: { ink: "#f4fff9", accent: "#2ec4b0", bar: "dark" },
  emerald: { ink: "#eefcf6", accent: "#3dd9a0", bar: "dark" },
  tiffany: { ink: "#f3fffc", accent: "#5fd4c4", bar: "dark" },
  blue: { ink: "#f4f8ff", accent: "#8ec5ff", bar: "dark" },
  midnight: { ink: "#e8f0ff", accent: "#6ea8ff", bar: "dark" },
  plum: { ink: "#f7eef8", accent: "#d4a0e0", bar: "dark" },
  amethyst: { ink: "#f6f0ff", accent: "#c4a0ff", bar: "dark" },
  rose: { ink: "#fff4f7", accent: "#f0a3b4", bar: "dark" },
  wine: { ink: "#fff0f2", accent: "#e08a9a", bar: "dark" },
  rouge: { ink: "#fff6f2", accent: "#ffb3b3", bar: "dark" },
  copper: { ink: "#fff4ea", accent: "#e8a070", bar: "dark" },
  coffee: { ink: "#f7f0e4", accent: "#f0d48a", bar: "dark" },
  ivory: { ink: "#1c120c", accent: "#d4af37", bar: "light" },
  cream: { ink: "#1c120c", accent: "#8a5a20", bar: "light" },
  pearl: { ink: "#1a1410", accent: "#c9b896", bar: "light" },
};

export const heroToneLabels = {
  night: "Night gold",
  gold: "Soft gold",
  champagne: "Champagne",
  teal: "Emerald teal",
  emerald: "Mint glow",
  tiffany: "Tiffany",
  blue: "Ice blue",
  midnight: "Midnight blue",
  plum: "Plum",
  amethyst: "Amethyst",
  rose: "Rose",
  wine: "Wine",
  rouge: "Rouge",
  copper: "Copper",
  coffee: "Coffee gold",
  ivory: "Ivory (dark text)",
  cream: "Cream (dark text)",
  pearl: "Pearl (dark text)",
};

export function themeKey(theme) {
  if (!theme) return "night";
  if (typeof theme === "string") return heroTone[theme] ? theme : "night";
  const match = Object.entries(heroTone).find(
    ([, tone]) => tone.ink === theme.ink && tone.accent === theme.accent && tone.bar === theme.bar,
  );
  return match?.[0] || "night";
}

export function resolveTone(theme) {
  return heroTone[themeKey(theme)] || heroTone.night;
}
