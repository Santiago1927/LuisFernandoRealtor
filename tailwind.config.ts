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
        // Dorado: Desde un tono suave y brillante hasta un dorado más profundo y lujoso
        gold: {
          50: '#FFF8E1', // Casi blanco, con un toque dorado
          100: '#FFECB3', // Dorado claro muy suave
          200: '#FFE082', // Un tono dorado medio, ideal para resaltados suaves
          300: '#FFD54F', // Un dorado más saturado, perfecto para acentos
          400: '#FFCA28', // Dorado brillante
          500: '#FFC107', // El dorado principal de la marca
          600: '#FFB300', // Un dorado un poco más intenso
          700: '#FFA000', // Dorado oscuro, para contrastes fuertes
          800: '#FF8F00', // Un tono más hacia el ámbar
          900: '#FF6F00', // Un dorado oscuro muy intenso, casi naranja
        },
        // Negro: Desde gris muy claro hasta negro profundo, para textos y fondos
        dark: {
          50: '#F5F5F5', // Muy claro, casi blanco, para fondos y UI
          100: '#EEEEEE',
          200: '#E0E0E0', // Grises para estructuras y divisiones suaves
          300: '#BDBDBD',
          400: '#9E9E9E', // Gris medio, ideal para texto secundario
          500: '#757575', // Gris oscuro para texto principal
          600: '#616161',
          700: '#424242', // Muy oscuro, para componentes UI o texto sobre fondo claro
          800: '#212121', // Casi negro, para fondos y contraste alto
          900: '#000000', // Negro, para texto o elementos en contraste máximo
        },
        // Blanco: Para mantener la simplicidad, se puede usar directamente Tailwind CSS para blancos.
      }
    },
  },
  plugins: [],
};

export default config;
