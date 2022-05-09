module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
          bg: "var(--bg)",
          text: "var(--text)",
          hover: "var(--hover)",
          active: "var(--active)",
          focus: "var(--focus)",
          "focus-border": "var(--focus-border)",
          border: "var(--border)",
          disabled: "var(--disabled)",
          "disabled-color": "var(--disabled-color)",
          "disabled-border": "var(--disabled-border)",
        // secondary: {},
        // success: {},
        // danger: {},
        // warning: {},
        // info: {},
        // light: {},
        // dark: {}
      },
    },
  },
  plugins: [],
};
