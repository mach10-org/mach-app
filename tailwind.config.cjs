/** @type {import('tailwindcss').Config} */
const { Theme } = require("tailwind-easy-theme");

const parseThemeColor = (color) => {
  return color.replace("<alpha-value>", 1);
};

const theme = new Theme({
  "text-base": "#232E4A",
  "text-title": "#111827",
  "text-muted": "#89939F",
  primary: {
    DEFAULT: "#be185d",
    50: "#fdf2f7",
    100: "#fce7f0",
    200: "#fbcfe1",
    300: "#f9a8ca",
    400: "#f472a8",
    500: "#ec488c",
    600: "#db2772",
    700: "#be185d",
    800: "#9d174f",
    900: "#831844",
    950: "#500725",
  },
  "primary-hover": "#9d174f",
  link: "#be185d",
  "link-hover": "#9d174f",
  "border-input": "#dee5ed",
  secondary: {
    50: "#f1fafa",
    100: "#daf2f3",
    200: "#bae3e7",
    300: "#8acfd6",
    400: "#53b2bd",
    500: "#3896a2",
    600: "#348291",
    700: "#2d6471",
    800: "#2c545e",
    900: "#294750",
    950: "#172e35",
  },
  tertiary: {
    600: "#2C7BE5",
    700: "#2470d6",
  },
  "background-page": "#F9F9F9",
  "background-base": "#fcfcfc",
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
  "text-base": "#e2e5e8",
  "text-title": "#EDF1F5",
  "background-page": "#232E4A",
  "background-base": "#242F4D",
  "border-input": "#3a4959",
  link: "#f9a8ca",
  "link-hover": "#f472a8",
});

module.exports = {
  important: true,
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2rem",
      },

      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
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
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": parseThemeColor(theme("colors.text-base")),
            "--tw-prose-headings": parseThemeColor(theme("colors.text-title")),
            "--tw-prose-lead": parseThemeColor(theme("colors.text-title")),
            "--tw-prose-links": parseThemeColor(theme("colors.link")),
            "--tw-prose-bold": "inherit",
            "--tw-prose-counters": parseThemeColor(theme("colors.text-muted")),
            "--tw-prose-bullets": parseThemeColor(theme("colors.text-muted")),
            "--tw-prose-hr": parseThemeColor(theme("colors.text-muted")),
            "--tw-prose-quotes": parseThemeColor(theme("colors.text-muted")),
            "--tw-prose-quote-borders": parseThemeColor(
              theme("colors.text-muted")
            ),
            "--tw-prose-captions": parseThemeColor(theme("colors.text-muted")),
            "--tw-prose-code": parseThemeColor(theme("colors.text-base")),
            "--tw-prose-pre-code": parseThemeColor(theme("colors.text-base")),
            "--tw-prose-pre-bg": parseThemeColor(theme("colors.text-base")),
            "--tw-prose-th-borders": parseThemeColor(
              theme("colors.border-input")
            ),
            "--tw-prose-td-borders": parseThemeColor(
              theme("colors.border-input")
            ),
            a: {
              "text-decoration": "none",
              "&:hover": {
                "text-decoration": "underline",
                color: parseThemeColor(theme("colors.link-hover")),
              },
            },
            h1: {
              "font-weight": 700,
            },
          },
        },
      }),
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
