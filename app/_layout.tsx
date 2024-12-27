import { Stack, usePathname, useRouter, useSegments } from 'expo-router';
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@/utils/cache';
import { Colors } from '@/constants/Colors';
import { Suspense, useEffect } from 'react';
import { ActivityIndicator, LogBox, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'sonner-native';
import { SQLiteProvider, openDatabaseSync } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm//expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations';
import { addDummyData } from '@/utils/addDummyData';

LogBox.ignoreLogs(['Clerk: Clerk has been loaded with development keys']);

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env');
}

const InitialLayout = () => {
  const router = useRouter();
  const segments = useSegments();
  const pathname = usePathname();

  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    console.log('isLoaded', isLoaded);
    console.log('isSignedIn', isSignedIn);

    const inAuthGroup = segments[0] === '(authenticated)';

    if (isSignedIn && !inAuthGroup) {
      router.replace('/(authenticated)/(tabs)/today');
    } else if (!isSignedIn && pathname !== '/') {
      router.replace('/');
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.background } }}>
      <Stack.Screen name='index' />
    </Stack>
  );
};

const RootLayout = () => {
  const expoDb = openDatabaseSync('todos');
  const db = drizzle(expoDb);

  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (!success) return;
    addDummyData(db);
  }, [success]);

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <Suspense fallback={<ActivityIndicator size='large' color={Colors.primary} />}>
          <SQLiteProvider
            databaseName='todos'
            useSuspense
            options={{
              enableChangeListener: true,
            }}
          >
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Toaster />
              <InitialLayout />
            </GestureHandlerRootView>
          </SQLiteProvider>
        </Suspense>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayout;
