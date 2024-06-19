import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../contexts/ThemeContext';
import { AirbnbRating } from 'react-native-ratings';
import CustomButton from '../components/CustomButton';

function DetailsScreen({ route, navigation }) {
    const { isDarkMode, fontSize } = useContext(ThemeContext);
    const { place } = route.params;
    const { title, latitude, longitude, description } = place;

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        loadRatingAndReviews();
    }, []);

    const loadRatingAndReviews = async () => {
        try {
            const storedRating = await AsyncStorage.getItem(`@rating_${title}`);
            if (storedRating !== null) {
                setRating(parseInt(storedRating));
            }

            const storedReviews = await AsyncStorage.getItem(`@reviews_${title}`);
            if (storedReviews !== null) {
                setReviews(JSON.parse(storedReviews));
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

    const saveReview = async () => {
        if (review.trim()) {
            try {
                const updatedReviews = [...reviews, review];
                await AsyncStorage.setItem(`@reviews_${title}`, JSON.stringify(updatedReviews));
                setReviews(updatedReviews);
                setReview('');
                Keyboard.dismiss();
            } catch (e) {
                console.error(e);
            }
        }
    };

    const renderItem = ({ item }) => (
        <Text style={[styles.reviewText, isDarkMode && styles.darkText, { fontSize }]}>
            {item}
        </Text>
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container, isDarkMode && styles.darkContainer]}>
                <FlatList
                    ListHeaderComponent={
                        <>
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
                            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>Reviews:</Text>
                        </>
                    }
                    data={reviews}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    ListFooterComponent={
                        <View>
                            <TextInput
                                style={[styles.input, isDarkMode && styles.darkInput, { fontSize }]}
                                multiline
                                numberOfLines={4}
                                onChangeText={setReview}
                                value={review}
                                placeholder="Write your review here"
                                placeholderTextColor={isDarkMode ? 'gray' : 'darkgray'}
                            />
                            <CustomButton title="Save Review" onPress={saveReview} />
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
                    }
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
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
    reviewText: {
        color: 'black',
        marginVertical: 5,
        fontSize: 14,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
        marginVertical: 10,
    },
    darkInput: {
        borderColor: 'lightgray',
        backgroundColor: 'black',
        color: 'white',
    },
    buttonContainer: {
        marginTop: 10,
        width: '100%',
    },
});

export default DetailsScreen;
