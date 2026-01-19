import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Task } from '../core/types';
import { Colors } from '../theme/colors';

interface TaskCardProps {
    task: Task;
    onComplete: () => void;
}

export function TaskCard({ task, onComplete }: TaskCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{task.title}</Text>
                <Text style={styles.desc}>{task.description}</Text>
                <View style={styles.rewards}>
                    <Text style={styles.rewardText}>+{task.xpReward} XP</Text>
                    {/* We could list stats here */}
                </View>
            </View>
            <Pressable style={styles.button} onPress={onComplete}>
                <Text style={styles.buttonText}>DONE</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.dark.surface,
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.dark.border,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        marginRight: 12,
    },
    title: {
        color: Colors.dark.text,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    desc: {
        color: Colors.dark.textDim,
        fontSize: 12,
        marginBottom: 8,
    },
    rewards: {
        flexDirection: 'row',
    },
    rewardText: {
        color: Colors.dark.primary, // or maybe a specific color for XP
        fontSize: 12,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: Colors.dark.surfaceHighlight,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.dark.text,
    },
    buttonText: {
        color: Colors.dark.text,
        fontSize: 12,
        fontWeight: 'bold',
    },
});
