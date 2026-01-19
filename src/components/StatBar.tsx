import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../theme/colors';

interface StatBarProps {
    label: string;
    value: number;
    maxValue?: number;
}

export function StatBar({ label, value, maxValue = 20 }: StatBarProps) {
    const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.label}>{label.toUpperCase()}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
            <View style={styles.track}>
                <View style={[styles.fill, { width: `${percentage}%` }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    label: {
        color: Colors.dark.textDim,
        fontSize: 12,
        letterSpacing: 1,
        fontFamily: 'Courier', // System font feel
        fontWeight: '600',
    },
    value: {
        color: Colors.dark.text,
        fontSize: 12,
        fontFamily: 'Courier',
        fontWeight: 'bold',
    },
    track: {
        height: 6,
        backgroundColor: Colors.dark.surfaceHighlight,
        borderRadius: 2,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        backgroundColor: Colors.dark.primary,
    },
});
