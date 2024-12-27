import { StyleSheet, Text, View } from 'react-native';
import Fab from '@/components/Fab';
import { useSQLiteContext } from 'expo-sqlite';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { todos } from '@/db/schema';

const Page = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  useDrizzleStudio(db);

  const { data } = useLiveQuery(drizzleDb.select().from(todos));

  return (
    <View style={styles.container}>
      <Text>Page</Text>
      <Fab />
    </View>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 82,
  },
});
