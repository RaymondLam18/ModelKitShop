import React, { useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import PlaceItem from '../components/PlaceItem';

// Scherm om een lijst van plaatsen weer te geven
function PlacesListScreen({ route, navigation }) {
    const { isDarkMode, fontSize } = useContext(ThemeContext);
    const { data } = route.params;

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <PlaceItem
                        place={item}
                        onPress={() => navigation.navigate('Map', {
                            data,
                            initialPlace: item,
                        })}
                        isDarkMode={isDarkMode}
                        fontSize={fontSize}
                    />
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
});

export default PlacesListScreen;
