import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../theme/colors';

export default function SignupScreen() {
    const [email, setEmail] = useState('');

    const handleSignup = () => {
        if (email) {
            router.push({ pathname: '/(auth)/otp', params: { email } });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CREATE ACCOUNT</Text>
            <Text style={styles.subtitle}>Sign up to get started.</Text>

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

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>CONTINUE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={() => router.replace('/(auth)/login')}>
                <Text style={styles.linkText}>Already have an account? Login</Text>
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
        textShadowRadius: 15, // Stronger glow
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
        borderRadius: 8, // Rounded
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#1E293B', // Subtle border
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
        color: '#000000', // Black text
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
        color: Colors.dark.textDim, // Kept subtle per image? Or make blue? Reference image shows "Login" is just text. Assuming subtle.
        fontWeight: 'normal',
    },
});
