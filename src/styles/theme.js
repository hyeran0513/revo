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
    primary: "#9D7DC9",
    secondary: "#999",
    border: "hsla(220, 20%, 80%, 0.4)",
    focus: "rgb(148, 160, 184)",
    accent: "#F9779B",
    hover: "#f8f8f8",
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
  scrollbar: {
    track: "#f6f5f7",
    thumb: "#e8e8e8",
  },
  chats: {
    sendbubble: "#9D7DC9",
    sendtext: "#fff",
    receivebubble: "#f6f5f7",
    receivetext: "#333",
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    background: "#171721",
    text: "#FEFEFF",
    primary: "#9D7DC9",
    secondary: "#D4D4DE",
    border: "hsla(220, 20%, 80%, 0.4)",
    focus: "rgb(148, 160, 184)",
    accent: "#F9779B",
    hover: "#242430",
  },
  fonts: {
    main: "'Arial', sans-serif",
    heading: "'Roboto', sans-serif",
  },
  inputs: {
    background: "#1E1E2A",
  },
  thumb: {
    background: "#1E1E2A",
    icon: "#6F6E76",
  },
  scrollbar: {
    track: "#1E1E28",
    thumb: "#74747C",
  },
  chats: {
    sendbubble: "#9D7DC9",
    sendtext: "#fff",
    receivebubble: "#21212D",
    receivetext: "#B2B2BA",
  },
};
