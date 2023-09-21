import { ActivityIndicator} from 'react-native';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';


export default function LoginScreen(props) {
    const detectLogin= async ()=>{
        const token = await AsyncStorage.getItem('token');
        if(token){
            props.navigation.replace("Home");
        }else{
            props.navigation.replace("Login");
        }
      }
    
      useEffect(()=>{
        detectLogin()
      },[])

  return (
    <>
      <ActivityIndicator size="large" color="purple"/>
    </>
  );
}

// const styles = StyleSheet.create({
//     loading: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center"
//     }
//   })