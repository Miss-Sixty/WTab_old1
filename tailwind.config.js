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
      },
      keyframes: {
        pulseIn: {
          from: {
            transform: 'scale(0.3)',
            opacity: 0
          },
          '50%': {
            transform: 'scale(1.03)',
            opacity: 1
          },
          to: {
            transform: 'scale(1)'
          }
        },
        pulseOut: {
          to: {
            transform: ' scale(0.3)',
            opacity: 0
          }
        }
      },
      animation: {
        'zoom-in': 'pulseIn 0.2s',
        'zoom-out': 'pulseOut 0.2s'
      }
    }
  },
  plugins: []
}
