import MoreButton from '@/components/MoreButton';
import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShadowVisible: false, contentStyle: { backgroundColor: Colors.background } }}>
      <Stack.Screen
        name='index'
        options={{
          title: 'Search',
          headerLargeTitle: true,
          headerSearchBarOptions: {
            placeholder: 'Taks, Projects and More',
            tintColor: Colors.primary,
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
