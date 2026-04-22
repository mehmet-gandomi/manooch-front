/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        ravi: ['Ravi', 'Vazirmatn', 'sans-serif'],
      },
      fontSize: {
        base: '16px',
        sm: '13px',
        lg: '19px',  // Used for OTP input numbers
        xl: '23px',  // Used for success screen title
      },
      colors: {
        primary: '#0068ff',
        'text-strong': '#16161d',
        'text-moderate': '#737377',
        'text-placeholder': '#a3a9b6',
        'bg-main': '#fefefe',
        'bg-base': '#fafafa',
        'text-white': '#fafafa',
        'border-light': '#e0e2e7',
        'red-500': '#ef4444',
      },
      borderRadius: {
        xl: '16px',
      },
    },
  },
  plugins: [],
}
