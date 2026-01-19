import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { INITIAL_STATS } from './constants';
import { getLevelFromXP, getRankFromLevel } from './progression';
import { determineRace } from './stats';
import { Race, Rank, Stats, User } from './types';

interface UserContextType {
    user: User;
    addXP: (amount: number) => void;
    updateStats: (statUpdates: Partial<Stats>) => void;
    login: (email: string) => void;
    completeOnboarding: (data: Partial<User>) => void;
    logout: () => void;
}

const DEFAULT_USER: User = {
    id: 'user-1',
    name: 'Guest',
    level: 0,
    xp: 0,
    stats: INITIAL_STATS,
    race: Race.Human,
    rank: Rank.None,
    titles: [],
    isAuthenticated: false,
    isOnboarded: false,
};

const UserContext = createContext<UserContextType>({
    user: DEFAULT_USER,
    addXP: () => { },
    updateStats: () => { },
    login: () => { },
    completeOnboarding: () => { },
    logout: () => { },
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(DEFAULT_USER);

    // Recalculate derived state (Level, Rank, Race) whenever XP or Stats change
    useEffect(() => {
        const newLevel = getLevelFromXP(user.xp);
        const newRank = getRankFromLevel(newLevel);
        const newRace = determineRace(user.stats);

        if (newLevel !== user.level || newRank !== user.rank || newRace !== user.race) {
            setUser((prev) => ({
                ...prev,
                level: newLevel,
                rank: newRank,
                race: newRace,
            }));
        }
    }, [user.xp, user.stats]);

    const addXP = (amount: number) => {
        setUser((prev) => ({ ...prev, xp: prev.xp + amount }));
    };

    const updateStats = (statUpdates: Partial<Stats>) => {
        setUser((prev) => {
            const newStats = { ...prev.stats };
            // Basic implementation: Add values directly.
            // Spec implies stats grow.
            (Object.keys(statUpdates) as Array<keyof Stats>).forEach((key) => {
                if (statUpdates[key]) {
                    newStats[key] = parseFloat((newStats[key] + (statUpdates[key] || 0)).toFixed(2));
                }
            });
            return { ...prev, stats: newStats };
        });
    };

    const login = (email: string) => {
        // Mock Login
        setUser(prev => ({ ...prev, email, isAuthenticated: true }));
    };

    const completeOnboarding = (data: Partial<User>) => {
        setUser(prev => ({ ...prev, ...data, isOnboarded: true }));
    };

    const logout = () => {
        setUser(DEFAULT_USER);
    };

    return (
        <UserContext.Provider value={{ user, addXP, updateStats, login, completeOnboarding, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
