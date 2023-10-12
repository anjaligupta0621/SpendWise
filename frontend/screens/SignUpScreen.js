import { useState, useContext } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles/AuthenticationScreenStyle.js';
import LoginContext from '../contexts/loginContext.js';

export default function SignUpScreen(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);

    const handlePasswordFocus = () => {
      setShowMessage(true);
    }

    const handlePasswordBlur = () => {
      setShowMessage(false);
    }

    const onSignUpHandler = async () => {
        const data = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password
        };

        if (firstName == '' || lastName == '' || email == '' || password == '' || rePassword == '') {
            alert("Please fill in all fields!");
            return;
        }

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

        if (!passwordRegex.test(password)) {
            alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number!");
            return;
        }
        
        if (password != rePassword) {
            alert("Passwords do not match!");
            return;
        }


        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(async (data) => {
            console.log('Success:', data);
            try {
                const jsonValue = JSON.stringify(data);
                await AsyncStorage.setItem('token', data.token);
                setIsLoggedIn({isLoggedIn: true})
                // props.navigation.replace("Home");
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
        Create New Account
      </Text>

      <View style={styles.container}>
      <TextInput
        style={styles.inputFieldLeft}
        label="First Name"
        mode='outlined'
        value={firstName}
        onChangeText={text => setFirstName(text)}
        theme={{colors: {primary: "purple"}}}
      />
      <TextInput
        style={styles.inputFieldRight}
        label="Last Name"
        mode='outlined'
        value={lastName}
        onChangeText={text => setLastName(text)}
        theme={{colors: {primary: "purple"}}}
      />
    </View>
      
      <TextInput 
        label="Email"
        mode='outlined'
        autoCapitalize='none'
        style = {styles.inputFieldStyle}
        value={email}
        onChangeText={text => setEmail(text)}
        theme={{colors: {primary: "purple"}}}
       />
       <TextInput 
        label="Password"
        mode='outlined'
        autoCapitalize='none'
        style = {styles.inputFieldStyle}
        value={password}
        onChangeText={text => setPassword(text)}
        onFocus={handlePasswordFocus}
        onBlur={handlePasswordBlur}
        secureTextEntry={true}
        theme={{colors: {primary: "purple"}}}
       />
       { showMessage && <Text style={styles.textStyle}>
        Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number!
        </Text>}
       <TextInput 
        label="Re-enter Password"
        mode='outlined'
        autoCapitalize='none'
        style = {styles.inputFieldStyle}
        value={rePassword}
        onChangeText={text => setRePassword(text)}
        secureTextEntry={true}
        theme={{colors: {primary: "purple"}}}
       />
       <Button mode='contained' style={styles.buttonStyle}
        onPress={() => onSignUpHandler()}
        >
          Sign Up
       </Button>
       <TouchableOpacity>
        <Text 
            style={styles.lastTitle}
            onPress={() => props.navigation.replace("Login")}
        >
            Already have an account?
        </Text>
       </TouchableOpacity>
       </KeyboardAvoidingView>
    </>
  );
}
