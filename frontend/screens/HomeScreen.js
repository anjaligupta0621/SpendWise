import { StyleSheet, Text, View, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function HomeScreen(props) {

    const [fetchedEmail, setFetchedEmail] = useState('');

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

  return (
    <>
        <Text style={{fontSize: 18}}> You email is: {fetchedEmail} </Text>
        <Button icon="camera" mode='contained' style={{ 
            color: "white", 
            backgroundColor: "purple",
            borderRadius: 5,
            marginLeft: 18,
            marginRight: 18,
            marginTop: 18,
        }}
        onPress={() => onLogoutHandler()}
        >
          Logout
       </Button>
    </>
  );
}