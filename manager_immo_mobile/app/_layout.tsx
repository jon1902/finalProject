import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { UserContextProvider, useUserContext } from '@/contexts/userContext';
import { useColorScheme } from '@/components/useColorScheme';
import { PropertyContextProvider } from '@/contexts/propertyContext';
import { ReservationContextProvider } from '@/contexts/reservationContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <UserContextProvider>
          <PropertyContextProvider>
            <ReservationContextProvider>
              <StackScreen />
            </ReservationContextProvider>
          </PropertyContextProvider>
        </UserContextProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}

const StackScreen = () => {
  const { isAuthenticated } = useUserContext()

  return <Stack>
    {
      isAuthenticated ? (
      <Stack.Screen name={"(tabs)"} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name={"(auth_tabs)"} options={{ headerShown: false }} />
      )
    }
    <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    <Stack.Screen name="propertyModal" options={{ presentation: 'modal' }} />
    <Stack.Screen name="reservationModal" options={{ presentation: 'modal' }} />
  </Stack>
}
