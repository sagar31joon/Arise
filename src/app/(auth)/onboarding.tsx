import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../core/UserContext';
import { Colors } from '../../theme/colors';

export default function OnboardingScreen() {
    const { completeOnboarding, logout } = useUser();

    // Form State
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [sex, setSex] = useState<'Male' | 'Female' | ''>('');
    const [dob, setDob] = useState(new Date(2000, 0, 1)); // Default ~25 years old
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [height, setHeight] = useState(170); // Default cm
    const [showHeightPicker, setShowHeightPicker] = useState(false);
    const [weight, setWeight] = useState(70); // Default kg
    const [showWeightPicker, setShowWeightPicker] = useState(false);

    const calculateAge = (date: Date) => {
        const diffMs = Date.now() - date.getTime();
        const ageDt = new Date(diffMs);
        return Math.abs(ageDt.getUTCFullYear() - 1970);
    };

    const age = calculateAge(dob);

    const handleUsernameChange = (text: string) => {
        // Only allow letters, numbers, and underscores
        if (/^[a-zA-Z0-9_]*$/.test(text)) {
            setUsername(text);
        }
    };

    const handleFinish = () => {
        if (username && name && sex) {
            completeOnboarding({
                name,
                sex: sex as any,
                age,
                height: Math.round(height),
                weight: Math.round(weight)
            });
            // Navigate to Tabs
            router.replace('/(tabs)');
        } else {
            alert('Please complete all fields');
        }
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || dob;
        setShowDatePicker(Platform.OS === 'ios');
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        setDob(currentDate);
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.background }}>
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                        logout();
                        router.replace('/(auth)/signup');
                    }}
                >
                    <Text style={styles.backButtonText}>{'<'}</Text>
                </TouchableOpacity>

                {/* System Window Wrapper */}
                <View style={styles.systemWindow}>
                    <View style={styles.systemHeader}>
                        <Text style={styles.title}>SYSTEM // IDENTITY</Text>
                        <Text style={styles.subtitle}>PLAYER REGISTRATION</Text>
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.label}>USERNAME</Text>
                        <TextInput
                            style={styles.input}
                            value={username}
                            onChangeText={handleUsernameChange}
                            placeholder="Set Alias..."
                            placeholderTextColor={Colors.dark.textDim}
                            autoCapitalize="none"
                        />

                        <Text style={styles.label}>FULL NAME</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Real Name..."
                            placeholderTextColor={Colors.dark.textDim}
                        />

                        <Text style={styles.label}>SEX</Text>
                        <View style={styles.row}>
                            <TouchableOpacity
                                style={[styles.sexButton, sex === 'Male' && styles.sexButtonActive]}
                                onPress={() => setSex('Male')}
                            >
                                <Text style={[styles.sexButtonText, sex === 'Male' && styles.sexButtonTextActive]}>MALE</Text>
                            </TouchableOpacity>
                            <View style={styles.spacer} />
                            <TouchableOpacity
                                style={[styles.sexButton, sex === 'Female' && styles.sexButtonActive]}
                                onPress={() => setSex('Female')}
                            >
                                <Text style={[styles.sexButtonText, sex === 'Female' && styles.sexButtonTextActive]}>FEMALE</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>DATE OF BIRTH (Age: {age})</Text>
                        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                            <Text style={styles.dateButtonText}>{formatDate(dob)}</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <View>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={dob}
                                    mode="date"
                                    display="spinner" // Spinner style
                                    onChange={onDateChange}
                                    maximumDate={new Date()}
                                    themeVariant="dark"
                                    textColor="#fff" // Force white text for spinner
                                />
                                {Platform.OS === 'ios' && (
                                    <TouchableOpacity
                                        style={styles.closePickerButton}
                                        onPress={() => setShowDatePicker(false)}
                                    >
                                        <Text style={styles.closePickerText}>CONFIRM DATE</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}

                        <Text style={styles.label}>HEIGHT: {Math.round(height)} cm</Text>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => {
                                setShowHeightPicker(!showHeightPicker);
                                setShowWeightPicker(false); // Close others
                            }}
                        >
                            <Text style={{ color: Colors.dark.text, fontSize: 18, fontWeight: '600', letterSpacing: 1 }}>{height} cm</Text>
                        </TouchableOpacity>

                        {showHeightPicker && (
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={height}
                                    onValueChange={(itemValue) => setHeight(itemValue)}
                                    style={{ color: '#FFFFFF' }} // Force white
                                    itemStyle={{ color: '#FFFFFF', fontSize: 20 }} // Force white, larger font
                                    dropdownIconColor="#FFFFFF"
                                >
                                    {Array.from({ length: 191 }, (_, i) => 100 + i).map((val) => (
                                        <Picker.Item key={val} label={`${val} cm`} value={val} color="#FFFFFF" />
                                    ))}
                                </Picker>
                                <TouchableOpacity
                                    style={styles.closePickerButton}
                                    onPress={() => setShowHeightPicker(false)}
                                >
                                    <Text style={styles.closePickerText}>SELECT HEIGHT</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <Text style={styles.label}>WEIGHT: {Math.round(weight)} kg</Text>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => {
                                setShowWeightPicker(!showWeightPicker);
                                setShowHeightPicker(false); // Close others
                            }}
                        >
                            <Text style={{ color: Colors.dark.text, fontSize: 18, fontWeight: '600', letterSpacing: 1 }}>{weight} kg</Text>
                        </TouchableOpacity>

                        {showWeightPicker && (
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={weight}
                                    onValueChange={(itemValue) => setWeight(itemValue)}
                                    style={{ color: '#FFFFFF' }}
                                    itemStyle={{ color: '#FFFFFF', fontSize: 20 }}
                                    dropdownIconColor="#FFFFFF"
                                >
                                    {Array.from({ length: 476 }, (_, i) => 25 + i).map((val) => (
                                        <Picker.Item key={val} label={`${val} kg`} value={val} color="#FFFFFF" />
                                    ))}
                                </Picker>
                                <TouchableOpacity
                                    style={styles.closePickerButton}
                                    onPress={() => setShowWeightPicker(false)}
                                >
                                    <Text style={styles.closePickerText}>SELECT WEIGHT</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleFinish}>
                        <Text style={styles.buttonText}>CONFIRM SELECTION</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.dark.background,
        padding: 16,
        paddingTop: 40,
        alignItems: 'center', // Center the window
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 16,
        zIndex: 20,
        padding: 8,
        // No background for back button, cleaner "system" look
    },
    backButtonText: {
        color: Colors.dark.primary,
        fontSize: 24,
        fontWeight: 'bold',
        textShadowColor: Colors.dark.primary,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    // The Main System Window
    systemWindow: {
        width: '100%',
        backgroundColor: Colors.dark.surface,
        borderWidth: 2,
        borderColor: Colors.dark.border,
        padding: 20,
        borderRadius: 4, // Sharp corners, slight radius
        shadowColor: Colors.dark.primary, // Blue glow around window
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        marginTop: 40,
    },
    systemHeader: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark.border,
        paddingBottom: 12,
        marginBottom: 24,
        alignItems: 'center',
    },
    title: {
        color: Colors.dark.primary,
        fontSize: 24,
        fontWeight: '900',
        letterSpacing: 4,
        textShadowColor: Colors.dark.primary,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
        textTransform: 'uppercase',
    },
    subtitle: {
        color: Colors.dark.textDim,
        fontSize: 12,
        marginTop: 4,
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    form: {
        marginBottom: 0,
    },
    label: {
        color: Colors.dark.primary, // Labels are now the primary color (like stats)
        fontSize: 10,
        marginBottom: 4,
        marginTop: 16,
        textTransform: 'uppercase',
        fontWeight: '700',
        letterSpacing: 1,
    },
    input: {
        backgroundColor: 'transparent',
        color: Colors.dark.text,
        paddingVertical: 8,
        paddingHorizontal: 0,
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark.border,
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 1,
    },
    // Sex Button Styles - Data Rows
    row: {
        flexDirection: 'row',
        marginTop: 8,
    },
    spacer: {
        width: 16,
    },
    sexButton: {
        flex: 1,
        padding: 12,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: Colors.dark.border,
        alignItems: 'center',
        backgroundColor: 'rgba(36, 232, 255, 0.05)', // Very faint tint
    },
    sexButtonActive: {
        borderColor: Colors.dark.primary,
        backgroundColor: 'rgba(36, 232, 255, 0.15)', // Stronger tint
        shadowColor: Colors.dark.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    sexButtonText: {
        color: Colors.dark.textDim,
        fontWeight: '700',
        fontSize: 12,
        letterSpacing: 1,
    },
    sexButtonTextActive: {
        color: Colors.dark.primary,
        textShadowColor: Colors.dark.primary,
        textShadowRadius: 4,
    },
    // Date Picker Styles
    dateButton: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark.border,
        alignItems: 'flex-start',
    },
    dateButtonText: {
        color: Colors.dark.text,
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 1,
    },
    pickerContainer: {
        marginBottom: 16,
        marginTop: 8,
        backgroundColor: 'transparent', // Transparent to match DatePicker
        // No border or distinct background
    },
    closePickerButton: {
        backgroundColor: Colors.dark.surfaceHighlight,
        padding: 12,
        alignItems: 'center',
        marginTop: 10, // Small gap from picker
        borderRadius: 8, // Rounded button to look independent
    },
    closePickerText: {
        color: Colors.dark.primary,
        fontWeight: 'bold',
        fontSize: 12,
        letterSpacing: 1,
    },
    button: {
        backgroundColor: Colors.dark.primary,
        paddingVertical: 16,
        borderRadius: 2, // Sharp corners
        alignItems: 'center',
        shadowColor: Colors.dark.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 8,
        marginTop: 32,
    },
    buttonText: {
        color: '#000000',
        fontWeight: '900',
        fontSize: 16,
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
});
