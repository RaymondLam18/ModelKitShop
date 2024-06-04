import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Context om het thema en de lettergrootte in de applicatie te beheren
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false); // State om de donkere modus aan of uit te zetten
    const [fontSize, setFontSize] = useState(16); // State om de lettergrootte in te stellen

    useEffect(() => {
        loadSettings(); // Instellingen laden bij het opstarten van de app
    }, []);

    // Functie om de opgeslagen instellingen te laden
    const loadSettings = async () => {
        try {
            const darkMode = await AsyncStorage.getItem('@dark_mode'); // Donkere modus instelling ophalen
            const storedFontSize = await AsyncStorage.getItem('@font_size'); // Lettergrootte instelling ophalen

            if (darkMode !== null) {
                setIsDarkMode(JSON.parse(darkMode)); // Donkere modus instellen
            }
            if (storedFontSize !== null) {
                setFontSize(parseInt(storedFontSize)); // Lettergrootte instellen
            }
        } catch (e) {
            console.error(e); // Foutafhandeling
        }
    };

    // Functie om de donkere modus te toggelen
    const toggleTheme = async () => {
        try {
            const newDarkMode = !isDarkMode; // Nieuwe waarde voor donkere modus
            setIsDarkMode(newDarkMode); // State bijwerken
            await AsyncStorage.setItem('@dark_mode', JSON.stringify(newDarkMode)); // Donkere modus opslaan
        } catch (e) {
            console.error(e); // Foutafhandeling
        }
    };

    // Functie om de lettergrootte te veranderen
    const changeFontSize = async (newFontSize) => {
        try {
            setFontSize(newFontSize); // State bijwerken
            await AsyncStorage.setItem('@font_size', newFontSize.toString()); // Lettergrootte opslaan
        } catch (e) {
            console.error(e); // Foutafhandeling
        }
    };

    return (
        <ThemeContext.Provider
            value={{
                isDarkMode, // Donkere modus
                toggleTheme, // Functie om de donkere modus te toggelen
                fontSize, // Lettergrootte
                setFontSize: changeFontSize, // Functie om de lettergrootte te veranderen
            }}
        >
            {children} {/* Kindcomponenten die toegang hebben tot de contextwaarden */}
        </ThemeContext.Provider>
    );
};
