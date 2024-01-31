export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["light", "dark", "cupcake", "dracula"],
  },
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".before": {
          content: '""',
        },
        ".after": {
          content: '""',
        },
      };

      addUtilities(newUtilities, ["before", "after"]);
    },
  ],
};
