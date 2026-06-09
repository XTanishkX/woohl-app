/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        woohl: {
          orange: '#FF6A00',
          dark: '#0A1628',
          bg: '#FAFAF9',
          offwhite: '#FCFCFC',
          purple: {
            100: '#F3E8FF',
            500: '#A855F7',
            600: '#9333EA',
          },
          blue: {
            100: '#DBEAFE',
            500: '#3B82F6',
          }
        }
      }
    },
  },
  plugins: [],
}
