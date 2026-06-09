/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        woohl: {
          orange: '#F34F17',
          green: '#10B981',
          red: '#EF4444',
          blue: '#1D4ED8',
          dark: '#0A1628',
          bg: '#FAFAFA',
          offwhite: '#FCFCFC',
        }
      }
    },
  },
  plugins: [],
}
