/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#070b10',
        panel: '#10161d',
        panelAlt: '#121b24',
        text: '#e5ecf4',
        muted: '#94a3b8',
        accent: '#7dd3fc',
        accentSoft: '#12314a',
        border: 'rgba(148, 163, 184, 0.18)',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(10,16,20,0.35)',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
