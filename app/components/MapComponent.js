import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = ({ region: initialRegion, location, places, onPressMarker, isDarkMode, fontSize }) => {
    const [region, setRegion] = useState(initialRegion);  // State voor de kaartregio

    useEffect(() => {
        if (initialRegion) {
            setRegion(initialRegion);
        }
    }, [initialRegion]);

    const zoomIn = () => {
        setRegion((prevRegion) => ({
            ...prevRegion,
            latitudeDelta: prevRegion.latitudeDelta / 2,
            longitudeDelta: prevRegion.longitudeDelta / 2,
        }));
    };

    const zoomOut = () => {
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
                        <Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            title="You are here"
                            pinColor="blue"
                        />
                    )}
                    {places.map((point, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: point.latitude,
                                longitude: point.longitude,
                            }}
                            title={point.title}
                            description={point.description}
                            onPress={() => onPressMarker(point)}
                        />
                    ))}
                </MapView>
            ) : (
                <Text style={[styles.text, isDarkMode && styles.darkText, { fontSize }]}>Loading...</Text>
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

export default MapComponent;
