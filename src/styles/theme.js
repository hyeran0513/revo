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
    secondary: "#2ecc71",
  },
  fonts: {
    main: "'Arial', sans-serif",
    heading: "'Roboto', sans-serif",
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
