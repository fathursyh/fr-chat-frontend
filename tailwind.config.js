/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      'maroon-theme': '#550000'
    },
    extend: {
      fontFamily: {
        Audiowide: ['Audiowide'],
        Sniglet: ['Sniglet'],
        Poppins: ['Poppins'],
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}