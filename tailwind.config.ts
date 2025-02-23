// import {defaultTheme} from 'tailwindcss/defaultTheme'
// import {colors} from 'tailwindcss/colors'

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: "true",
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        primary: ["Reddit Sans Condensed", "sans-serif"],
        secondary: ["Roboto", "sans-serif"],
      },
      colors: {
        secondary: "#343436",
        destructive: "#242424",
        highlight: "#b33d3d",
        background: "#E54D2E",
        text: "#f4f4f4",
        content: "#FFFFFF",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0) scale(1)',
            opacity: '0.5'
          },
          '50%': { 
            transform: 'translateY(-20px) scale(1.1)',
            opacity: '1'
          },
        },
        pulse: {
          '0%, 100%': {
            opacity: '0.5',
            transform: 'scale(0.95)'
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)'
          },
        },
        wave: {
          '0%, 100%': {
            transform: 'translateY(0px) scaleY(1)'
          },
          '50%': {
            transform: 'translateY(-20px) scaleY(0.95)'
          },
        },
        twinkle: {
          '0%, 100%': {
            opacity: '0.3',
            transform: 'scale(1)'
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.5)'
          },
        },
        mesh: {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '100%': { transform: 'translateX(40px) translateY(40px)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'reverse-spin': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'fly-path-1': {
          '0%': { transform: 'translateX(-100%) translateY(0)' },
          '50%': { transform: 'translateX(50vw) translateY(-50px)' },
          '100%': { transform: 'translateX(100vw) translateY(0)' }
        },
        'fly-path-2': {
          '0%': { transform: 'translateX(100vw) translateY(0)' },
          '50%': { transform: 'translateX(50vw) translateY(50px)' },
          '100%': { transform: 'translateX(-100%) translateY(0)' }
        },
        'fly-path-3': {
          '0%': { transform: 'translateX(-100%) translateY(0)' },
          '50%': { transform: 'translateX(60vw) translateY(-30px)' },
          '100%': { transform: 'translateX(100vw) translateY(0)' }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        float: "float 8s ease-in-out infinite",
        wave: "wave 10s ease-in-out infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        pulse: "pulse 10s ease-in-out infinite",
        mesh: "mesh 20s linear infinite",
        spin: "spin 30s linear infinite",
        'reverse-spin': "reverse-spin 20s linear infinite",
        'fly-path-1': 'fly-path-1 30s linear infinite',
        'fly-path-2': 'fly-path-2 40s linear infinite',
        'fly-path-3': 'fly-path-3 35s linear infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
