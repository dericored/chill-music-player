module.exports = {
  purge: ["./public/index.html", "./public/js/main.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "fade-out": {
          from: {
            opacity: "1",
          },
          to: {
            opacity: "0",
          },
        },
      },
      boxShadow: {
        "3xl": "4px 4px 40px 5px rgba(0, 0, 0, 0.4)",
      },
      dropShadow: {
        white: "0 0 7px #FFF",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        dilate: "width 0.1s linear",
        "fade-in": "fade-in 1s ease-in-out",
        "fade-out": "fade-in 1s ease-in-out",
        pulse: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
