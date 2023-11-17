/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        neon: "0 0 5px theme('colors.purple.200') , 0 0 20px theme('colors.purple.700')",
      },
      colors: {
        primary: { ...colors.violet, DEFAULT: colors.violet[500] },
        secondary: colors.indigo,
      },
    },
  },
  plugins: [
    // plugin(({ theme, addUtilities }) => {
    //   const neonUtilities = {};
    //   const colors = theme("colors");
    //   for (const color in colors) {
    //     if (typeof colors[color] === "object") {
    //       const color1 = colors[color]["400"];
    //       const color2 = color[color]["500"];
    //       neonUtilities[`.neon-${color}`] = {
    //         boxShadow: `0 0 5px ${color1}, 0 0 10px ${color2}`,
    //       };
    //     }
    //   }
    //   addUtilities(neonUtilities);
    // }),
  ],
};
