import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TaskCard } from '../../components/TaskCard';
import { getAvailableTasks } from '../../core/tasks';
import { useUser } from '../../core/UserContext';
import { Colors } from '../../theme/colors';

export default function TasksScreen() {
    const { addXP, updateStats } = useUser();
    const tasks = getAvailableTasks();

    const handleComplete = (task: any) => {
        // Add XP
        addXP(task.xpReward);
        // Update Stats
        if (task.statRewards) {
            updateStats(task.statRewards);
        }
        // In v2: Mark as completed, start cooldown, etc.
        // For v1 manual: we just assume they did it.
        alert(`Completed ${task.title}! Gained ${task.xpReward} XP.`);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.header}>AVAILABLE TASKS</Text>
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onComplete={() => handleComplete(task)}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    content: {
        padding: 24,
    },
    header: {
        color: Colors.dark.text, // Brighter header
        fontSize: 20,
        fontWeight: '900',
        marginBottom: 24,
        letterSpacing: 1,
        textShadowColor: Colors.dark.primary,
        textShadowRadius: 4,
    },
});
