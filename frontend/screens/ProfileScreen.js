import { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles/AuthenticationScreenStyle.js';
import LoginContext from '../contexts/loginContext.js';
import Icon from 'react-native-vector-icons/FontAwesome';

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

    const [selectedAvatar, setSelectedAvatar] = useState(avatarList[0]);
    const [isEditMode, setIsEditMode] = useState(false);

    const updateAvatar = (avatar) => {
        setSelectedAvatar(avatar);
      };

      const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
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

      <View style={avatarStyles.avatarContainer}>
        {isEditMode ? (
            // Render avatars to choose from when in edit mode
            <View style={avatarStyles.avatarList}>
            {avatarList.map((group, groupIndex) => (
                <View key={groupIndex} style={avatarStyles.avatarGroup}>
                {group.map((avatar, index) => (
                    <TouchableOpacity
                    key={index}
                    style={[
                        avatarStyles.avatarThumbnail,
                        avatar === selectedAvatar && avatarStyles.selectedAvatar,
                    ]}
                    onPress={() => updateAvatar(avatar)}
                    >
                    <Image source={avatar} style={avatarStyles.avatarImage} />
                    </TouchableOpacity>
                ))}
                </View>
            ))}
            </View>
        ) : (
            // Render the default avatar when not in edit mode
            <Image source={selectedAvatar} style={avatarStyles.selectedAvatarImage} />
        )}

        <TouchableOpacity
            style={avatarStyles.editIcon}
            onPress={toggleEditMode}
        >
            <Icon name={isEditMode ? 'check' : 'pencil'} size={30} color="grey" />
        </TouchableOpacity>
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

const avatarStyles = StyleSheet.create({
    // avatarContainer: {
    //   flexDirection: 'row',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    avatarThumbnail: {
      width: 80,
      height: 80,
      margin: 5,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedAvatar: {
      borderColor: 'blue', // You can use a different color to indicate the selected avatar
    },
    avatarImage: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      alignContent: 'center',
    },
    selectedAvatarImage: {
      width: 120, // Adjust the size as needed
      height: 120, // Adjust the size as needed
    },
    // editIcon: {
    //     position: 'absolute',
    //     top: 10,
    //     right: 10,
    //   },
    avatarContainer: {
        position: 'relative',
      },
      avatarList: {
        flexDirection: 'column', // Display avatars in a column layout
      },
      avatarGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10, // Add spacing between rows
      },
      editIcon: {
        position: 'absolute',
        top: -25, // Adjust this value to move the icon further above
        right: 10,
      },
    // Add other styles as needed
  });
  