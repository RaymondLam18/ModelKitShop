import React, { useContext, useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

// Scherm om de startpagina weer te geven
function HomeScreen({ navigation }) {
    const { isDarkMode } = useContext(ThemeContext);  // Verkrijgen van de donkere modus instelling
    const [data, setData] = useState([]);  // State om de data van de plaatsen op te slaan

    useEffect(() => {
        // Data ophalen van de webservice
        fetch('https://stud.hosted.hr.nl/1024322/data.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error));
    }, []);

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Button
                title="Go to Places List"  // Knop om naar de lijst met plaatsen te gaan
                onPress={() => navigation.navigate('PlacesList', { data })}
            />
            <Button
                title="Show Map"  // Knop om de kaart weer te geven
                onPress={() => navigation.navigate('Map', { data })}
            />
            <Button
                title="Go to Settings"  // Knop om naar de instellingen te gaan
                onPress={() => navigation.navigate('Settings')}
            />
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
    },
    darkText: {
        color: 'white',
    },
});

export default HomeScreen;
