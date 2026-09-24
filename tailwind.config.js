/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        board: {
          DEFAULT: '#d6bc96',
          side: '#ad8b61',
          deep: '#6f5236',
          shelf: '#c3a47b'
        },
        ink: {
          DEFAULT: '#15110e',
          soft: '#2a211b'
        },
        tissue: '#f5f2ec',
        forest: '#4f6b46',
        brick: '#a8352a'
      },
      fontFamily: {
        display: ['Oswald', '"Arial Narrow"', 'sans-serif'],
        sans: ['"Golos Text"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace']
      },
      borderWidth: {
        rule: '1.5px'
      },
      transitionTimingFunction: {
        pull: 'cubic-bezier(0.16, 1, 0.3, 1)'
      },
      transitionDuration: {
        pull: '180ms',
        lid: '320ms'
      }
    }
  },
  plugins: []
}
