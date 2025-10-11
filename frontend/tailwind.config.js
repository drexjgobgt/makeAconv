import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      extend: {
        animation: {
          border: "border 4s linear infinite",
          fadeIn: "fadeIn 0.25s ease-out forwards",
          fadeOut: "fadeOut 0.25s ease-in forwards",
        },
        keyframes: {
          border: {
            to: { "--border-angle": "360deg" },
          },
          fadeIn: {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
          fadeOut: {
            "0%": { opacity: 1 },
            "100%": { opacity: 0 },
          },
        },
      },
    },
  },
  plugins: [daisyui],
};
