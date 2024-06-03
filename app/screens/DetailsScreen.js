import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../contexts/ThemeContext';
import { AirbnbRating } from 'react-native-ratings';

function DetailsScreen({ route, navigation }) {
    const { isDarkMode } = useContext(ThemeContext);
    const { itemId, title, latitude, longitude } = route.params;

    const [rating, setRating] = useState(0);

    useEffect(() => {
        loadRating();
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
            <Text style={[styles.text, isDarkMode && styles.darkText]}>{title}</Text>
            <Text style={[styles.text, isDarkMode && styles.darkText]}>Latitude: {latitude}</Text>
            <Text style={[styles.text, isDarkMode && styles.darkText]}>Longitude: {longitude}</Text>
            <Text style={[styles.text, isDarkMode && styles.darkText]}>Rating:</Text>
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
