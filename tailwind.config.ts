import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "cyber-slate": "#0b0f19",
        "neon-cyan": "#00f3ff",
        "neon-emerald": "#00ff88",
        "dark-zinc": "#18181b",
      },
    },
  },
  plugins: [],
};
export default config;
