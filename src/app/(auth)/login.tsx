import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../theme/colors';

export default function LoginScreen() {
    const [email, setEmail] = useState('');

    const handleLogin = () => {
        if (email) {
            router.push({ pathname: '/(auth)/otp', params: { email } });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>WELCOME BACK</Text>
            <Text style={styles.subtitle}>Enter your details to login.</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="EMAIL ADDRESS"
                    placeholderTextColor={Colors.dark.textDim}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={() => router.replace('/(auth)/signup')}>
                <Text style={styles.linkText}>New Player? Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        color: Colors.dark.primary, // Electric Cyan
        fontSize: 32,
        fontWeight: '900', // Extra Bold
        marginBottom: 8,
        textAlign: 'center',
        letterSpacing: 1,
        textShadowColor: Colors.dark.primary,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
        textTransform: 'uppercase',
    },
    subtitle: {
        color: Colors.dark.textDim,
        fontSize: 14,
        marginBottom: 48,
        textAlign: 'center',
        fontWeight: '500',
        letterSpacing: 0.5,
    },
    inputContainer: {
        marginBottom: 24,
    },
    input: {
        backgroundColor: '#101A26', // Dark blue fill
        color: Colors.dark.text,
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#1E293B',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    button: {
        backgroundColor: Colors.dark.primary,
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: Colors.dark.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 5,
    },
    buttonText: {
        color: '#000000',
        fontWeight: '900',
        fontSize: 16,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    linkButton: {
        marginTop: 32,
        alignItems: 'center',
    },
    linkText: {
        color: Colors.dark.textDim,
        fontSize: 14,
    },
    linkHighlight: {
        color: Colors.dark.textDim,
        fontWeight: 'normal',
    },
});
