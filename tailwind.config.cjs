/** @type {import('tailwindcss').Config} */
const { Theme } = require("tailwind-easy-theme");

const theme = new Theme({
  primary: {
    DEFAULT: "#2563eb",
    300: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
  },
  "primary-hover": "#1d4ed8",
  secondary: {
    100: "#f4f5fa",
    200: "#dbe1f8",
    600: "#9a9cbf",
    700: "#7068bf",
  },
  tertiary: {
    600: "#2C7BE5",
    700: "#2470d6",
  },
  "background-page": "#f6f6f6",
  gray: {
    25: "#FCFDFE", // rgba(227, 235, 246, 0.12)
    50: "#F9FBFD",
    75: "#EDF1F5",
    100: "#E3EBF6",
    200: "#e2e5e8", // rgba(18, 38, 63, 0.12)
    300: "#CED3D8",
    400: "#b7bdc5",
    500: "#89939F",
    550: "#6E84A3",
    600: "#4B4B4B",
    800: "#232E4A",
    900: "#12263f",
  },
  "gray-blue": {
    100: "#E6EDFB",
    200: "#DBE2EA", // Cloud
    300: "#C9D1D8", // Smoke
    400: "#FD7E14", // Colbalt
    500: "#6B7896", // Stone
    600: "#585E76", // Iron
    700: "#364064", // Granite
  },
  blue: {
    100: "#F0F6FF", // Fog
    200: "#B1D1FF", // Sky
    300: "#6EA8FE", // Lake
    400: "#3C8BFF", // Water
    500: "#0D6EFD", // Sea
    600: "#0C63E4", // Ocean
  },
  red: {
    50: "#FDEDED",
    100: "#FBDBDB",
    200: "#F7BBBB",
    300: "#F29797",
    400: "#EE7777",
    500: "#EA5455",
    600: "#E31C1C",
    700: "#A81515",
    800: "#720E0E",
    900: "#360707",
  },
  green: {
    50: "#EAFBF1",
    100: "#D0F6E1",
    200: "#A6EDC6",
    300: "#77E4A8",
    400: "#4DDB8D",
    500: "#28C76F",
    600: "#20A15A",
    700: "#187743",
    800: "#10512D",
    900: "#082615",
  },
  orange: {
    50: "#FFF4EB",
    100: "#FFEDDB",
    200: "#FFD7B3",
    300: "#FFC58F",
    400: "#FFB066",
    500: "#FF9F43",
    600: "#FF7B00",
    700: "#C25E00",
    800: "#803E00",
    900: "#422000",
  },
  cyan: {
    50: "#E5FCFF",
    100: "#C7F9FF",
    200: "#8FF4FF",
    300: "#57EEFF",
    400: "#1FE9FF",
    500: "#00CFE8",
    600: "#00A5B8",
    700: "#007C8A",
    800: "#00535C",
    900: "#00292E",
  },
});

const darkMode = theme.variant({
  "background-page": "#090909",
});

module.exports = {
  important: true,
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
        ],
      },
      borderRadius: {
        DEFAULT: "5px",
      },
      boxShadow: {
        xl: "0 4px 10px rgba(0, 0, 0, 0.15)",
        "xl-dark": "0 4px 10px rgba(2, 2, 2, 0.2)",
        dropdown: "0 4px 4px rgba(0, 0, 0, 0.25);",
        "dropdown-dark": "0 4px 4px rgba(2, 2, 2, 0.25)",
        widget: "0 3px 7px rgba(0, 0, 0, 0.12);",
        "widget-dark": "0 3px 7px rgba(2, 2, 2, 0.12)",
        modal: "0px 4px 15px rgba(44, 63, 88, 0.35)",
        "modal-dark": "0 4px 15px rgba(2, 2, 2, 0.3)",
        "inner-sm": "inset 0px -3px 0px rgba(0, 0, 0, 0.2);",
        checkbox: "0px 2px 4px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [
    theme.create({
      ".dark": darkMode,
    }),
    require("@tailwindcss/typography"),
    require("flowbite/plugin"),
  ],
};
