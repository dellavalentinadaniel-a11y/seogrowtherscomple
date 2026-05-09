/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          default: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          default: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          default: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          default: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          default: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          purple: '#9372FF', // Updated accent purple color
        },
        popover: {
          default: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          default: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // --- Stitch Design System Colors ---
        "on-secondary-container": "#d6a9ff",
        "secondary-fixed": "#f0dbff",
        "surface-bright": "#383843",
        "tertiary-container": "#f7bdff",
        "primary-container": "#00e5ff",
        "inverse-primary": "#006875",
        "surface-container-high": "#282933",
        "surface-container": "#1e1f29",
        "surface-container-highest": "#33343e",
        "inverse-surface": "#e3e1ef",
        "primary-fixed": "#9cf0ff",
        "on-primary-fixed-variant": "#004f58",
        "surface-tint": "#00daf3",
        "surface-container-low": "#1a1b24",
        "surface-dim": "#12131c",
        "outline": "#849396",
        "on-error-container": "#ffdad6",
        "on-background": "#e3e1ef",
        "secondary-fixed-dim": "#ddb7ff",
        "secondary-container": "#6f00be",
        "on-surface": "#e3e1ef",
        "tertiary-fixed": "#fcd6ff",
        "on-surface-variant": "#bac9cc",
        "outline-variant": "#3b494c",
        "on-secondary-fixed-variant": "#6900b3",
        "error-container": "#93000a",
        "on-primary-container": "#00626e",
        "on-tertiary": "#4e155d",
        "on-secondary": "#490080",
        "on-error": "#690005",
        "tertiary": "#ffe5ff",
        "surface-container-lowest": "#0d0e17",
        "inverse-on-surface": "#2f303a",
        "error": "#ffb4ab",
        "background": "#12131c",
        "surface-variant": "#33343e",
        "primary-fixed-dim": "#00daf3",
        "on-tertiary-fixed": "#340042",
        "tertiary-fixed-dim": "#f3aeff",
        "surface": "#12131c",
        "on-tertiary-container": "#7c428a",
        "on-tertiary-fixed-variant": "#682f76",
        "on-secondary-fixed": "#2c0051",
        "on-primary": "#00363d",
        "on-primary-fixed": "#001f24"
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        "headline": ["Space Grotesk", "sans-serif"],
        "body": ["Manrope", "sans-serif"],
        "label": ["Space Grotesk", "sans-serif"]
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography')
  ],
};