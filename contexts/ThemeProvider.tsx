import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'overdrive' | 'stealth';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('portfolio-theme');
        return (saved as Theme) || 'overdrive';
    });

    useEffect(() => {
        localStorage.setItem('portfolio-theme', theme);

        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme);

        // Update CSS custom properties
        if (theme === 'stealth') {
            document.documentElement.style.setProperty('--color-primary', '0, 255, 100'); // Green
            document.documentElement.style.setProperty('--color-bg', '0, 10, 5'); // Dark green-black
            document.documentElement.style.setProperty('--color-secondary', '0, 200, 80');
        } else {
            document.documentElement.style.setProperty('--color-primary', '255, 94, 0'); // Orange
            document.documentElement.style.setProperty('--color-bg', '255, 255, 255'); // White
            document.documentElement.style.setProperty('--color-secondary', '17, 24, 39');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'overdrive' ? 'stealth' : 'overdrive');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
