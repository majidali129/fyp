import type { Config } from "tailwindcss";
// 33140B
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px"
      }
    },
    fontFamily: {
      sans: ["Noto", "sans-serif"]
    },
    extend: {
      colors: {
        primary: {
          100: "#FFEEE8",
          200: "#FFDDD1",
          300: "#FFA386",
          400: "#FF855E",
          500: "#FF6636",
          600: "#CC522B",
          700: "#993D20",
          800: "#662916",
          900: "#33140B"
        },
        secondary: {
          50: "#eef2ff",
          100: "#EBEBFF",
          200: "#CDCBFE",
          300: "#9A95FE",
          400: "#7872FD",
          500: "#564FFD",
          600: "#453FCA",
          700: "#342F98",
          800: "#222065",
          900: "#111033"
        },
        gray: {
          white: "#FFFFFF",
          50: "#F5F7FA",
          100: "#E9EAF0",
          200: "#CED1D9",
          300: "#B7BAC7",
          400: "#A1A5B3",
          500: "#8C94A3",
          600: "#6E7485",
          700: "#4E5566",
          800: "#363B47",
          900: "#1D2026"
        },
        success: {
          100: "#E1F7E3",
          200: "#C3E5C6",
          300: "#7BD785",
          400: "#4FCA5C",
          500: "#23BD33",
          600: "#1C9729",
          700: "#15711F",
          800: "#0E4C14",
          900: "#07260A"
        },
        warning: {
          100: "#FFF2E5",
          200: "#FED1A5",
          300: "#FEBB79",
          400: "#FDA44C",
          500: "#FD8E1F",
          600: "#CC7319",
          700: "#985613",
          800: "#65390C",
          900: "#331D06"
        },
        error: {
          50: "#fef2f2",
          100: "#FFF0F0",
          200: "#F4C8C8",
          300: "#EE8F8F",
          400: "#E96969",
          500: "#E34444",
          600: "#B63636",
          700: "#882929",
          800: "#5B1B1B",
          900: "#2D0E0E"
        }
      },
      borderRadius: {
        'default': '4px',
        'none': '0',
        'sm': '0.125rem', //
        'md': '0.375rem', // 6px
        'lg': '0.5rem', // 8px
        'full': '9999px', // 9999px
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite"
      },
      screens: {
        sm: "640px",
        md: "767px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;

export default config;
