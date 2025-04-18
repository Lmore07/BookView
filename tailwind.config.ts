import { nextui } from "@nextui-org/react";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/components/*.{ts,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
    "node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        custom: "var(--font-family)",
      },
      colors: {
        bgColorLeft: "var(--bgColorLeft)",
        titleLanding: "var(--text-TitleLanding)",
        bgHeaderTable: "var(--header-table--background)",
        textHeaderTable: "var(--header-table--text)",
        bgRowsTable: "var(--rows-table--background)",
        bgDefinition: "var(--bg--Definition)",
        textDefinition: "var(--text--Definition)",
        textRowsTable: "var(--rows-table--text)",
        bgColorDark: "var(--bgColorDark)",
        bgColorRight: "var(--bgColorRight)",
        textLanding: "var(--text-landing)",
        bgButtonAccesible: "var(--bg--ButtonAccesible)",
        textButtonAccesible: "var(--text--ButtonAccesible)",
        bgSelectTheme: "var(--bg--SelectTheme)",
        textSelectTheme: "var(--text--SelectTheme)",
        labelInputText: "var(--label--inputText)",
        bgInputText: "var(--bg--InputTextColor)",
        focusColorInput: "var(--focus--ColorInput)",
        focusBgInput: "var(--focus--BgInput))",
        bgButtonFill: "var(--bg--ButonFill)",
        textButtonFill: "var(--text--ButtonFill)",
        bgButtonFillHover: "var(--bg--ButtonFillHover)",
        textButtonFillHover: "var(--text--ButtonFillHover)",
        bgButtonPrevFill: "var(--bg--ButonPrevFill)",
        textButtonPrevFill: "var(--text--ButtonPrevFill)",
        bgButtonPrevFillHover: "var(--bg--ButtonPrevFillHover)",
        textButtonPrevFillHover: "var(--text--ButtonPrevFillHover)",
        bgButtonOutlined: "var(--bg--ButtonOutlined)",
        textButtonOutlined: "var(--text--ButtonOutlined)",
        bgButtonOutlinedHover: "var(--bg--ButtonOutlinedHover)",
        textButtonOutlinedHover: "var(--text--ButtonOutlinedHover)",
        textLabel: "var(--label--Label)",
        textRegisterLabel: "var(--text--RegisterLabel)",
        textForgotPassword: "var(--text-ForgotPassword)",
        iconBgColor: "var(--icon-bgColor)",
        textSidebar: "var(--text-SideBar-NS)",
        primary: {
          100: "var(--primary--100)",
          150: "var(--primary--150)",
          200: "var(--primary--200)",
          250: "var(--primary--250)",
          300: "var(--primary--300)",
          350: "var(--primary--350)",
          400: "var(--primary--400)",
          450: "var(--primary--450)",
          500: "var(--primary--500)",
          550: "var(--primary--550)",
          DEFAULT: "var(--primary--600)",
          650: "var(--primary--650)",
          700: "var(--primary--700)",
          750: "var(--primary--750)",
        },
        secondary: {
          100: "var(--secondary--100)",
          150: "var(--secondary--150)",
          200: "var(--secondary--200)",
          250: "var(--secondary--250)",
          300: "var(--secondary--300)",
          350: "var(--secondary--250)",
          400: "var(--secondary--400)",
          450: "var(--secondary--450)",
          DEFAULT: "var(--secondary--500)",
          550: "var(--secondary--550)",
          600: "var(--secondary--600)",
          650: "var(--secondary--650)",
          700: "var(--secondary--700)",
          750: "var(--secondary--750)",
        },
        tertiary: {
          100: "var(--tertiary--100)",
          150: "var(--tertiary--150)",
          200: "var(--tertiary--200)",
          250: "var(--tertiary--250)",
          300: "var(--tertiary--300)",
          350: "var(--tertiary--350)",
          400: "var(--tertiary--400)",
          450: "var(--tertiary--450)",
          DEFAULT: "var(--tertiary--500)",
        },
        default: {},
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui"), nextui()],
};

export default config;
