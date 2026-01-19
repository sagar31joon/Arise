import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../core/UserContext';
import { Colors } from '../../theme/colors';

export default function ProfileScreen() {
    const { user, logout } = useUser();

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarInitials}>{user.name.substring(0, 1).toUpperCase()}</Text>
                    </View>
                    <View style={styles.rankBadge}>
                        <Text style={styles.rankText}>{user.rank.substring(0, 3).toUpperCase()}</Text>
                    </View>
                </View>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.race}>{user.race.toUpperCase()}</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{user.age}</Text>
                    <Text style={styles.statLabel}>AGE</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{user.sex === 'Male' ? 'M' : 'F'}</Text>
                    <Text style={styles.statLabel}>SEX</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{Math.round(user.height)}</Text>
                    <Text style={styles.statLabel}>CM</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{Math.round(user.weight)}</Text>
                    <Text style={styles.statLabel}>KG</Text>
                </View>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>PLAYER DETAILS</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>EMAIL</Text>
                    <Text style={styles.infoValue}>{user.email}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>MEMBERSHIP</Text>
                    <Text style={styles.infoValue}>FREE TIER</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutText}>LOGOUT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: Colors.dark.primary,
        backgroundColor: Colors.dark.surface,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.dark.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    avatarInitials: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.dark.primary,
    },
    rankBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.dark.primary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.dark.background,
    },
    rankText: {
        color: '#000',
        fontSize: 10,
        fontWeight: '900',
    },
    name: {
        color: Colors.dark.text,
        fontSize: 24,
        fontWeight: '900',
        letterSpacing: 1,
        marginBottom: 4,
    },
    race: {
        color: Colors.dark.textDim,
        fontSize: 14,
        letterSpacing: 2,
        fontWeight: '600',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.dark.surface,
        padding: 20,
        borderRadius: 16,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: Colors.dark.border,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        color: Colors.dark.text,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statLabel: {
        color: Colors.dark.textDim,
        fontSize: 10,
        fontWeight: 'bold',
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: Colors.dark.border,
    },
    infoSection: {
        marginBottom: 'auto',
    },
    sectionTitle: {
        color: Colors.dark.textDim,
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 16,
        letterSpacing: 1,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark.border,
    },
    infoLabel: {
        color: Colors.dark.text,
        fontSize: 14,
    },
    infoValue: {
        color: Colors.dark.textDim,
        fontSize: 14,
    },
    logoutButton: {
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 20,
    },
    logoutText: {
        color: Colors.dark.error,
        fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: 1,
    },
});
