import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        alisat: {
          navy:  '#033566',
          dark:  '#022550',
          light: '#0a4a8c',
          mid:   '#1e6cbf',
        },
      },
    },
  },
  plugins: [],
}

export default config
