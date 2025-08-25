import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'clash': ['Clash Display', 'sans-serif'],
        'general': ['General Sans', 'sans-serif'],
        'satoshi': ['Satoshi', 'sans-serif'],
      },
      colors: {
        // Typography colors
        'heading-primary': 'hsl(var(--heading-primary))',
        'heading-secondary': 'hsl(var(--heading-secondary))',
        'heading-tertiary': 'hsl(var(--heading-tertiary))',
        'subheading': 'hsl(var(--subheading))',
        'body-text': 'hsl(var(--body-text))',
        'ui-accent': 'hsl(var(--ui-accent))',
        'ui-accent-alt': 'hsl(var(--ui-accent-alt))',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
        // Sophisticated aesthetic colors
        aesthetic: {
          slate: "hsl(var(--aesthetic-slate))",
          sage: "hsl(var(--aesthetic-sage))",
          stone: "hsl(var(--aesthetic-stone))",
          plum: "hsl(var(--aesthetic-plum))",
          amber: "hsl(var(--aesthetic-amber))",
          cream: "hsl(var(--aesthetic-cream))",
        },
        // Refined accent colors
        refined: {
          navy: "hsl(var(--refined-navy))",
          forest: "hsl(var(--refined-forest))",
          charcoal: "hsl(var(--refined-charcoal))",
          bronze: "hsl(var(--refined-bronze))",
          pearl: "hsl(var(--refined-pearl))",
          smoke: "hsl(var(--refined-smoke))",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
