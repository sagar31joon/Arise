import { Task, TaskCategory } from './types';

export const CORE_TASKS: Task[] = [
    // Physical
    {
        id: 'p-1',
        title: 'Push-ups Daily',
        description: 'Complete 20 Push-ups in one set.',
        category: TaskCategory.Physical,
        xpReward: 50,
        statRewards: { physical: 0.1, endurance: 0.05 },
        cooldownHours: 20,
    },
    {
        id: 'p-2',
        title: 'Squats Daily',
        description: 'Complete 30 Squats.',
        category: TaskCategory.Physical,
        xpReward: 50,
        statRewards: { physical: 0.1, agility: 0.05 },
        cooldownHours: 20,
    },
    {
        id: 'p-3',
        title: 'Plank Hold',
        description: 'Hold a plank for 60 seconds.',
        category: TaskCategory.Endurance,
        xpReward: 60,
        statRewards: { endurance: 0.2, focus: 0.05 },
        cooldownHours: 20,
    },

    // Mental / Focus
    {
        id: 'm-1',
        title: 'Read 10 Pages',
        description: 'Read 10 pages of a non-fiction book.',
        category: TaskCategory.Mental,
        xpReward: 40,
        statRewards: { intelligence: 0.2 },
        cooldownHours: 20,
    },
    {
        id: 'f-1',
        title: 'Meditation',
        description: 'Meditate involved focus for 10 minutes.',
        category: TaskCategory.Focus,
        xpReward: 40,
        statRewards: { focus: 0.2, discipline: 0.1 },
        cooldownHours: 20,
    },
    {
        id: 'f-2',
        title: 'Cold Shower',
        description: 'Take a cold shower for at least 2 minutes.',
        category: TaskCategory.Endurance,
        xpReward: 70,
        statRewards: { endurance: 0.1, willpower: 0.3 },
        cooldownHours: 20,
    },
];

export const getAvailableTasks = (): Task[] => {
    return CORE_TASKS;
};
