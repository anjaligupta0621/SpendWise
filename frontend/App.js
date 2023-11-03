import { StyleSheet, Text, View, StatusBar, TouchableOpacity, KeyboardAvoidingView, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UpdateProfileScreen from './screens/UpdateProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginContext from './contexts/loginContext';

import Icon from 'react-native-vector-icons/Ionicons';  
import ExpenseScreen from './screens/ExpenseScreen';
import ProfileScreen from './screens/ProfileScreen';
import BudgetScreen from './screens/BudgetScreen';

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Expense" component={ExpenseScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} >
    <Stack.Screen name="UserProfile" component={ProfileScreen} />
    <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
  </Stack.Navigator>
);

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const detectLogin= async ()=>{
    const token = await AsyncStorage.getItem('token')
    if(token){
        setIsLoggedIn(true)
    }else{
        setIsLoggedIn(false)
    }
  }

  useEffect(()=>{
    detectLogin()
  },[isLoggedIn])

  return (
    <LoginContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
        <NavigationContainer screenOptions={{ headerShown: false }} >
          {isLoggedIn ? (
            <Tab.Navigator screenOptions={{ headerShown: false }}>
              <Tab.Screen 
                name="Home" 
                component={HomeStack} 
                options={{
                  tabBarLabel: 'Home',
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" color="grey" size={20} />
                  ),
                }} 
              />
              <Tab.Screen 
                name="Budget" 
                component={BudgetScreen} 
                options={{
                  tabBarLabel: 'Budget',
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="card" color="grey" size={20} />
                  ),
                }} 
              />
              <Tab.Screen 
                name="Profile" 
                component={ProfileStack}
                options={{
                  tabBarLabel: 'Profile',
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person" color="grey" size={25} />
                  ),
                }}
              />
            </Tab.Navigator>
          ) : (isLoggedIn === null ? (
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Loading" component={LoadingScreen} />
              </Stack.Navigator>
            ) 
            : (<Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignUpScreen} />
            </Stack.Navigator>
          ))}
        </NavigationContainer>
      </LoginContext.Provider>
  );
}

// export { default } from './.storybook';
