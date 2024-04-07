import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      light: {
        50: '#FCFEE8',
        100: '#FAFFC2',
        200: '#FAFF89',
        300: '#FFFF66',
        400: '#FDF312',
        500: '#ECD906',
        600: '#CCAB02',
        700: '#A37B05',
        800: '#86600D',
        900: '#724E11',
        950: '#432A05',
      },
      dark: {
        50: '#1E2025',
        100: '#1A1C21',
        200: '#16181D',
        300: '#121419',
        400: '#0E1014',
        500: '#0A0C0F',
        600: '#060709',
        700: '#020304',
        800: '#000000',
        900: '#000000',
        950: '#000000',
      },
    },
  },
  plugins: [],
};

export default config;
