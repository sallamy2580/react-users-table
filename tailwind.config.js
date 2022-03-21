module.exports = {
  mode: `jit`,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: `class`, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: `transparent`,
      current: `currentColor`,
      black: `#000000`,
      white: `#ffffff`,
      gray: `#1f2937`,
      indigo: `colors.indigo`,
      red: `colors.rose`,
      yellow: `colors.amber`,
    },
    fontFamily: {
      display: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji`,
      body: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji`,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
