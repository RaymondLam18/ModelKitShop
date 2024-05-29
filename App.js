import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import PlacesListScreen from './screens/PlacesListScreen';
import MapScreen from './screens/MapScreen';
import DetailScreen from './screens/DetailsScreen';
import { ThemeProvider } from './contexts/ThemeContext';
import { initLocationService } from './utils/LocationService';
import PushNotification from 'react-native-push-notification';

// Creëer de stack navigator
const Stack = createNativeStackNavigator();

function App() {
    useEffect(() => {
        // Initialiseer de achtergrondlocatieservice
        initLocationService();

        // Configureer de push notificaties
        PushNotification.configure({
            onNotification: function (notification) {
                console.log('LOCAL NOTIFICATION ==>', notification);
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
    }, []);

    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Settings" component={SettingsScreen} />
                    <Stack.Screen name="PlacesList" component={PlacesListScreen} />
                    <Stack.Screen name="Map" component={MapScreen} />
                    <Stack.Screen name="Details" component={DetailScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
}

export default App;
