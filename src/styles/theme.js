const baseTheme = {
  spacing: {
    small: "8px",
    medium: "16px",
    large: "32px",
    extraLarge: "64px",
  },
  breakpoints: {
    mobile: "576px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1280px",
  },
};

export const lightTheme = {
  ...baseTheme,
  colors: {
    background: "#fff",
    text: "#000",
    primary: "#3498db",
    secondary: "#999",
    border: "hsla(220, 20%, 80%, 0.4)",
    focus: "rgb(148, 160, 184)",
    accent: "#e02020",
  },
  fonts: {
    main: "'Arial', sans-serif",
    heading: "'Roboto', sans-serif",
  },
  inputs: {
    background: "hsl(0, 0%, 99%)",
  },
  thumb: {
    background: "#eee",
    icon: "#dcdcdc",
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    background: "#333",
    text: "#fff",
    primary: "#3498db",
    secondary: "#2ecc71",
  },
  fonts: {
    main: "'Arial', sans-serif",
    heading: "'Roboto', sans-serif",
  },
};
