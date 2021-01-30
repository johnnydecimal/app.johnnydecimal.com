module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      jdcode: ["Fira Code"],
      jdbody: ["Fira Sans"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
