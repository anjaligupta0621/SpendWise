import { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles/AuthenticationScreenStyle.js';


export default function UpdateProfileScreen(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const onUpdateHandler = () => {
        const data = {
            firstName,
            lastName
        };
        console.log("Profile Updated!");
        console.log(data);
        props.navigation.replace("Home");
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
        Update your Profile
      </Text>
      <TextInput 
        label="First Name"
        mode='outlined'
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        style = {styles.inputFieldStyle}
        theme={{colors: {primary: "purple"}}}
       />
       <TextInput 
        label="Last Name"
        mode='outlined'
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        style = {styles.inputFieldStyle}
        theme={{colors: {primary: "purple"}}}
       />
       <Button mode='contained' style={styles.buttonStyle}
        onPress={() => onUpdateHandler(props)}
        >
          Update
       </Button>
       {/* <TouchableOpacity>
        <Text style={styles.lastTitle}
        onPress={() => props.navigation.replace("Signup")}
        >Don't have an account?</Text>
       </TouchableOpacity> */}
       </KeyboardAvoidingView>
    </>
  );
}