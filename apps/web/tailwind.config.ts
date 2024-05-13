import type { Config } from "tailwindcss";

import baseConfig from "@refeed/tailwind-config";

export default {
  content: ["./**/*.{ts,tsx}", "../../packages/ui/**/*.{ts,tsx}"],
  presets: [baseConfig],
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.underline-dotted': {
          'text-decoration': 'underline',
          'text-decoration-style': 'dotted',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} satisfies Config;
