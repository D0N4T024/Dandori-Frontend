/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-readex-pro)']
      },
      fontSize: {
        'h1': '2rem',
        'h2': '1.5rem',
        'h3': '1.25rem',
        'p': '1rem',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

