/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#082f49',
          950: '#041d2d',
        },
        pg: {
          light: '#eff6ff',
          border: '#bfdbfe',
          primary: '#2563eb',
          hover: '#1d4ed8',
          dark: '#1e3a8a',
          badge: '#dbeafe',
          text: '#1e40af',
        },
        mess: {
          light: '#f0fdf4',
          border: '#bbf7d0',
          primary: '#059669',
          hover: '#047857',
          dark: '#064e3b',
          badge: '#dcfce7',
          text: '#166534',
        },
        resident: {
          light: '#faf5ff',
          border: '#e9d5ff',
          primary: '#7c3aed',
          hover: '#6d28d9',
          dark: '#4c1d95',
          badge: '#f3e8ff',
          text: '#5b21b6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
