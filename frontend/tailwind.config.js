/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CDB4DB",
        secondary: "#FFC8DD",
        accent: "#FFAFCC",
        dark: "#2B2D42",
        light: "#F8F9FA",
      },
    },
  },
  plugins: [],
}
