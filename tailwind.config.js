/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Un color de alto contraste para botones (ej: un azul eléctrico o naranja)
        primary: {
          DEFAULT: '#2563eb', // Blue-600 (cámbialo por tu color de marca)
          hover: '#1d4ed8',   // Blue-700
        },
        dark: '#0f172a',      // Slate-900 para textos principales
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Fuente de alta legibilidad
      }
    },
  },
  plugins: [],
}