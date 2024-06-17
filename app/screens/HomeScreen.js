import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import CustomButton from '../components/CustomButton';

// Scherm om de startpagina weer te geven
function HomeScreen({ navigation }) {
    const { isDarkMode } = useContext(ThemeContext); // Haal het thema uit de context
    const [data, setData] = useState([]); // State om de plaatsgegevens op te slaan

    // Data ophalen van een externe bron bij het laden van het component
    useEffect(() => {
        fetch('https://stud.hosted.hr.nl/1024322/data.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error));
    }, []);

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <CustomButton
                title="Go to Places List"
                onPress={() => navigation.navigate('PlacesList', { data })} // Navigeren naar de plaatsenlijst
            />
            <CustomButton
                title="Show Map"
                onPress={() => navigation.navigate('Map', { data })} // Navigeren naar de kaart
            />
            <CustomButton
                title="Go to Settings"
                onPress={() => navigation.navigate('Settings')} // Navigeren naar de instellingen
            />
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
});

export default HomeScreen;
