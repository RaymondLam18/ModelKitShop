import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

// Een herbruikbaar component voor een plaats item
const PlaceItem = ({ place, onPress, isDarkMode, fontSize }) => {
    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>
                {place.title}
            </Text>
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
});

export default PlaceItem;
