import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../contexts/ThemeContext';
import { AirbnbRating } from 'react-native-ratings';
import CustomButton from '../components/CustomButton';

function DetailsScreen({ route, navigation }) {
    const { isDarkMode, fontSize } = useContext(ThemeContext); // Haal het thema en de lettergrootte uit de context
    const { place } = route.params; // Ontvang de plaatsgegevens van de route params
    const { title, latitude, longitude, description } = place; // Destructureer de plaatsgegevens

    const [rating, setRating] = useState(0); // State om de beoordeling op te slaan

    // Beoordeling laden bij het laden van het component
    useEffect(() => {
        loadRating();
    }, []);

    const loadRating = async () => {
        try {
            const storedRating = await AsyncStorage.getItem(`@rating_${title}`); // Beoordeling ophalen uit AsyncStorage
            if (storedRating !== null) {
                setRating(parseInt(storedRating)); // Beoordeling instellen als die bestaat
            }
        } catch (e) {
            console.error(e); // Foutafhandeling
        }
    };

    const saveRating = async (newRating) => {
        try {
            await AsyncStorage.setItem(`@rating_${title}`, newRating.toString()); // Beoordeling opslaan in AsyncStorage
            setRating(newRating); // State bijwerken
        } catch (e) {
            console.error(e); // Foutafhandeling
        }
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>{title}</Text>
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>Latitude: {latitude}</Text>
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>Longitude: {longitude}</Text>
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>Description: {description}</Text>
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>Rating:</Text>
            <AirbnbRating
                count={5}
                reviews={['Bad', 'OK', 'Good', 'Very Good', 'Amazing']} // Beoordelingslabels
                defaultRating={rating}
                size={20}
                onFinishRating={saveRating} // Functie om de beoordeling op te slaan
            />
            <View style={styles.buttonContainer}>
                <CustomButton
                    title="Go to Home"
                    onPress={() => navigation.navigate('Home')} // Navigeren naar de startpagina
                />
                <CustomButton
                    title="Go back"
                    onPress={() => navigation.goBack()} // Terug navigeren naar het vorige scherm
                />
            </View>
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
        color: 'black',
        marginVertical: 5, // Marges voor tekst
    },
    darkText: {
        color: 'white',
        marginVertical: 5, // Marges voor tekst in donkere modus
    },
    buttonContainer: {
        marginTop: 10,
        width: '80%', // Knoppen container breedte
    },
});

export default DetailsScreen;
