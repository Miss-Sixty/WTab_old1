/** @type {import('tailwindcss').Config} */
function withOpacityValue(variable) {
  return `rgba(var(${variable}))`
}
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          extralight: withOpacityValue('--color-primary-extralight'),
          light: withOpacityValue('--color-primary-light'),
          medium: withOpacityValue('--color-primary-medium'),
          default: withOpacityValue('--color-primary'),
          dark: withOpacityValue('--color-primary-dark')
        },
        danger: {
          default: '#f56c6c',
          medium: '#FFEBEB'
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
      },
      screens: {
        tablet: '600px'
      }
    }
  },
  plugins: []
}
