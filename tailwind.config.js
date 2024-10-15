/** @type {import('tailwindcss').Config} */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
module.exports = {
  darkMode:"class",
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],
}

