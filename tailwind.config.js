/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        winky: ["'Winky Sans'", "sans-serif"],
        anton: ["'Anton'", "sans-serif"],
        inter: ["'Inter'", "sans-serif"],
        boldonse: ["'Boldonse'", "sans-serif"],
        poppins: ["'Poppins'", "sans-serif"],
        permanent: ["'Permanent'", "sans-serif"],
      },
      screens: {
        xs: { max: "1230px" },
      },
      transitionProperty: {
        width: "width",
        height: "height",
        spacing: "margin, padding",
        opacity: "opacity",
        transform: "transform",
      },
      transitionDuration: {
        0: "0ms",
        200: "200ms",
        500: "500ms",
        1000: "1000ms",
      },
      transitionTimingFunction: {
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
        "ease-smooth": "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
      },
    },
  },
  plugins: [],
};
