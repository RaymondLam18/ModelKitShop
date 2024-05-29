import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

// Scherm om de instellingen weer te geven
function SettingsScreen() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);  // Verkrijgen van de donkere modus instelling en de functie om het thema te wisselen

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.text, isDarkMode && styles.darkText]}>Settings Screen</Text>
            <Text style={[styles.text, isDarkMode && styles.darkText]}>Dark Mode</Text>
            <Switch
                onValueChange={toggleTheme}  // Wisselen van het thema
                value={isDarkMode}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    darkContainer: {
        backgroundColor: 'black',
    },
    text: {
        color: 'black',
    },
    darkText: {
        color: 'white',
    },
});

export default SettingsScreen;
