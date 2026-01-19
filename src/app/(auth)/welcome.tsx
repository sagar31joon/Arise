import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../theme/colors';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>ARISE</Text>
                <Text style={styles.subtitle}>SOLO LEVELING SYSTEM</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => router.push('/(auth)/login')}
                >
                    <Text style={styles.primaryButtonText}>INITIALIZE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => router.push('/(auth)/signup')}
                >
                    <Text style={styles.secondaryButtonText}>NEW PLAYER</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
        justifyContent: 'space-between',
        paddingVertical: 80,
        paddingHorizontal: 24,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: Colors.dark.primary, // Electric Cyan
        fontSize: 64,
        fontWeight: '900',
        letterSpacing: 8,
        textShadowColor: Colors.dark.primary,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
        textAlign: 'center',
    },
    subtitle: {
        color: Colors.dark.textDim,
        fontSize: 14,
        letterSpacing: 4,
        marginTop: 16,
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    buttonContainer: {
        width: '100%',
        gap: 16,
    },
    primaryButton: {
        backgroundColor: Colors.dark.primary,
        paddingVertical: 20,
        borderRadius: 2,
        alignItems: 'center',
        shadowColor: Colors.dark.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 16,
        elevation: 8,
        borderWidth: 1,
        borderColor: Colors.dark.primary,
    },
    primaryButtonText: {
        color: '#000000',
        fontWeight: '900',
        fontSize: 18,
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        paddingVertical: 20,
        borderRadius: 2,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.dark.border,
    },
    secondaryButtonText: {
        color: Colors.dark.text,
        fontWeight: '900',
        fontSize: 18,
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
});
