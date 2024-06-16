import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

// Een herbruikbare component voor de instellingen
const SettingsComponent = ({ isDarkMode, toggleTheme, fontSize, handleSliderChange, handleSliderComplete }) => {
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
                value={fontSize}
                onValueChange={handleSliderChange}
                onSlidingComplete={handleSliderComplete}
                step={1}
            />
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>Current Font Size: {fontSize}</Text>
        </View>
    );
};

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

export default SettingsComponent;
