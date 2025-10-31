/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate"
export default {
content: [
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/pattern/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/@screen/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssAnimate],
};
