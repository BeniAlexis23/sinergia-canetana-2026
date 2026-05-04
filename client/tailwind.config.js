/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101828",
        primary: "#6d28d9",
        secondary: "#f4b400",
        coral: "#ef5b5b",
        mint: "#0f766e",
        violetSoft: "#f3efff"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(16, 24, 40, 0.12)"
      }
    }
  },
  plugins: []
};
