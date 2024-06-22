import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlaceItem = ({ place, onPress, isDarkMode, fontSize }) => {
    // Houdt de huidige beoordeling bij
    const [rating, setRating] = useState(null);

    useEffect(() => {
        const loadRating = async () => {
            try {
                // Laadt de beoordeling uit AsyncStorage
                const storedRating = await AsyncStorage.getItem(`@rating_${place.title}`);
                if (storedRating !== null) {
                    setRating(parseInt(storedRating));
                }
            } catch (e) {
                console.error(e);
            }
        };

        loadRating();
    }, [place.title]);

    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>
                {place.title}
            </Text>
            {rating !== null && (
                <Text style={[styles.ratingText, isDarkMode && styles.darkText, { fontSize }]}>
                    Rating: {rating} / 5
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        color: 'black',
    },
    darkText: {
        color: 'white',
    },
    ratingText: {
        color: 'black',
        marginTop: 5,
    },
});

export default PlaceItem;
