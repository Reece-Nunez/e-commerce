// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/ra-ui-materialui/**/*.{js,jsx,ts,tsx}" // so tailwind can pick up classes in RA components if needed
  ],
  theme: {
    extend: {
      colors: {
        navy: '#001f3f', // example
      },
    },
  },
  plugins: [],
};
