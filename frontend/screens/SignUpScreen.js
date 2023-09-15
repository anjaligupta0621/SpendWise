import { StyleSheet, Text, View, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function SignUpScreen() {
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
        style = {{
          marginLeft: 18,
          marginRight: 18,
          marginTop: 18,
        }}
        theme={{colors: {primary: "purple"}}}
       />
       <TextInput 
        label="Password"
        mode='outlined'
        style = {{
          marginLeft: 18,
          marginRight: 18,
          marginTop: 18,
        }}
        theme={{colors: {primary: "purple"}}}
       />
       <Button icon="camera" mode='contained' style={{ 
        color: "white", 
        backgroundColor: "purple",
        borderRadius: 5,
        marginLeft: 18,
        marginRight: 18,
        marginTop: 18,
        }}>
          Sign Up
       </Button>
       <TouchableOpacity>
        <Text style={{
          fontSize: 16,
          marginLeft: 18,
          marginTop: 18,
        }}>Already have an account?</Text>
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
