import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { ThemeContext } from '../contexts/ThemeContext';
import MapComponent from '../components/MapComponent';

function MapScreen({ route, navigation }) {
    const { isDarkMode, fontSize } = useContext(ThemeContext);
    const { data, initialPlace } = route.params;
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);

            if (initialPlace) {
                setRegion({
                    latitude: initialPlace.latitude,
                    longitude: initialPlace.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            } else {
                setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            }
        })();
    }, [initialPlace]);

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <MapComponent
                region={region}
                location={location}
                places={data}
                onPressMarker={(place) => navigation.navigate('Details', { place })}
                isDarkMode={isDarkMode}
                fontSize={fontSize}
            />
            {/*<TouchableOpacity*/}
            {/*    style={styles.button}*/}
            {/*    onPress={() => navigation.goBack()}*/}
            {/*>*/}
            {/*    <Text style={styles.buttonText}>Go Back</Text>*/}
            {/*</TouchableOpacity>*/}
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
    button: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: '#841584',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default MapScreen;
