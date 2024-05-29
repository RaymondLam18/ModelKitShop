import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import PushNotification from 'react-native-push-notification';

// Functie om afstand te berekenen tussen twee punten
const haversine = (coords1, coords2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371; // Aarde's straal in km
    const dLat = toRad(coords2.latitude - coords1.latitude);
    const dLon = toRad(coords2.longitude - coords1.longitude);
    const lat1 = toRad(coords1.latitude);
    const lat2 = toRad(coords2.latitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) *
        Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Afstand in km
    return distance;
};

// Notificatie versturen
const sendNotification = (title, message) => {
    PushNotification.localNotification({
        title: title,
        message: message,
    });
};

// Locatie-instellingen initialiseren
export const initLocationService = () => {
    BackgroundGeolocation.configure({
        desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
        stationaryRadius: 50,
        distanceFilter: 50,
        notificationsEnabled: true,
        startOnBoot: true,
        stopOnTerminate: false,
        locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
        interval: 10000, // Interval in ms om locatie updates te ontvangen
        fastestInterval: 5000,
        activitiesInterval: 10000,
        stopOnStillActivity: false,
        notificationTitle: 'Hotspot Tracker',
        notificationText: 'We are tracking your location for hotspots',
    });

    BackgroundGeolocation.on('location', async (location) => {
        try {
            const response = await fetch('https://stud.hosted.hr.nl/1024322/data.json');
            const hotspots = await response.json();

            hotspots.forEach((hotspot) => {
                const distance = haversine(location, { latitude: hotspot.latitude, longitude: hotspot.longitude });
                if (distance < 0.5) { // Notificatie versturen als binnen 500 meter van hotspot
                    sendNotification(hotspot.title, 'You are near a hotspot!');
                }
            });
        } catch (error) {
            console.error('Error fetching hotspots:', error);
        }

        BackgroundGeolocation.startTask(taskKey => {
            BackgroundGeolocation.endTask(taskKey);
        });
    });

    BackgroundGeolocation.on('error', (error) => {
        console.error('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.on('start', () => {
        console.log('[INFO] BackgroundGeolocation service has been started');
    });

    BackgroundGeolocation.on('stop', () => {
        console.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    BackgroundGeolocation.start();
};
