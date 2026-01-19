import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useUser } from '../../core/UserContext';
import { Colors } from '../../theme/colors';

export default function OTPScreen() {
    const { email } = useLocalSearchParams<{ email: string }>();
    const [otp, setOtp] = useState('');
    const { login } = useUser();

    const handleVerify = () => {
        // Simulate verification
        if (otp.length === 4) {
            login(email || 'user@example.com');
            // Redirect to onboarding (or check if already onboarded in _layout)
            // For this flow, we force onboarding next.
            router.replace('/(auth)/onboarding');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>VERIFICATION</Text>
            <Text style={styles.subtitle}>Enter the code sent to {email}</Text>

            <TextInput
                style={styles.input}
                placeholder="0 0 0 0"
                placeholderTextColor={Colors.dark.textDim}
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={4}
                textAlign="center"
            />

            <TouchableOpacity style={styles.button} onPress={handleVerify}>
                <Text style={styles.buttonText}>VERIFY</Text>
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
        color: Colors.dark.primary,
        fontSize: 32,
        fontWeight: '900',
        marginBottom: 8,
        textAlign: 'center',
        letterSpacing: 2,
        textShadowColor: Colors.dark.primary,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    subtitle: {
        color: Colors.dark.textDim,
        fontSize: 14,
        marginBottom: 48,
        textAlign: 'center',
        fontWeight: '500',
    },
    input: {
        backgroundColor: Colors.dark.surface,
        color: Colors.dark.text,
        fontSize: 32,
        fontWeight: 'bold',
        padding: 16,
        borderRadius: 12,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: Colors.dark.border,
        letterSpacing: 16,
    },
    button: {
        backgroundColor: Colors.dark.primary,
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: Colors.dark.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: '#000000',
        fontWeight: '900',
        fontSize: 16,
        letterSpacing: 1,
    },
});
