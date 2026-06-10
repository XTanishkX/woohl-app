/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        woohl: {
          orange: '#FF5A5F', // Primary Coral
          green: '#10B981',
          red: '#EF4444',
          dark: '#111827',
          bg: '#F9FAFB', // Soft off-white
          offwhite: '#FFFFFF',
        }
      }
    },
  },
  plugins: [],
}
