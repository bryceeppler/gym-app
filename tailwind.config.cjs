/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkgray: "#111111",
        paper: "#181818",
        lightpurple: "#6F52D7",
        darkpurple: "#4E3A8D",
        lightgreen: "#87C28A",
        iceblue: "#649EC8",
        lightyellow: "#FFD47F",
        base: "#1E1E3B",
        baselight: "#2C2C51",
        paper: "#38375E",
      },
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      heading: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [],
};
