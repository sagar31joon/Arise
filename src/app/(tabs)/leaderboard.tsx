import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useUser } from '../../core/UserContext';
import { Rank } from '../../core/types';
import { Colors } from '../../theme/colors';

const MOCK_LEADERBOARD = [
    { id: '1', name: 'JINWOO', level: 100, rank: Rank.National, race: 'SHADOW' },
    { id: '2', name: 'THOMAS', level: 95, rank: Rank.National, race: 'TANK' },
    { id: '3', name: 'LIU', level: 94, rank: Rank.National, race: 'MAGE' },
    { id: '4', name: 'CHA', level: 90, rank: Rank.S, race: 'AGILITY' },
    { id: '5', name: 'BAEK', level: 85, rank: Rank.S, race: 'BEAST' },
];

export default function LeaderboardScreen() {
    const { user } = useUser();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={[styles.col, styles.colRank]}>#</Text>
                    <Text style={[styles.col, styles.colName]}>NAME</Text>
                    <Text style={[styles.col, styles.colLevel]}>LVL</Text>
                    <Text style={[styles.col, styles.colClass]}>RANK</Text>
                </View>

                {MOCK_LEADERBOARD.map((player, index) => (
                    <View key={player.id} style={styles.row}>
                        <Text style={[styles.col, styles.colRank, styles.rankNum]}>{index + 1}</Text>
                        <Text style={[styles.col, styles.colName]}>{player.name}</Text>
                        <Text style={[styles.col, styles.colLevel]}>{player.level}</Text>
                        <Text style={[styles.col, styles.colClass]}>{player.rank}</Text>
                    </View>
                ))}

                <View style={styles.divider} />

                <View style={[styles.row, styles.userRow]}>
                    <Text style={[styles.col, styles.colRank, styles.rankNum]}>?</Text>
                    <Text style={[styles.col, styles.colName]}>{user.name.toUpperCase()}</Text>
                    <Text style={[styles.col, styles.colLevel]}>{user.level}</Text>
                    <Text style={[styles.col, styles.colClass]}>{user.rank}</Text>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    content: {
        padding: 20,
    },
    headerRow: {
        flexDirection: 'row',
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark.border,
        paddingBottom: 8,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
    },
    userRow: {
        backgroundColor: Colors.dark.surfaceHighlight,
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 4,
        marginTop: 8,
    },
    col: {
        color: Colors.dark.text,
        fontFamily: 'Courier',
        fontSize: 12,
    },
    colRank: { width: 30, textAlign: 'center' },
    colName: { flex: 1, paddingLeft: 10, fontWeight: 'bold' },
    colLevel: { width: 40, textAlign: 'center' },
    colClass: { width: 70, textAlign: 'right' },
    rankNum: {
        fontWeight: 'bold',
        color: Colors.dark.primary,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.dark.border,
        marginVertical: 10,
    },
});
