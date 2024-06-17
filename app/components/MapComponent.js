import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = ({ region: initialRegion, location, places, onPressMarker, isDarkMode, fontSize }) => {
    const [region, setRegion] = useState(initialRegion); // State voor de kaartregio

    // Update de regio als de initiële regio verandert
    useEffect(() => {
        if (initialRegion) {
            setRegion(initialRegion);
        }
    }, [initialRegion]);

    const zoomIn = () => {
        setRegion((prevRegion) => ({
            ...prevRegion,
            latitudeDelta: prevRegion.latitudeDelta / 2, // Zoom in
            longitudeDelta: prevRegion.longitudeDelta / 2, // Zoom in
        }));
    };

    const zoomOut = () => {
        setRegion((prevRegion) => ({
            ...prevRegion,
            latitudeDelta: prevRegion.latitudeDelta * 2, // Zoom uit
            longitudeDelta: prevRegion.longitudeDelta * 2, // Zoom uit
        }));
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            {region ? (
                <MapView
                    style={styles.map}
                    region={region} // De huidige regio van de kaart
                    onRegionChangeComplete={(region) => setRegion(region)} // Regio bijwerken bij verandering
                >
                    {location && (
                        <Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            title="You are here" // Marker voor de huidige locatie
                            pinColor="blue" // Kleur van de pin
                        />
                    )}
                    {places.map((point, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: point.latitude,
                                longitude: point.longitude,
                            }}
                            title={point.title} // Titel van de plaats
                            description={point.description} // Beschrijving van de plaats
                            onPress={() => onPressMarker(point)} // Functie om te navigeren naar het detailscherm
                        />
                    ))}
                </MapView>
            ) : (
                <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>Loading...</Text> // Laat een laadbericht zien als de regio nog niet is ingesteld
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={zoomIn} style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={zoomOut} style={styles.button}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    darkContainer: {
        backgroundColor: 'black', // Achtergrondkleur voor donkere modus
    },
    map: {
        flex: 1, // De kaart vult de hele container
    },
    text: {
        color: 'black', // Standaard tekstkleur
    },
    darkText: {
        color: 'white', // Tekstkleur voor donkere modus
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'column', // Knoppen in een kolom
    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparante achtergrondkleur
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        borderRadius: 20, // Ronde knoppen
    },
    buttonText: {
        color: 'white', // Tekstkleur van de knoppen
        fontSize: 20, // Lettergrootte van de tekst in de knoppen
    },
});

export default MapComponent;
