/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        ravi: ['Ravi', 'Vazirmatn', 'sans-serif'],
      },
      fontSize: {
        xs:   '11px',  // Admin menu item labels, small tags
        sm:   '13px',  // Helper text, captions
        base: '16px',  // Body text
        lg:   '19px',  // OTP input numbers
        xl:   '23px',  // Screen titles
      },
      colors: {
        primary: '#0068ff',
        'menu-accent': '#4b45e6',
        'brand-green': '#00e043',
        'menu-warning': '#ff7b06',
        success: '#22c55e',
        'success-soft': '#e9f9ee',
        'danger-soft': '#ffe8eb',
        'text-strong': '#16161d',
        'text-moderate': '#737377',
        'text-heading': '#3d4350',
        'text-weak': '#a2a2a5',           // Admin menu item labels
        'text-placeholder': '#a3a9b6',
        'text-disable-weak': '#e8e8e8',   // Admin header subtitle
        'bg-main': '#fefefe',
        'bg-base': '#fafafa',
        'bg-soft': '#f0f1f3',
        'bg-disable': '#babdc1',          // Avatar background
        'text-white': '#fafafa',
        'border-light': '#e0e2e7',
        'red-500': '#ef4444',
        'header-from': '#202a37',         // Admin header gradient start
        'header-to': '#171e27',           // Admin header gradient end
      },
      maxWidth: {
        sm: '27rem',
      },
      borderRadius: {
        xl: '16px',
      },
    },
  },
  plugins: [],
}
