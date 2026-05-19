/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10154B",
        primary: "#1C2BE6",
        secondary: "#6B8EFF",
        accent: "#283BFF",
        surface: "#EBF3FF",
        coral: "#4867FF",
        mint: "#1A28B9",
        violetSoft: "#EBF3FF",
        deep: {
          50: "#EBF3FF",
          100: "#DAE8FF",
          200: "#BDD4FF",
          300: "#95B7FF",
          400: "#6B8EFF",
          500: "#4867FF",
          600: "#283BFF",
          700: "#1C2BE6",
          800: "#1A28B9",
          900: "#1E2B91",
          950: "#10154B"
        },
        brand: {
          orange: "#FF8200",
          green: "#86B800",
          teal: "#0A9FAA",
          pink: "#D90072",
          yellow: "#FFD009"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(16, 21, 75, 0.14)"
      }
    }
  },
  plugins: []
};
