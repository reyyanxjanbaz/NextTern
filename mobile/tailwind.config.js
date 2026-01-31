/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        eggshell: '#FDFBF7',
        deepBlue: '#0F172A',
        slateBlue: '#334155',
        steelGray: '#475569',
      },
    },
  },
  plugins: [],
}
