/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "'Roboto Serif', serif;",
        inter: "'Inter', sans-serif;",
      },

      colors: {
        primary: "#0026AB",
        primaryShade: "#E5E9F7",
        customGreen: "#00B812",
        customRed: "#FF0000",
        customGolden: "#FFC700",
      },
    },
  },
  plugins: [],
};
