/** @type {import('tailwindcss').Config} */
function withOpacityValue(variable) {
  return `rgba(var(${variable}))`
}
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: withOpacityValue('--color-black'),
        white: withOpacityValue('--color-white'),
        primary: {
          extralight: withOpacityValue('--color-primary-extralight'),
          light: withOpacityValue('--color-primary-light'),
          medium: withOpacityValue('--color-primary-medium'),
          default: withOpacityValue('--color-primary'),
          dark: withOpacityValue('--color-primary-dark')
        }
      }
    }
  },
  plugins: []
}
