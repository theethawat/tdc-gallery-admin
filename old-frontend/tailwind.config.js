/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: "IBM Plex Sans Thai",
      },
      colors: {
        tdc: {
          50: "#32ffe4",
          100: "#28f9da",
          200: "#1eefd0",
          300: "#14e5c6",
          400: "#0adbbc",
          500: "#00d1b2",
          600: "#00c7a8",
          700: "#00bd9e",
          800: "#00b394",
          900: "#00a98a",
        },
      },
    },
  },
  plugins: [],
};
