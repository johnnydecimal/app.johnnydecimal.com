// https://tailwindcss.com/docs/guides/create-react-app#creating-your-project
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
