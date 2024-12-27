import Fab from '@/components/Fab';
import { StyleSheet, Text, View } from 'react-native';
const Page = () => {
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
  },
});
