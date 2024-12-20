import { useAuth } from '@clerk/clerk-expo';
import { Button, StyleSheet, Text, View } from 'react-native';
const Page = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>Page</Text>
      <Button title='Sign Out' onPress={() => signOut()} />
    </View>
  );
};
export default Page;
const styles = StyleSheet.create({});
