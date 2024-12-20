import MoreButton from '@/components/MoreButton';
import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Upcoming',
          headerShadowVisible: false,
          headerRight: () => <MoreButton title='Add' />,
        }}
      />
    </Stack>
  );
};

export default Layout;
