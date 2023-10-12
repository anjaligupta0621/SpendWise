import { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles/AuthenticationScreenStyle.js';
import LoginContext from '../contexts/loginContext.js';


export default function UpdateProfileScreen(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [income, setIncome] = useState(0);

    const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);

    const fetchProfile = async () => {
        const token = await AsyncStorage.getItem('token');
        fetch("http://localhost:3000/", {
            headers: new Headers({
                Authorization: "Bearer " + token
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setEmail(data.email)
                    setFirstName(data.firstName)
                    console.log("Fetched firstname: ", data.firstName);
                    setLastName(data.lastName)
                    console.log("Fetched lastName: ", data.lastName);
                    setIncome(data.income)
                }
            });
    }

    useEffect(() => {
        fetchProfile();
    }, [])

    const onUpdateHandler = () => {
        const data = {
            firstName,
            lastName
        };
        console.log("Profile Updated!");
        console.log(data);
        props.navigation.replace("UpdateProfile");
    }

    const onLogoutHandler = () => {
        AsyncStorage.removeItem('token')
            .then(() => {
                setIsLoggedIn({isLoggedIn: false});
                // props.navigation.replace("Login")
            })
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
        Your Profile
      </Text>
       <Text style={styles.subtitleStyle}>
            First Name: {firstName}
        </Text>
        <Text style={styles.subtitleStyle}>
            Last Name: {lastName}
        </Text>
        <Text style={styles.subtitleStyle}>
            Email: {email}
        </Text>
        <Text style={styles.subtitleStyle}>
            Income: {income}
        </Text>
       <Button mode='contained' style={styles.buttonStyle}
        onPress={() => onUpdateHandler(props)}
        >
          Update
       </Button>
       <Button mode='contained' style={styles.buttonStyle}
        onPress={() => onLogoutHandler()}
        >
          Logout
       </Button>
       </KeyboardAvoidingView>
    </>
  );
}