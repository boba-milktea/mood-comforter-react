import { useState, createContext, useContext } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [moodTheme, setMoodTheme] = useState("");

  return (
    <ThemeContext.Provider value={{ moodTheme, setMoodTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// constum hook
export const useTheme = () => {
  const moodTheme = useContext(ThemeContext);
  if (moodTheme === undefined) throw new Error("context is undefined");
  return moodTheme;
};

export default ThemeProvider;
