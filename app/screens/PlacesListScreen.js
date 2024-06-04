import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

// Scherm om een lijst van plaatsen weer te geven
function PlacesListScreen({ route, navigation }) {
    const { isDarkMode, fontSize } = useContext(ThemeContext);  // Verkrijgen van de donkere modus instelling en lettergrootte
    const { data } = route.params;  // Verkrijgen van de data van de plaatsen

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <FlatList
                data={data}  // Lijst met plaatsen
                keyExtractor={(item, index) => index.toString()}  // Unieke sleutel voor elk item
                renderItem={({ item }) => (
                    // Elke plaats is een klikbare knop
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => navigation.navigate('Map', {
                            data,
                            initialPlace: item,  // Navigeren naar het kaartscherm met de geselecteerde plaats
                        })}
                    >
                        <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize: fontSize }]}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    darkContainer: {
        backgroundColor: 'black',
    },
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

export default PlacesListScreen;
