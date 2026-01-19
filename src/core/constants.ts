import { Rank } from './types';

// XP Curve: XP_Required = CONSTANT * (Level ^ 2)
export const XP_CONSTANT = 100;

export const RANK_THRESHOLDS: Record<Rank, number> = {
    [Rank.None]: 0,
    [Rank.E]: 10,
    [Rank.D]: 20,
    [Rank.C]: 30,
    [Rank.B]: 40,
    [Rank.A]: 50,
    [Rank.S]: 75,
    [Rank.National]: 100, // Top tier
};

// Start stats for a new user
export const INITIAL_STATS = {
    physical: 5,
    intelligence: 5,
    endurance: 5,
    agility: 5,
    focus: 5,
    discipline: 0,
    willpower: 0,
};
