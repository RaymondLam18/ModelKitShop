import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../contexts/ThemeContext';
import { AirbnbRating } from 'react-native-ratings';
import CustomButton from '../components/CustomButton';

function DetailsScreen({ route, navigation }) {
    const { isDarkMode, fontSize } = useContext(ThemeContext);
    const { place } = route.params; // Ontvang de plaatsgegevens van de route params
    const { title, latitude, longitude, description } = place;

    const [rating, setRating] = useState(0);

    useEffect(() => {
        loadRating();
    }, []);

    const loadRating = async () => {
        try {
            const storedRating = await AsyncStorage.getItem(`@rating_${title}`);
            if (storedRating !== null) {
                setRating(parseInt(storedRating));
            }
        } catch (e) {
            console.error(e);
        }
    };

    const saveRating = async (newRating) => {
        try {
            await AsyncStorage.setItem(`@rating_${title}`, newRating.toString());
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
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>Description: {description}</Text>
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>Rating:</Text>
            <AirbnbRating
                count={5}
                reviews={['Bad', 'OK', 'Good', 'Very Good', 'Amazing']}
                defaultRating={rating}
                size={20}
                onFinishRating={saveRating}
            />
            <View style={styles.buttonContainer}>
                <CustomButton
                    title="Go to Home"
                    onPress={() => navigation.navigate('Home')}
                />
                <CustomButton
                    title="Go back"
                    onPress={() => navigation.goBack()}
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
        backgroundColor: 'white',
    },
    darkContainer: {
        backgroundColor: 'black',
    },
    text: {
        color: 'black',
        marginVertical: 5,
    },
    darkText: {
        color: 'white',
        marginVertical: 5,
    },
    buttonContainer: {
        marginTop: 10,
        width: '80%',
    },
});

export default DetailsScreen;
