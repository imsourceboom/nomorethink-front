import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'telegram': '#0088cc',
        'telegram-secondary': '#0099e6',
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config 