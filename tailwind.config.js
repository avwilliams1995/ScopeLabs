/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        main: "#A1E3D2",
        secondary: "#FEC952"
      },
    },
  },
  plugins: [],
};
