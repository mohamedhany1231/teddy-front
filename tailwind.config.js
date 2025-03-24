import fluid, { extract, screens, fontSize } from "fluid-tailwind";
/** @type {import('tailwindcss').Config} */

export default {
  content: { files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], extract },

  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      },
    },
    screens,
    fontSize,
  },
  plugins: [fluid],
};
