import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import MapScreen from './app/screens/MapScreen';
import PlacesListScreen from './app/screens/PlacesListScreen';
import DetailsScreen from './app/screens/DetailsScreen';
import { ThemeProvider, ThemeContext } from './app/contexts/ThemeContext';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </ThemeProvider>
    );
}

function AppNavigator() {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: isDarkMode ? 'black' : 'white',
                },
                headerTintColor: isDarkMode ? 'white' : 'black',
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="PlacesList" component={PlacesListScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    );
}

export default App;

