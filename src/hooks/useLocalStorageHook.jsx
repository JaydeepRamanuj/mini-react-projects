import { useEffect, useState } from "react";

function useLocalStorageHook(defaultVal) {
  const [theme, setTheme] = useState(() => {
    let currentThemeVal = localStorage.getItem("mode");
    return currentThemeVal || defaultVal;
  });

  useEffect(() => {
    localStorage.setItem("mode", theme);
  }, [theme]);

  return [theme, setTheme];
}

export default useLocalStorageHook;
