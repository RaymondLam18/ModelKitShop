import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

// Scherm om de details van een geselecteerde plaats weer te geven
function DetailsScreen({ route, navigation }) {
    const { isDarkMode } = useContext(ThemeContext); // Verkrijgen van de donkere modus instelling
    const { title, description, latitude, longitude } = route.params; // Verkrijgen van de details van de plaats

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.text, isDarkMode && styles.darkText]}>Details Screen</Text>
            <Text style={[styles.text, isDarkMode && styles.darkText]}>Title: {title}</Text>
            <Text style={[styles.text, isDarkMode && styles.darkText]}>Description: {description}</Text>
            <Text style={[styles.text, isDarkMode && styles.darkText]}>Latitude: {latitude}</Text>
            <Text style={[styles.text, isDarkMode && styles.darkText]}>Longitude: {longitude}</Text>
            <Button
                title="Go back" //Terug naar vorige scherm
                onPress={() => navigation.goBack()} />
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

export default DetailsScreen;
