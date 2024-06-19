import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

// Een herbruikbare knop component
const CustomButton = ({ title, onPress }) => {
    return (
        <View style={styles.buttonContainer}>
            <Button
                title={title}
                onPress={onPress}
                color="blue"
                accessibilityLabel={title}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: 5,
    },
});

export default CustomButton;
