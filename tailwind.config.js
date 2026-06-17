/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.js', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#1F0808',
        surface: '#251A34',
        primary: '#FB5F26',
        danger: '#E73536',
        banner: '#5F3E63',
        line: '#451E5D',
        text: '#E0D7E5',
        muted: '#9B8FA6',
        border: '#483F53',
      },
    },
  },
  plugins: [],
};
