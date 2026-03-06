/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0f",
        surface: "#111118",
        border: "#2a2a3a",
        accent: "#00e5a0",
        "accent-green": "#00e5a0",
        "text-primary": "#e8e8f0",
        "text-secondary": "#888899",
      },
      fontFamily: {
        sans: ["Inter", "Geist", "system-ui", "sans-serif"],
        hero: ["Diamond Grotesk", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        pulse_status: "pulse_status 2s ease-in-out infinite",
      },
      keyframes: {
        pulse_status: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 8px #00e5a0" },
          "50%": { opacity: "0.5", boxShadow: "0 0 20px #00e5a0" },
        },
      },
    },
  },
  plugins: [],
};
