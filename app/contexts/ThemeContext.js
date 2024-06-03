import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState(16);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const darkModeValue = await AsyncStorage.getItem('@dark_mode');
                const fontSizeValue = await AsyncStorage.getItem('@font_size');
                if (darkModeValue !== null) {
                    setIsDarkMode(JSON.parse(darkModeValue));
                }
                if (fontSizeValue !== null) {
                    setFontSize(parseInt(fontSizeValue));
                }
            } catch (e) {
                console.error(e);
            }
        };

        loadSettings();
    }, []);

    const toggleTheme = async () => {
        setIsDarkMode(previousState => {
            const newValue = !previousState;
            AsyncStorage.setItem('@dark_mode', JSON.stringify(newValue));
            return newValue;
        });
    };

    const saveFontSize = async (size) => {
        try {
            await AsyncStorage.setItem('@font_size', size.toString());
            setFontSize(size);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, fontSize, setFontSize: saveFontSize }}>
            {children}
        </ThemeContext.Provider>
    );
};
