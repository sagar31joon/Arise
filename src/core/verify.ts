import { RANK_THRESHOLDS } from './constants';
import { getLevelFromXP, getRankFromLevel, getXPRequiredForNextLevel } from './progression';
import { determineRace } from './stats';
import { Race, Rank, StatType } from './types';

function assert(condition: boolean, message: string) {
    if (!condition) {
        console.error(`❌ FAILED: ${message}`);
        process.exit(1);
    }
    console.log(`✅ PASSED: ${message}`);
}

console.log('--- Verifying Core Logic ---');

// 1. XP Curve
// XP to reach Level 1: 100 * 1^2 = 100.
// getLevelFromXP(100) should be 1.
assert(getLevelFromXP(100) === 1, 'XP 100 -> Level 1');
assert(getLevelFromXP(399) === 1, 'XP 399 -> Level 1');
assert(getLevelFromXP(400) === 2, 'XP 400 -> Level 2');
assert(getLevelFromXP(10000) === 10, 'XP 10000 -> Level 10');

// 2. Rank Logic
assert(getRankFromLevel(5) === Rank.None, 'Level 5 -> Rank None');
assert(getRankFromLevel(10) === Rank.E, 'Level 10 -> Rank E');
assert(getRankFromLevel(50) === Rank.A, 'Level 50 -> Rank A');
assert(getRankFromLevel(100) === Rank.National, 'Level 100 -> Rank National');

// 3. Race Logic
const baseStats = {
    physical: 10, intelligence: 10, endurance: 10, agility: 10, focus: 10,
    discipline: 0, willpower: 0
};

// Tank: Phy + End
assert(determineRace({ ...baseStats, physical: 20, endurance: 18 }) === Race.Tank, 'High Phy & End -> Tank');

// Mage: Int + Foc
assert(determineRace({ ...baseStats, intelligence: 20, focus: 19 }) === Race.Mage, 'High Int & Foc -> Mage');

// Assassin: Agi + Foc
assert(determineRace({ ...baseStats, agility: 20, focus: 19 }) === Race.Assassin, 'High Agi & Foc -> Assassin');

// Berserker: Phy + Agi
assert(determineRace({ ...baseStats, physical: 20, agility: 19 }) === Race.Berserker, 'High Phy & Agi -> Berserker');

// Monk: Phy + Foc
assert(determineRace({ ...baseStats, physical: 20, focus: 19 }) === Race.Monk, 'High Phy & Foc -> Monk');

// Scout: Agi + End
assert(determineRace({ ...baseStats, agility: 20, endurance: 19 }) === Race.Scout, 'High Agi & End -> Scout');

// Hybrid: Balanced
assert(determineRace({ ...baseStats, physical: 12, intelligence: 11, endurance: 12, agility: 12, focus: 12 }) === Race.Hybrid, 'Balanced Stats -> Hybrid');

console.log('--- All Core Tests Passed ---');
