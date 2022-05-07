module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          color: "var(--color)",
          bg: "var(--bg)",
          hover: "var(--hover)",
          active: "var(--active)",
          focus: "var(--focus)",
          focusBorder: "var(--focus-border)",
          border: "var(--border)",
          disabled: "var(--disabled)",
          disabledColor: "var(--disabled-color)",
          disabledBorder: "var(--disabled-border)",
        },
        secondary: {
          color: "var(--color)",
          bg: "var(--bg)",
          hover: "var(--hover)",
          active: "var(--active)",
          focus: "var(--focus)",
          focusBorder: "var(--focus-border)",
          border: "var(--border)",
          disabled: "var(--disabled)",
          disabledColor: "var(--disabled-color)",
          disabledBorder: "var(--disabled-border)",
        },
      },
    },
  },
  plugins: [],
};
