/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: { 
              backgroundColor: '#f6f8fa',
              color: '#24292e',
            }
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}