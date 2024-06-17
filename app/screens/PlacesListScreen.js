import React, { useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import PlaceItem from '../components/PlaceItem';

// Scherm om een lijst van plaatsen weer te geven
function PlacesListScreen({ route, navigation }) {
    const { isDarkMode, fontSize } = useContext(ThemeContext); // Haal het thema en de lettergrootte uit de context
    const { data } = route.params; // Ontvang de plaatsgegevens van de route parameters

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <FlatList
                data={data} // Data voor de FlatList
                keyExtractor={(item, index) => index.toString()} // Unieke key voor elk item
                renderItem={({ item }) => (
                    <PlaceItem
                        place={item} // Plaats object doorgeven
                        onPress={() => navigation.navigate('Map', {
                            data,
                            initialPlace: item,
                        })} // Navigeren naar de kaart met de geselecteerde plaats
                        isDarkMode={isDarkMode} // Donkere modus doorgeven
                        fontSize={fontSize} // Lettergrootte doorgeven
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // Standaard achtergrondkleur
    },
    darkContainer: {
        backgroundColor: 'black', // Achtergrondkleur voor donkere modus
    },
});

export default PlacesListScreen;
