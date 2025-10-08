import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        custom: {
          "50": "#fffdf5",
          "100": "#fffaea",
          "200": "#fff3cb",
          "300": "#ffe89c",
          "400": "#ffd763",
          "500": "#ffc107",
          "600": "#e6ad00",
          "700": "#cc9a00",
          "800": "#b38700",
          "900": "#996f00",
          "950": "#805900",
          DEFAULT: "#ffc107",
        },
        primary: {
          "50": "#fffdf5",
          "100": "#fffaea",
          "200": "#fff3cb",
          "300": "#ffe89c",
          "400": "#ffd763",
          "500": "#ffc107",
          "600": "#e6ad00",
          "700": "#cc9a00",
          "800": "#b38700",
          "900": "#996f00",
          "950": "#805900",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          "50": "#F5F5F5",
          "100": "#EEEEEE",
          "200": "#E0E0E0",
          "300": "#BDBDBD",
          "400": "#9E9E9E",
          "500": "#757575",
          "600": "#616161",
          "700": "#424242",
          "800": "#212121",
          "900": "#000000",
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
      },
      fontWeight: {
        "extra-black": "950",
        "ultra-thin": "100",
      },
    },
    animation: {
      "scale-up": "scaleUp 0.5s ease-out",
    },
    keyframes: {
      scaleUp: {
        "0%": {
          transform: "scale(0.95)",
        },
        "100%": {
          transform: "scale(1)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
