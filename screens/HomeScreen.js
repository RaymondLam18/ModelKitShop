import React, { useContext, useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

    const saveData = async () => {
        // Data lokaal opslaan
        try {
            await AsyncStorage.setItem('@storage_Key', JSON.stringify(data));
        } catch (e) {
            console.error(e);
        }
    };

    const loadData = async () => {
        // Data lokaal laden
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key');
            if (jsonValue != null) {
                setData(JSON.parse(jsonValue));
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        // Data laden bij het opstarten van de app
        loadData();
    }, []);

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.text, isDarkMode && styles.darkText]}>Home Screen</Text>
            <Button
                title="Save Data Locally"  // Knop om data lokaal op te slaan
                onPress={saveData}
            />
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
