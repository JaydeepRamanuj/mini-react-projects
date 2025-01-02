import { useEffect, useState } from 'react';

function useLocalStorageHook(val) {
  const [theme, setTheme] = useState(() => {
    let currentThemeVal = localStorage.getItem('mode');
    localStorage.setItem('mode', theme);
    return currentThemeVal;
  });

  useEffect(() => {
    localStorage.setItem('mode', val);
  }, [val]);

  return [theme, setTheme];
}

export default useLocalStorageHook;
