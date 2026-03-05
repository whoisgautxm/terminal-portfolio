import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeName = 'hack' | 'dracula' | 'cyberpunk' | 'synthwave' | 'light';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  crtEnabled: boolean;
  setCrtEnabled: (enabled: boolean) => void;
  matrixEnabled: boolean;
  setMatrixEnabled: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(() => {
    const saved = localStorage.getItem('portfolio_theme');
    return (saved as ThemeName) || 'hack';
  });

  const [crtEnabled, setCrtEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio_crt');
    return saved !== null ? saved === 'true' : true; // Default to true
  });

  const [matrixEnabled, setMatrixEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio_matrix');
    return saved !== null ? saved === 'true' : false; // Default to false
  });

  useEffect(() => {
    localStorage.setItem('portfolio_theme', theme);
    if (theme === 'hack') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('portfolio_crt', crtEnabled.toString());
  }, [crtEnabled]);

  useEffect(() => {
    localStorage.setItem('portfolio_matrix', matrixEnabled.toString());
  }, [matrixEnabled]);

  return (
    <ThemeContext.Provider value={{
      theme, setTheme,
      crtEnabled, setCrtEnabled,
      matrixEnabled, setMatrixEnabled
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
