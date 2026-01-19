import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider, useUser } from '../core/UserContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


function RootLayoutNav() {
    const { user } = useUser();
    const segments = useSegments() as any;
    const router = useRouter();
    const colorScheme = useColorScheme();
    const rootNavigationState = useRootNavigationState();

    useEffect(() => {
        if (!rootNavigationState?.key) return; // Wait for navigation to be ready

        const inAuthGroup = segments[0] === '(auth)';

        console.log('User Auth State:', user.isAuthenticated, user.isOnboarded);
        console.log('Current Segment:', segments);

        // Wrap in setTimeout to avoid "Attempted to navigate before mounting the Root Layout component"
        const timer = setTimeout(() => {
            if (!user.isAuthenticated) {
                // If not authenticated and not in auth group, redirect to welcome
                if (!inAuthGroup) {
                    router.replace('/(auth)/welcome');
                }
            } else if (user.isAuthenticated && !user.isOnboarded) {
                // ... logic
                const isOnboarding = segments[1] === 'onboarding';
                if (!isOnboarding) {
                    router.replace('/(auth)/onboarding');
                }
            } else if (user.isAuthenticated && user.isOnboarded) {
                // Authenticated and onboarded, redirect to tabs if in auth group or root
                if (inAuthGroup || segments.length === 0) {
                    router.replace('/(tabs)');
                }
            }
        }, 0);

        return () => clearTimeout(timer);
    }, [user.isAuthenticated, user.isOnboarded, segments, rootNavigationState?.key]);

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
        </ThemeProvider>
    );
}

export default function RootLayout() {
    const [loaded] = useFonts({
        // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <UserProvider>
                <RootLayoutNav />
            </UserProvider>
        </SafeAreaProvider>
    );
}
