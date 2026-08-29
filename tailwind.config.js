/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0b0b0c',
          soft: '#151518',
          line: '#2a2a2f',
          muted: '#8b8b93'
        },
        accent: {
          DEFAULT: '#d6ff3e',
          dark: '#bce620'
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      borderRadius: {
        '4xl': '1.75rem'
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)'
      }
    }
  },
  plugins: []
}
