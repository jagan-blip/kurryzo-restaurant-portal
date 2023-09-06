/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FA255E",
        secondary: "#6E2F69",
        tertiary: "#156779",
        bg_primary: "#EAF2F5",
        bg_secondary: "#EEEEEE",
        text_low_emp: "#8E9091",
        text_medium_emp: "#666A6D",
        text_high_emp: "#40444A",
        text_highest_emp: "#161A1E",
        border_neutral: "#E0E0E0",
      },
    },
  },
  plugins: [],
  darkMode: "false",
};
