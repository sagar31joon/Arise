import { RANK_THRESHOLDS, XP_CONSTANT } from './constants';
import { Rank } from './types';

export const getXPRequiredForNextLevel = (currentLevel: number): number => {
    // Simple Quadratic: XP = 100 * (Level ^ 2) based on next level?
    // Usually XP required to reach Level L is calculated.
    // Let's say XP required to go from L to L+1.
    // Spec said: "XP = Level^2 * Constant". I'll assume Total XP to reach Level L.
    // Or XP needed for next level. Let's stick to Total XP Curve for simplicity in checking level.
    // XP_Total_For_Level_L = 100 * (L^2).
    // Current XP must be >= XP_Total_For_Level_L to be Level L.
    // Actually, standard RPG: Level 1 starts at 0 XP. Level 2 requires 100 XP.
    // Formula: XP Required to REACH Level L = 100 * ((L-1)^2) ? No.
    // Let's use: XP Required to REACH Level L = 100 * (L * L).
    // Level 0 -> 1: 0 XP (Start)
    // Level 1 -> 2: Reach 400 XP? No, that's steep.
    // Spec: "Level 1: 100 XP, Level 2: 400 XP".
    // This implies Threshold for Level 1 is 100? Or User starts at Level 0?
    // "Level 0-10 is Human Level". So User starts at 0.
    // Level 1 threshold: 100 * (1^2) = 100.
    // Level 2 threshold: 100 * (2^2) = 400.
    // Level 10 threshold: 100 * (10^2) = 10000.
    return XP_CONSTANT * Math.pow(currentLevel + 1, 2);
};

export const getLevelFromXP = (totalXP: number): number => {
    // Inverse of XP = 100 * L^2  =>  L = sqrt(XP / 100)
    // Floor it to get current level.
    if (totalXP < 0) return 0;
    return Math.floor(Math.sqrt(totalXP / XP_CONSTANT));
};

export const getRankFromLevel = (level: number): Rank => {
    if (level >= RANK_THRESHOLDS[Rank.National]) return Rank.National; // S+
    if (level >= RANK_THRESHOLDS[Rank.S]) return Rank.S;
    if (level >= RANK_THRESHOLDS[Rank.A]) return Rank.A;
    if (level >= RANK_THRESHOLDS[Rank.B]) return Rank.B;
    if (level >= RANK_THRESHOLDS[Rank.C]) return Rank.C;
    if (level >= RANK_THRESHOLDS[Rank.D]) return Rank.D;
    if (level >= RANK_THRESHOLDS[Rank.E]) return Rank.E;
    return Rank.None;
};
