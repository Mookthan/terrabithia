/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F3EFE4',
        mint: '#BEE8DD',
        lime: '#C7DC86',
        olive: '#8EBA3E',
        teal: { bright: '#27AE97', hover: '#12986F', soft: '#D7E6DD', veil: 'rgb(18 152 111 / 0.12)' },
        navy: '#1C3A5C',
        // Accent only (mook 2026-10-28): big headings, icons, decoration. Never buttons or links (green = clickable).
        accent: '#8DC63F',
        ink: '#173F52',
        line: '#E3E1D6',
        muted: '#626E67',
        faint: '#9aa39c',
      },
      fontFamily: {
        sans: ['Sarabun', 'sans-serif'],
      },
      /* Two radii only: ctl for buttons, fields, chips; box for cards, popups, sheets. Round things use rounded-full. */
      borderRadius: {
        ctl: '10px',
        box: '14px',
      },
      /* Two shadows only: card rests on the page, pop floats above it (dropdowns, modals, hover lift). */
      boxShadow: {
        card: 'var(--shadow-card)',
        pop: 'var(--shadow-pop)',
      },
      keyframes: {
        'svc-in': { from: { opacity: 0, transform: 'translateY(60px) scale(.92)' }, to: { opacity: 1, transform: 'none' } },
        'chat-ping': { '0%': { transform: 'scale(.88)', opacity: '.8' }, '75%,100%': { transform: 'scale(1.3)', opacity: 0 } },
        'chat-pop': { from: { opacity: 0, transform: 'translateY(6px) scale(.96)' }, to: { opacity: 1, transform: 'none' } },
        'chat-dot': { '0%,80%,100%': { opacity: '.3', transform: 'translateY(0)' }, '40%': { opacity: 1, transform: 'translateY(-3px)' } },
        'glass-in': { from: { opacity: 0, transform: 'translateY(-8px) scale(.98)' }, to: { opacity: 1, transform: 'none' } },
      },
      animation: {
        'svc-in': 'svc-in .35s cubic-bezier(.2,.9,.25,1.1) both',
        'chat-ping': 'chat-ping 2.4s ease-out infinite',
        'chat-pop': 'chat-pop .3s cubic-bezier(.34,1.56,.64,1) backwards',
        'chat-dot': 'chat-dot 1.1s ease-in-out infinite',
        'glass-in': 'glass-in .26s cubic-bezier(.22,1,.36,1)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(.34,1.56,.64,1)',
        out: 'cubic-bezier(.22,1,.36,1)',
      },
    },
  },
  plugins: [],
};
