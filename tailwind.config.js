/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1a1a',
          50:  '#f9f9f9',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#d0d0d0',
          400: '#999999',
          500: '#666666',
          600: '#4a4a4a',
          700: '#333333',
          800: '#1a1a1a',
          900: '#0d0d0d',
        },
        accent: {
          DEFAULT: '#4a5f7f',
          light: '#6b7f99',
          dark: '#2d3748',
        },
        slate: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#2d3748',
          800: '#1a202c',
          900: '#0f172a',
        },
      },
      fontFamily: {
        heading: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
