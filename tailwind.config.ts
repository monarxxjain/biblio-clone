import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        gradienthero:
          "linear-gradient(40deg, #5c1324 0%, #111827 0%, #111827 30%, #5c1324 100%);",
        gradientcorner:
          "linear-gradient(20deg, #111827 32%, #111827 68%, #9a203c 100%);",
        gradientedge:
          "linear-gradient(40deg, #9a203c 0%, #111827 0%, #111827 90%, #9a203c 100%);",
        gradientpage:
          "linear-gradient(14deg, #9a203c 0%, #111827 20%, #111827 80%, #9a203c 100%);",
        gradientmix:
          "linear-gradient(90deg, #f0357c, #f154ff, #777dff, #497ce2, #37bdde);",
      },
    },
  },
  plugins: [],
};
export default config;
