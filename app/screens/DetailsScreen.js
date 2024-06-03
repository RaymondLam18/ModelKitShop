import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../contexts/ThemeContext';
import { AirbnbRating } from 'react-native-ratings';

// Scherm om de details van een plaats weer te geven en een beoordeling te geven
function DetailsScreen({ route, navigation }) {
    const { isDarkMode } = useContext(ThemeContext);  // Verkrijgen van de donkere modus instelling
    const { itemId, title, latitude, longitude } = route.params;  // Verkrijgen van de route parameters

    const [rating, setRating] = useState(0);  // Rating staat

    useEffect(() => {
        loadRating();  // Rating laden wanneer de component mount
    }, []);

    const loadRating = async () => {
        try {
            const storedRating = await AsyncStorage.getItem(`@rating_${itemId}`);  // Rating ophalen uit AsyncStorage
            if (storedRating !== null) {
                setRating(parseInt(storedRating));  // Rating instellen als deze bestaat
            }
        } catch (e) {
            console.error(e);  // Fouten afdrukken als er iets misgaat
        }
    };

    const saveRating = async (newRating) => {
        try {
            await AsyncStorage.setItem(`@rating_${itemId}`, newRating.toString());  // Rating opslaan in AsyncStorage
            setRating(newRating);  // Rating bijwerken
        } catch (e) {
            console.error(e);  // Fouten afdrukken als er iets misgaat
        }
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.text, isDarkMode && styles.darkText]}>{title}</Text>  // Titel van de plaats
            <Text style={[styles.text, isDarkMode && styles.darkText]}>Latitude: {latitude}</Text>  // Breedtegraad
            <Text style={[styles.text, isDarkMode && styles.darkText]}>Longitude: {longitude}</Text>  // Lengtegraad
            <Text style={[styles.text, isDarkMode && styles.darkText]}>Rating:</Text>  // Rating label
            <AirbnbRating
                count={5}
                reviews={['Bad', 'OK', 'Good', 'Very Good', 'Amazing']}
                defaultRating={rating}
                size={20}
                onFinishRating={saveRating}  // Rating bijwerken wanneer de gebruiker een nieuwe rating geeft
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />  // Knop om naar de startpagina te gaan
            <Button title="Go back" onPress={() => navigation.goBack()} />  // Knop om terug te gaan naar de vorige pagina
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
