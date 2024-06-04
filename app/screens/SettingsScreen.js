import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';

function SettingsScreen() {
    const { isDarkMode, toggleTheme, fontSize, setFontSize } = useContext(ThemeContext);
    const [tempFontSize, setTempFontSize] = useState(fontSize);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const storedFontSize = await AsyncStorage.getItem('@font_size');
            if (storedFontSize !== null) {
                setFontSize(parseInt(storedFontSize));
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleSliderChange = (size) => {
        setTempFontSize(size);
    };

    const handleSliderComplete = (size) => {
        setFontSize(size);
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>Dark Mode</Text>
            <Switch
                onValueChange={toggleTheme}
                value={isDarkMode}
            />
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>Font Size</Text>
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={10}
                maximumValue={30}
                value={tempFontSize}
                onValueChange={handleSliderChange}
                onSlidingComplete={handleSliderComplete}
                step={1}
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
