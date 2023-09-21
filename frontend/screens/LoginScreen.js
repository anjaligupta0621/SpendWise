import { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles/AuthenticationScreenStyle.js';


export default function LoginScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const onLoginHandler = async (props) => {
        const data = {
            "email": email,
            "password": password
        };

        fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(async (data) => {
            console.log('Login successful:', data);
            try {
                if (data && data.token) {
                    const jsonValue = JSON.stringify(data);
                    await AsyncStorage.setItem('token', data.token);
                    props.navigation.replace("Home");
                }
            } catch(e) {
                console.log(e);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        ;
    }

  return (
    <>
      <KeyboardAvoidingView behavior='position'>
      <Text style={styles.welcomeTitle}>
        Welcome to
      </Text>
      <Text style={styles.spendWiseTitle}>
        SpendWise!
      </Text>
      <View style={styles.borderStyle} />
      <Text style={styles.subtitleStyle}>
        Login using email
      </Text>
      <TextInput 
        label="Email"
        mode='outlined'
        autoCapitalize='none'
        value={email}
        onChangeText={(text) => setEmail(text)}
        style = {styles.inputFieldStyle}
        theme={{colors: {primary: "purple"}}}
       />
       <TextInput 
        label="Password"
        mode='outlined'
        autoCapitalize='none'
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        style = {styles.inputFieldStyle}
        theme={{colors: {primary: "purple"}}}
       />
       <Button mode='contained' style={styles.buttonStyle}
        onPress={() => onLoginHandler(props)}
        >
          Login
       </Button>
       <TouchableOpacity>
        <Text style={styles.lastTitle}
        onPress={() => props.navigation.replace("Signup")}
        >Don't have an account?</Text>
       </TouchableOpacity>
       </KeyboardAvoidingView>
    </>
  );
}