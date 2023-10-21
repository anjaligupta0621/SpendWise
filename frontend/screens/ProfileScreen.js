import { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles/AuthenticationScreenStyle.js';
import LoginContext from '../contexts/loginContext.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function UpdateProfileScreen(props) {

    const avatarList = [
        [require('../assets/avatar1.png'),
        require('../assets/avatar2.png'),
        require('../assets/avatar3.png'),
        require('../assets/avatar4.jpeg'),],
        [require('../assets/avatar5.png'),]
      ];

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [income, setIncome] = useState(0);

    const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);

    const navigate = useNavigation();

    const [selectedAvatar, setSelectedAvatar] = useState(avatarList[0][0]);
    const [isEditMode, setIsEditMode] = useState(false);

    const updateAvatar = (avatar) => {
        setSelectedAvatar(avatar);
      };

      const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
        if (!isEditMode) {
          onUpdateAvatarHandler();
        }
      };

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
        // props.navigation.replace("UpdateProfile");
        navigate.navigate("UpdateProfile");
        
    }

    const onUpdateAvatarHandler = async () => {
      const data = {
        email, 
        selectedAvatarIndex: avatarList.indexOf(selectedAvatar),
      };
    
      try {
        const response = await fetch('http://localhost:3000/updateAvatar', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    
        if (response.ok) {
          console.log('Avatar updated successfully');
          // You may want to update the user's data in your app state
        } else {
          console.error('Failed to update avatar');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };
    
    

    const onLogoutHandler = () => {
        AsyncStorage.removeItem('token')
            .then(() => {
                setIsLoggedIn({isLoggedIn: false});
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

      <View style={avatarStyles.avatarContainer}>
        
        <Image source={selectedAvatar} style={avatarStyles.selectedAvatarImage} />

        {/* <TouchableOpacity
            style={avatarStyles.editIcon}
            onPress={toggleEditMode}
        >
            <Icon name={isEditMode ? 'check' : 'pencil'} size={30} color="grey" />
        </TouchableOpacity> */}
        </View>


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
          Update Profile
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

const avatarStyles = StyleSheet.create({
    avatarThumbnail: {
      width: 80,
      height: 80,
      margin: 5,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedAvatar: {
      borderColor: 'blue', 
    },
    avatarImage: {
      width: '100%',
      height: '100%',
    },
    selectedAvatarImage: {
      width: 120, 
      height: 120, 
      marginLeft: '35%',
      borderRadius: 60,
    },
    avatarContainer: {
        position: 'relative',
      },
      avatarList: {
        flexDirection: 'column', 
      },
      avatarGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10, 
      },
      editIcon: {
        position: 'absolute',
        top: -25, 
        right: 10,
      },
  });
  