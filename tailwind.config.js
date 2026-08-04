/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#081527',
          900: '#0d2138',
          800: '#12314f'
        },
        brand: {
          50: '#eef7ff',
          100: '#d9ecff',
          200: '#b9dcff',
          500: '#1877d2',
          600: '#0d63ba',
          700: '#0a4f96',
          800: '#0d4279',
          900: '#103963',
          950: '#08233f'
        },
        energy: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#22a66f',
          600: '#16845a',
          700: '#116a49',
          800: '#10543d',
          900: '#0e4534',
          950: '#06271f'
        }
      },
      boxShadow: {
        soft: '0 18px 50px rgba(8, 21, 39, 0.08)'
      }
    }
  },
  plugins: []
}
