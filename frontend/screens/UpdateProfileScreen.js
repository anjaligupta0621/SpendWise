import { useState, useContext } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, KeyboardAvoidingView, Image, FlatList } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles/AuthenticationScreenStyle.js';
import LoginContext from '../contexts/loginContext.js';
import { useNavigation } from '@react-navigation/native';

export default function UpdateProfileScreen(props) {

  const avatarList = [
    { id: 0, source: require('../assets/avatar1.png') },
    { id: 1, source: require('../assets/avatar2.png') },
    { id: 2, source: require('../assets/avatar3.png') },
    { id: 3, source: require('../assets/avatar4.jpeg') },
    { id: 4, source: require('../assets/avatar5.png') },
  ];

  const navigate = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);

    const [selectedAvatarId, setSelectedAvatarId] = useState(0);

    const updateAvatar = (avatar) => {
      setSelectedAvatarId(avatar.id);
    }

    const onUpdateHandler = () => {
        const data = {
            firstName,
            lastName,
            avatarIndex: selectedAvatarId,
        };
        console.log("Profile Updated!");
        console.log(data);
        navigate.navigate("UserProfile");
    }

    const onCancelHandler = () => {
      navigate.navigate("UserProfile");
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
      <FlatList
        data={avatarList}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4} // Set the number of columns per row
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              avatarStyles.avatarThumbnail,
              item.id === selectedAvatarId && avatarStyles.selectedAvatar,
            ]}
            onPress={() => updateAvatar(item)}
          >
            <Image source={item.source} style={avatarStyles.avatarImage} />
          </TouchableOpacity>
        )}
      />
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
          Save
       </Button>
       <Button mode='contained' style={styles.buttonStyle}
        onPress={() => onCancelHandler()}
        >
          Cancel
       </Button>
       </KeyboardAvoidingView>
    </>
  );
}

const avatarStyles = StyleSheet.create({
  // avatarThumbnail: {
  //   width: 80,
  //   height: 80,
  //   margin: 5,
  //   borderWidth: 2,
  //   borderColor: 'transparent',
  // },
  // selectedAvatar: {
  //   borderColor: 'blue', 
  // },
  // avatarImage: {
  //   width: '100%',
  //   height: '100%',
  // },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Align items to the left
  },
  avatarThumbnail: {
    width: '22%', // Adjust the width to fit four avatars in a row
    aspectRatio: 1,
    margin: '1%', // Add a small margin between avatars
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
  // avatarContainer: {
  //     position: 'relative',
  //   },
    avatarList: {
      flexDirection: 'row', 
      justifyContent: 'center',
      alignItems: 'center',
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
