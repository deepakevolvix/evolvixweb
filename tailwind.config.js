/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8e50bc', // User defined purple (Reverted)
        secondary: '#8e50bc', // Matching primary
        lime: '#8e50bc', // Replaced Lime with Purple
        dark: '#0F172A',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      }
    }
  },
  plugins: [],
}