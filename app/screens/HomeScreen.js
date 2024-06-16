import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import CustomButton from '../components/CustomButton';

// Scherm om de startpagina weer te geven
function HomeScreen({ navigation }) {
    const { isDarkMode } = useContext(ThemeContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://stud.hosted.hr.nl/1024322/data.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error));
    }, []);

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <CustomButton
                title="Go to Places List"
                onPress={() => navigation.navigate('PlacesList', { data })}
            />
            <CustomButton
                title="Show Map"
                onPress={() => navigation.navigate('Map', { data })}
            />
            <CustomButton
                title="Go to Settings"
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
});

export default HomeScreen;
