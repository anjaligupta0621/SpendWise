import { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignUpHandler = async () => {
        const data = {
            "email": email,
            "password": password
        };

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
                props.navigation.replace("Home");
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
      <Text style={{
        fontSize: 30,
        marginLeft: 18,
        marginTop: 60,
        color: 'grey'
      }}>
        Welcome to
      </Text>
      <Text style={{
        fontSize: 35,
        marginLeft: 18,
        color: 'purple'
      }}>
        SpendWise!
      </Text>
      <View style={{
        borderBottomColor: "purple",
        borderBottomWidth: 4,
        borderRadius: 10,
        marginLeft: 16,
        marginRight: 260,
        marginTop: 10
      }} />
      <Text style={{
        fontSize: 20,
        marginLeft: 18,
        marginTop: 20,
        fontWeight: "bold",
      }}>
        Create New Account
      </Text>
      <TextInput 
        label="Email"
        mode='outlined'
        autoCapitalize='none'
        style = {{
          marginLeft: 18,
          marginRight: 18,
          marginTop: 18,
        }}
        value={email}
        onChangeText={text => setEmail(text)}
        theme={{colors: {primary: "purple"}}}
       />
       <TextInput 
        label="Password"
        mode='outlined'
        autoCapitalize='none'
        style = {{
          marginLeft: 18,
          marginRight: 18,
          marginTop: 18,
        }}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
        theme={{colors: {primary: "purple"}}}
       />
       <Button icon="camera" mode='contained' style={{ 
        color: "white", 
        backgroundColor: "purple",
        borderRadius: 5,
        marginLeft: 18,
        marginRight: 18,
        marginTop: 18,
        }}
        onPress={() => onSignUpHandler()}
        >
          Sign Up
       </Button>
       <TouchableOpacity>
        <Text 
            style={{
            fontSize: 16,
            marginLeft: 18,
            marginTop: 18,
            }}
            onPress={() => props.navigation.replace("Login")}
        >
            Already have an account?
        </Text>
       </TouchableOpacity>
       </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
