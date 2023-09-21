import { StyleSheet, Text, View, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

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
  },[])

  return (
    <NavigationContainer>
      <Stack.Navigator headerShown='none' >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
