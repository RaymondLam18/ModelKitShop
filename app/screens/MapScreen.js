import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { ThemeContext } from '../contexts/ThemeContext';
import MapComponent from '../components/MapComponent';

function MapScreen({ route, navigation }) {
    const { isDarkMode, fontSize } = useContext(ThemeContext); // Haal het thema en de lettergrootte uit de context
    const { data, initialPlace } = route.params; // Ontvang de plaatsgegevens en de initiële plaats uit de route parameters
    const [location, setLocation] = useState(null); // State om de huidige locatie op te slaan
    const [region, setRegion] = useState(null); // State om de regio van de kaart op te slaan

    // Locatie toestemming vragen en initiële regio instellen
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync(); // Vraag toestemming om de locatie te gebruiken
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({}); // Huidige locatie ophalen
            setLocation(location.coords); // Locatie opslaan

            if (initialPlace) {
                setRegion({
                    latitude: initialPlace.latitude,
                    longitude: initialPlace.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }); // Instellen van de initiële regio op basis van de plaats
            } else {
                setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }); // Instellen van de initiële regio op basis van de huidige locatie
            }
        })();
    }, [initialPlace]);

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <MapComponent
                region={region}
                location={location}
                places={data} // Data van plaatsen doorgeven
                onPressMarker={(place) => navigation.navigate('Details', { place })} // Navigeren naar het detailscherm met de geselecteerde plaats
                isDarkMode={isDarkMode} // Donkere modus doorgeven
                fontSize={fontSize} // Lettergrootte doorgeven
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    darkContainer: {
        backgroundColor: 'black', // Achtergrondkleur voor donkere modus
    },
    button: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: '#841584', // Kleur van de knop
        padding: 10,
        borderRadius: 5, // Rondingen van de knop
    },
    buttonText: {
        color: 'white', // Tekstkleur van de knop
        fontSize: 16, // Lettergrootte van de tekst in de knop
    },
});

export default MapScreen;
