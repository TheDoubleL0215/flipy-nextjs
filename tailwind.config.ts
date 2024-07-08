import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Fira Sans"]
      },
      colors: {
        'text': 'rgb(235, 233, 252)',
        'background': 'rgb(14, 14, 17)',
        'tertitary': 'rgb(39, 39, 42)',
        'secondary': 'rgb(24, 24, 27)',
        'border': 'var(--color-neutral-700)',
        'error': 'rgb(248 113 113)',
        'primary': {
          '50': '#f3fbf2',
          '100': '#e1f8e0',
          '200': '#c5efc3',
          '300': '#96e194',
          '400': '#61ca5e',
          '500': '#41c23e',
          '600': '#2b9029',
          '700': '#247223',
          '800': '#205b20',
          '900': '#1c4b1d',
          '950': '#0a290b',
        },

      },


    },
  },
  plugins: [],
};
export default config;
