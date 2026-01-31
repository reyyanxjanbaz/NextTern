/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary colors
        pastelGreen: '#A8D5BA',
        pastelGreenLight: '#C8E6C9',
        pastelGreenDark: '#81C784',
        // Secondary colors
        pastelRed: '#F4A5A5',
        pastelRedLight: '#FFCDD2',
        pastelRedDark: '#EF9A9A',
        // Background
        eggshell: '#F5F5F0',
        // Text colors
        deepBlue: '#0F172A',
        slateBlue: '#334155',
        steelGray: '#475569',
        // Neutral
        softGray: '#E8E8E3',
      },
    },
  },
  plugins: [],
}
