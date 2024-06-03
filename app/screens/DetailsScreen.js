import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../contexts/ThemeContext';
import { AirbnbRating } from 'react-native-ratings';

// Scherm om de details van een plaats weer te geven
function DetailsScreen({ route, navigation }) {
    const { isDarkMode, fontSize } = useContext(ThemeContext);  // Verkrijgen van de donkere modus en lettergrootte instellingen
    const { itemId, title, latitude, longitude } = route.params;  // Verkrijgen van de details van de plaats

    const [rating, setRating] = useState(0);  // State om de beoordeling op te slaan

    useEffect(() => {
        loadRating();  // Beoordeling laden bij het opstarten van het scherm
    }, []);

    const loadRating = async () => {
        try {
            const storedRating = await AsyncStorage.getItem(`@rating_${itemId}`);
            if (storedRating !== null) {
                setRating(parseInt(storedRating));
            }
        } catch (e) {
            console.error(e);
        }
    };

    const saveRating = async (newRating) => {
        try {
            await AsyncStorage.setItem(`@rating_${itemId}`, newRating.toString());
            setRating(newRating);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>{title}</Text>
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>Latitude: {latitude}</Text>
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>Longitude: {longitude}</Text>
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>Rating:</Text>
            <AirbnbRating
                count={5}
                reviews={['Bad', 'OK', 'Good', 'Very Good', 'Amazing']}
                defaultRating={rating}
                size={20}
                onFinishRating={saveRating}
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
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
