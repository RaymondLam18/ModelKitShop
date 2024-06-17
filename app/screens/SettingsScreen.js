import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';

function SettingsScreen() {
    const { isDarkMode, toggleTheme, fontSize, setFontSize } = useContext(ThemeContext); // Haal het thema en de lettergrootte uit de context
    const [tempFontSize, setTempFontSize] = useState(fontSize); // Temporare lettergrootte state

    // Instellingen laden bij het laden van het component
    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const storedFontSize = await AsyncStorage.getItem('@font_size'); // Lettergrootte ophalen uit AsyncStorage
            if (storedFontSize !== null) {
                setTempFontSize(parseInt(storedFontSize)); // Lettergrootte instellen als die bestaat
            }
        } catch (e) {
            console.error(e); // Foutafhandeling
        }
    };

    const handleSliderChange = (size) => {
        setTempFontSize(size); // Temporare lettergrootte bijwerken tijdens het slepen
    };

    const handleSliderComplete = (size) => {
        setFontSize(size); // Lettergrootte opslaan bij het loslaten van de slider
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>Dark Mode</Text>
            <Switch
                onValueChange={toggleTheme} // Thema wisselen
                value={isDarkMode} // Huidige waarde van de donkere modus
            />
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>Font Size</Text>
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={10} // Minimale waarde voor de slider
                maximumValue={30} // Maximale waarde voor de slider
                value={tempFontSize} // Huidige waarde van de slider
                onValueChange={handleSliderChange} // Bijwerken tijdens het slepen
                onSlidingComplete={handleSliderComplete} // Opslaan bij het loslaten
                step={1} // Stappen van de slider
            />
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>Current Font Size: {tempFontSize}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white', // Standaard achtergrondkleur
    },
    darkContainer: {
        backgroundColor: 'black', // Achtergrondkleur voor donkere modus
    },
    text: {
        color: 'black', // Standaard tekstkleur
    },
    darkText: {
        color: 'white', // Tekstkleur voor donkere modus
    },
});

export default SettingsScreen;
