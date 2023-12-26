const colors = require('tailwindcss/colors');

const primary = {
  '50': '#fff6ed',
  '100': '#ffebd4',
  '200': '#ffd3a8',
  '300': '#ffb370',
  '400': '#ff8737',
  '500': '#ff6c19',
  '600': '#f04b06',
  '700': '#c73607',
  '800': '#9e2b0e',
  '900': '#7f270f',
  '950': '#451005',
};

const secondary = {
  '50': '#f6f6f6',
  '100': '#e7e7e7',
  '200': '#d1d1d1',
  '300': '#b0b0b0',
  '400': '#888888',
  '500': '#6d6d6d',
  '600': '#5d5d5d',
  '700': '#4f4f4f',
  '800': '#454545',
  '900': '#3d3d3d',
  '950': '#282828',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      colors: {
        primary: primary,
        secondary: secondary,
        neutral: colors.gray,
        black: colors.black,
        white: colors.white,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        stone: colors.stone,
        sky: colors.sky,
        neutral: colors.neutral,
        gray: colors.gray,
        slate: colors.slate,
      },
      fontFamily: {
        'body': [
          'Inter', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'system-ui', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'Noto Sans', 
          'sans-serif', 
          'Apple Color Emoji', 
          'Segoe UI Emoji', 
          'Segoe UI Symbol', 
          'Noto Color Emoji'
        ],
        'sans': [
          'Inter', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'system-ui', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'Noto Sans', 
          'sans-serif', 
          'Apple Color Emoji', 
          'Segoe UI Emoji', 
          'Segoe UI Symbol', 
          'Noto Color Emoji'
        ]
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('flowbite-typography'),
  ]
}