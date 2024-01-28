export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["light", "dark", "cupcake", "dracula"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
