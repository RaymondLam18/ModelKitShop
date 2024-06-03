import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Context voor thema-instellingen
export const ThemeContext = createContext();

// Provider component voor thema-instellingen
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);  // State om de donkere modus op te slaan

    useEffect(() => {
        // Thema-instellingen laden bij het opstarten van de app
        const loadSettings = async () => {
            try {
                const value = await AsyncStorage.getItem('@dark_mode');
                if (value !== null) {
                    setIsDarkMode(JSON.parse(value));
                }
            } catch (e) {
                console.error(e);
            }
        };

        loadSettings();
    }, []);

    const toggleTheme = async () => {
        // Thema wisselen en opslaan
        setIsDarkMode(previousState => {
            const newValue = !previousState;
            AsyncStorage.setItem('@dark_mode', JSON.stringify(newValue));
            return newValue;
        });
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
