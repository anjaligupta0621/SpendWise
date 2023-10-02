import {  Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {styles} from '../styles/AuthenticationScreenStyle.js';

export default function HomeScreen(props) {

    const [fetchedEmail, setFetchedEmail] = useState('');
    const [fetchedName, setFetchedName] = useState('');

    const fetchToken = async () => {
        const token = await AsyncStorage.getItem('token');
        fetch("http://localhost:3000/", {
            headers: new Headers({
                Authorization: "Bearer " + token
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data && data.email) {
                    setFetchedEmail(data.email)
                }
                if (data && data.firstName) {
                    setFetchedName(data.firstName)
                    console.log("Fetched firstname: ", data.firstName);
                }
            });
    }

    useEffect(() => {
        fetchToken();
    }, [])

    const onLogoutHandler = () => {
        AsyncStorage.removeItem('token')
            .then(() => {
                props.navigation.replace("Login")
            })
    }

    const onUpdateProfileHandler = () => {
        console.log("Updating profile...");
        props.navigation.replace("UpdateProfile");
    }

  return (
    <>
        <Text style={styles.welcomeTitle}>
            Hello
        </Text>
        <Text style={styles.spendWiseTitle}>
            {fetchedName}!
        </Text>
        <View style={styles.borderStyle} />
        {/* <Text style={{fontSize: 18}}> Your email is: {fetchedEmail} </Text>
        <Text style={{fontSize: 18}}> Your name is: {fetchedName} </Text> */}
        <Button mode='contained' style={styles.buttonStyle}
            onPress={() => onUpdateProfileHandler()}
            >
            Update Profile
       </Button>
        <Button mode='contained' style={styles.buttonStyle}
        onPress={() => onLogoutHandler()}
        >
          Logout
       </Button>
    </>
  );
}