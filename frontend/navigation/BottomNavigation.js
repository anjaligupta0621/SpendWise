import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="UpdateProfile" component={UpdateProfileScreen} />
    </Tab.Navigator>
  );
}