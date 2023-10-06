import { StyleSheet, Text, View, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
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

import LoginContext from './contexts/loginContext';

// import BottomNavigation from './navigation/BottomNavigation';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} >
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} >
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
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }} >
    //     <Stack.Screen name="Loading" component={LoadingScreen} />
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //     <Stack.Screen name="Signup" component={SignUpScreen} />
    //     <Stack.Screen name="Login" component={LoginScreen} />
    //     <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <LoginContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
        <NavigationContainer screenOptions={{ headerShown: false }} >
          {isLoggedIn ? (
            <Tab.Navigator screenOptions={{ headerShown: false }}>
              <Tab.Screen name="Home" component={HomeStack} />
              <Tab.Screen name="UpdateProfile" component={ProfileStack} />
            </Tab.Navigator>
          ) : (isLoggedIn === null ? (
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Loading" component={LoadingScreen} />
              </Stack.Navigator>
            ) 
            : (<Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Signup" component={SignUpScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
          ))}
        </NavigationContainer>
      </LoginContext.Provider>
  );
}

// export { default } from './.storybook';
