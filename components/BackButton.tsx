import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';


const BackButton = () => {

    return (
        <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            style={styles.button}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
            <FontAwesome
                name="angle-left"
                size={24}
                color="#000"
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 10,
        height: 24,
    },
    image: {
        width: 10, 
        tintColor: '#000', 
    },
});

export default BackButton;
