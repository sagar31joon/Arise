import { Tabs } from 'expo-router';
import { Colors } from '../../theme/colors';
// You might want to use icons eventually. For now, text/basic icons.
// import { Ionicons } from '@expo/vector-icons'; 

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.dark.surface,
                    borderTopColor: Colors.dark.border,
                },
                tabBarActiveTintColor: Colors.dark.primary,
                tabBarInactiveTintColor: Colors.dark.textDim,
                tabBarLabelStyle: {
                    fontFamily: 'Courier',
                    fontWeight: 'bold',
                }
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'STATUS',
                    // tabBarIcon: ({ color }) => <Ionicons name="stats-chart" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="tasks"
                options={{
                    title: 'TASKS',
                }}
            />
            {/* We will add Profile later. For now let's expose Leaderboard as a tab just to see it work, 
           or keep it hidden and link to it. 
           User asked for Home, Profile, Tasks tabs. 
           Let's repurpose Leaderboard or creating a Profile screen?
           Let's Create a Profile Screen now. 
       */}
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'PROFILE',
                }}
            />
            {/* Hide Leaderboard fro Tabs if linked from Home, or make it a tab? 
          User didn't explicitly asking for Leaderboard tab. 
          I'll hide it from the bar but keep it in the group if we want.
          Actually, let's keep it accessible via Home link as implemented.
          So we use "href: null" to hide from tab bar? Or just not have it in _layout if using folder routing?
          If it's in (tabs), it will show up unless we hide it.
      */}
            <Tabs.Screen
                name="leaderboard"
                options={{
                    href: null, // Hide from tab bar
                }}
            />
        </Tabs>
    );
}
