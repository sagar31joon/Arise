import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatBar } from '../../components/StatBar';
import { useUser } from '../../core/UserContext';
import { getXPRequiredForNextLevel } from '../../core/progression';
import { Colors } from '../../theme/colors';

export default function HomeScreen() {
    const { user } = useUser();
    const nextLevelXP = getXPRequiredForNextLevel(user.level);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Header Profile Info */}
                <View style={styles.profileHeader}>
                    <View style={styles.rankBadge}>
                        <Text style={styles.rankText}>{user.rank.substring(0, 3)}</Text>
                        <Text style={styles.levelLabel}>LVL {user.level}</Text>
                    </View>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.race}>{user.race.toUpperCase()}</Text>
                </View>

                {/* XP Bar */}
                <View style={styles.xpSection}>
                    <View style={styles.xpRow}>
                        <Text style={styles.xpLabel}>XP</Text>
                        <Text style={styles.xpVal}>{user.xp} / {nextLevelXP}</Text>
                    </View>
                    <View style={styles.xpTrack}>
                        <View style={[styles.xpFill, { width: `${Math.min(100, (user.xp / nextLevelXP) * 100)}%` }]} />
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Stats */}
                <View style={styles.statsSection}>
                    <Text style={styles.sectionTitle}>ATTRIBUTES</Text>
                    <StatBar label="Physical" value={user.stats.physical} />
                    <StatBar label="Intelligence" value={user.stats.intelligence} />
                    <StatBar label="Endurance" value={user.stats.endurance} />
                    <StatBar label="Agility" value={user.stats.agility} />
                    <StatBar label="Focus" value={user.stats.focus} />
                </View>

                <View style={styles.divider} />

                {/* Navigation Action */}
                {/* Navigation Action - Use Tabs now */}
                {/* <Link href="/tasks" asChild> ... </Link> */}

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    scrollContent: {
        padding: 20,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 30,
    },
    levelLabel: {
        color: Colors.dark.text,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        fontFamily: 'Courier',
    },
    rankBadge: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: Colors.dark.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    rankText: {
        color: Colors.dark.primary,
        fontSize: 24,
        fontWeight: '900',
        fontFamily: 'Courier',
    },
    name: {
        color: Colors.dark.text,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    race: {
        color: Colors.dark.textDim,
        fontSize: 14,
        letterSpacing: 2,
    },
    xpSection: {
        marginBottom: 30,
    },
    xpRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    xpLabel: {
        color: Colors.dark.text,
        fontSize: 12,
        fontFamily: 'Courier',
    },
    xpVal: {
        color: Colors.dark.textDim,
        fontSize: 12,
        fontFamily: 'Courier',
    },
    xpTrack: {
        height: 8,
        backgroundColor: Colors.dark.surfaceHighlight,
        borderRadius: 4,
    },
    xpFill: {
        height: '100%',
        backgroundColor: Colors.dark.success,
        borderRadius: 4,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.dark.border,
        marginBottom: 20,
    },
    statsSection: {
        marginBottom: 30,
    },
    sectionTitle: {
        color: Colors.dark.text,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 16,
        letterSpacing: 1,
    },
    actionButton: {
        backgroundColor: Colors.dark.surfaceHighlight,
        padding: 20,
        alignItems: 'center',
        borderRadius: 0,
        borderWidth: 1,
        borderColor: Colors.dark.primary,
    },
    actionButtonText: {
        color: Colors.dark.text,
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});
