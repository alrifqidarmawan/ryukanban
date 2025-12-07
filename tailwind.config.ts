import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        todo: 'var(--color-todo)',
        inprogress: 'var(--color-inprogress)',
        done: 'var(--color-done)',
        card: 'var(--color-card)',
      },
      boxShadow: {
        'neo': 'var(--shadow-neo)',
      }
    }
  },
  plugins: [],
};
export default config;

