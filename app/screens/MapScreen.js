import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { ThemeContext } from '../contexts/ThemeContext';

// Scherm om de kaart weer te geven
function MapScreen({ route, navigation }) {
    const { isDarkMode } = useContext(ThemeContext);  // Verkrijgen van de donkere modus instelling
    const { data, initialPlace } = route.params;  // Verkrijgen van de data van de plaatsen en de initiële plaats
    const [location, setLocation] = useState(null);  // Huidige locatie van de gebruiker
    const [region, setRegion] = useState(null);  // Kaart regio

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();  // Verzoek om locatie permissies
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});  // Huidige locatie verkrijgen
            setLocation(location.coords);

            if (initialPlace) {
                // Instellen van de regio op basis van de geselecteerde plaats
                setRegion({
                    latitude: initialPlace.latitude,
                    longitude: initialPlace.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            } else {
                // Instellen van de regio op basis van de huidige locatie
                setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            }
        })();
    }, [initialPlace]);

    const zoomIn = () => {
        // Inzoomen op de kaart
        setRegion((prevRegion) => ({
            ...prevRegion,
            latitudeDelta: prevRegion.latitudeDelta / 2,
            longitudeDelta: prevRegion.longitudeDelta / 2,
        }));
    };

    const zoomOut = () => {
        // Uitzoomen op de kaart
        setRegion((prevRegion) => ({
            ...prevRegion,
            latitudeDelta: prevRegion.latitudeDelta * 2,
            longitudeDelta: prevRegion.longitudeDelta * 2,
        }));
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            {region ? (
                <MapView
                    style={styles.map}
                    region={region}
                    onRegionChangeComplete={(region) => setRegion(region)}
                >
                    {location && (
                        // Marker voor de huidige locatie van de gebruiker
                        <Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            title="You are here"
                            pinColor="blue"
                        />
                    )}
                    {data.map((point, index) => (
                        // Markers voor alle plaatsen
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: point.latitude,
                                longitude: point.longitude,
                            }}
                            title={point.title}
                            description={point.description}
                            onPress={() => navigation.navigate('Details', {
                                title: point.title,
                                description: point.description,
                                latitude: point.latitude,
                                longitude: point.longitude,
                            })}
                        />
                    ))}
                </MapView>
            ) : (
                <Text style={[styles.text, isDarkMode && styles.darkText]}>Loading...</Text>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    darkContainer: {
        backgroundColor: 'black',
    },
    map: {
        flex: 1,
    },
    text: {
        color: 'black',
    },
    darkText: {
        color: 'white',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'column',
    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
});

export default MapScreen;
