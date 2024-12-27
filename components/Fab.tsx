import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { toast } from 'sonner-native';
import * as Haptics from 'expo-haptics';

const Fab = () => {
  const router = useRouter();
  const onPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/task/new');
  };
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Ionicons name='add' size={28} color='white' />
    </TouchableOpacity>
  );
};
export default Fab;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 1000,
    height: 56,
    width: 56,
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
});
