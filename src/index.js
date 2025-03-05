import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ThemeProvider as ContextThemeProvider,
  useTheme,
} from "./context/ThemeContext";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import GlobalStyle from "./styles/globalStyles";
import { lightTheme, darkTheme } from "./styles/theme";

const queryClient = new QueryClient();

const AppWithTheme = () => {
  const { state } = useTheme();

  return (
    <StyledThemeProvider theme={state.isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <App />
    </StyledThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ContextThemeProvider>
          <AppWithTheme />
        </ContextThemeProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
