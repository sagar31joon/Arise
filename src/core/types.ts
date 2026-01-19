export enum Rank {
    E = 'E',
    D = 'D',
    C = 'C',
    B = 'B',
    A = 'A',
    S = 'S',
    National = 'National',
    None = 'None', // Levels 0-10
}

export enum Race {
    Human = 'Human', // Default
    Tank = 'Tank', // Juggernaut
    Mage = 'Mage', // Scholar
    Assassin = 'Assassin', // Shadow
    Berserker = 'Berserker', // Vanguard
    Monk = 'Monk', // Ascetic
    Scout = 'Scout', // Ranger
    Hybrid = 'Hybrid', // Awakened
}

export interface Stats {
    // Main
    physical: number;
    intelligence: number;
    endurance: number;
    agility: number;
    focus: number;
    // Passive
    discipline: number;
    willpower: number;
}

export enum StatType {
    Physical = 'physical',
    Intelligence = 'intelligence',
    Endurance = 'endurance',
    Agility = 'agility',
    Focus = 'focus',
    Discipline = 'discipline',
    Willpower = 'willpower',
}

export interface User {
    id: string;
    name: string;
    email?: string;
    sex?: 'Male' | 'Female' | 'Other';
    age?: number;
    height?: number; // cm
    weight?: number; // kg

    level: number;
    xp: number;
    stats: Stats;
    race: Race;
    rank: Rank;
    titles: string[];

    isAuthenticated: boolean;
    isOnboarded: boolean;
}

export enum TaskCategory {
    Physical = 'Physical',
    Mental = 'Mental',
    Focus = 'Focus',
    Endurance = 'Endurance',
}

export interface Task {
    id: string;
    title: string;
    description: string;
    category: TaskCategory;
    xpReward: number;
    statRewards: Partial<Stats>;
    cooldownHours: number;
}
