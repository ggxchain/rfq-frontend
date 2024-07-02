import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-bg": "#6594c4",
        "main-bg-2": "#eef6ff",
        "main-bg-3": "#dddddd",
      },
      backgroundImage: {
        "gradient-main": "linear-gradient(to bottom, #6594c4 0%, #eef6ff 50%, #dddddd 100%)",
      }
    },
  },
  plugins: [],
};
export default config;
