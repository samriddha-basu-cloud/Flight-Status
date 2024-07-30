/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#081A9A',
        'light-gray': '#ecf0f3',
      },
      boxShadow: {
        'neomorphic': '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.9)',
        'inset-neomorphic': 'inset 8px 8px 16px rgba(0, 0, 0, 0.1), inset -8px -8px 16px rgba(255, 255, 255, 0.9)',
      },
      borderRadius: {
        '2xl': '1.5rem',
      },
    },
  },
  variants: {},
  plugins: [],

}