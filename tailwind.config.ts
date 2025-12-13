
import type {Config} from 'tailwindcss';

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
        sans: ['var(--font-geist-sans)', 'sans-serif'],
      },
      colors: {
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
       textShadow: {
        glow: '0 0 15px hsl(var(--primary) / 0.5), 0 0 30px hsl(var(--primary) / 0.3)',
      },
    },
  },
  plugins: [
      require("tailwindcss-animate"),
      function ({ theme, addUtilities }: { theme: (path: string) => any; addUtilities: (utilities: any) => void; }) {
        const newUtilities = {
          '.text-shadow-glow': {
            textShadow: theme('textShadow.glow'),
          },
          '.btn-3d-primary': {
            '--btn-bg': theme('colors.primary.DEFAULT'),
            '--btn-border': 'hsl(var(--primary) / 0.8)',
            '--btn-shadow': 'hsl(var(--primary) / 0.4)',
            'color': theme('colors.primary.foreground'),
            'backgroundColor': 'var(--btn-bg)',
            'borderBottom': '4px solid var(--btn-border)',
            'boxShadow': '0 5px 15px -5px var(--btn-shadow)',
            'transition': 'all 0.15s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 20px -5px var(--btn-shadow)',
            },
            '&:active': {
              transform: 'translateY(2px)',
              borderBottomWidth: '2px',
              boxShadow: '0 2px 5px -2px var(--btn-shadow)',
            },
          }
        };
        addUtilities(newUtilities);
      },
    ],
}

export default config;
