import { createContext, useContext, useReducer, useEffect } from "react";

// 초기 상태
const initialState = {
  isDarkMode: JSON.parse(localStorage.getItem("isDarkMode")) || false,
};

// Reducer
const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, isDarkMode: !state.isDarkMode };
    default:
      return state;
  }
};

// Context 생성
const ThemeContext = createContext();

// Provider 컴포넌트
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // 상태 변경 시 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(state.isDarkMode));
  }, [state.isDarkMode]);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook
export const useTheme = () => useContext(ThemeContext);
