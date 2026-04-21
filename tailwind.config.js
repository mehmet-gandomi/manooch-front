/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        ravi: ['Ravi', 'Vazirmatn', 'sans-serif'],
      },
      colors: {
        primary: '#0068ff',
        'text-strong': '#16161d',
        'text-moderate': '#737377',
        'text-placeholder': '#a3a9b6',
        'bg-main': '#fefefe',
        'bg-base': '#fafafa',
        'text-white': '#fafafa',
      },
      borderRadius: {
        xl: '16px',
      },
    },
  },
  plugins: [],
}
