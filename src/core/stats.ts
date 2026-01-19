import { Race, Stats, StatType } from './types';

export const determineRace = (stats: Stats): Race => {
    const { physical, intelligence, endurance, agility, focus } = stats;

    const values = [
        { type: StatType.Physical, val: physical },
        { type: StatType.Intelligence, val: intelligence },
        { type: StatType.Endurance, val: endurance },
        { type: StatType.Agility, val: agility },
        { type: StatType.Focus, val: focus },
    ];

    // Sort by value descending
    values.sort((a, b) => b.val - a.val);

    const highest = values[0];
    const second = values[1];
    const lowest = values[values.length - 1];

    // Check for Hybrid (Balanced)
    // If difference between highest and lowest is small (e.g., < 3 or < 10% of highest)
    // For v1 manual stats, let's say diff <= 2.
    if (highest.val - lowest.val <= 2) {
        return Race.Hybrid;
    }

    // Logic map
    const topTwoTypes = [highest.type, second.type];

    const hasStat = (t: StatType) => topTwoTypes.includes(t);

    if (hasStat(StatType.Physical) && hasStat(StatType.Endurance)) return Race.Tank;
    if (hasStat(StatType.Intelligence) && hasStat(StatType.Focus)) return Race.Mage;
    if (hasStat(StatType.Agility) && hasStat(StatType.Focus)) return Race.Assassin;
    if (hasStat(StatType.Physical) && hasStat(StatType.Agility)) return Race.Berserker;
    if (hasStat(StatType.Physical) && hasStat(StatType.Focus)) return Race.Monk;
    if (hasStat(StatType.Agility) && hasStat(StatType.Endurance)) return Race.Scout;

    // Fallback defaults properties
    if (highest.type === StatType.Physical) return Race.Tank; // Or Berserker
    if (highest.type === StatType.Intelligence) return Race.Mage;
    if (highest.type === StatType.Agility) return Race.Assassin; // Or Scout
    if (highest.type === StatType.Endurance) return Race.Tank;
    if (highest.type === StatType.Focus) return Race.Mage;

    return Race.Human;
};
