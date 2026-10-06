/**
 * WPP Media Solutions — Tailwind CSS Configuration
 * Preserves all design tokens, font families, and custom colors.
 */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['WPP', 'sans-serif'],
        wpp: ['WPP', 'sans-serif'],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
      colors: {
        neutral: {
          0: '#FFFFFF',
          50: '#F8F8F7',
          100: '#F2F2F1',
          200: '#E6E6E5',
          300: '#D4D4D3',
          500: '#8A8A88',
          700: '#454544',
          900: '#171717',
          1000: '#000000',
        },
        brand: {
          navy: {
            50: '#F0F0FA',
            100: '#E2E2F5',
            200: '#B8B8E6',
            300: '#7070BF',
            400: '#33338A',
            500: '#000050',
            600: '#00003D',
            700: '#00002E',
            800: '#000021',
            900: '#000014',
            950: '#00000A',
          },
          lime: {
            50: '#F7FDE8',
            100: '#EDFCCE',
            200: '#DCFA9D',
            300: '#C8F76B',
            500: '#AEF366',
            600: '#93D64B',
            700: '#6FAF30',
            800: '#4F851D',
            900: '#355C11',
          },
          blue: {
            50: '#EEF0FF',
            100: '#DDE1FF',
            200: '#B8C2FF',
            500: '#5967F6',
            600: '#3B49DF',
            700: '#2835BF',
          },
          violet: {
            50: '#F4F3FD',
            100: '#E8E6FC',
            500: '#7D72E8',
            600: '#6357D2',
          },
        },
        semantic: {
          success: '#27864E',
          warning: '#D99000',
          error: '#E53E3E',
        },
      },
      borderRadius: {
        DEFAULT: '8px',
        card: '12px',
        stage: '16px',
        pill: '9999px',
      },
      boxShadow: {
        none: 'none',
        overlay: '0 8px 30px rgba(0, 0, 80, 0.12)',
      },
    },
  },
  plugins: [],
};
