import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

export const MyInput = ({ label, text }) => {

    const [inputText, setInputText] = useState('')
    return (
      <TouchableOpacity style={styles.container} activeOpacity={0.8}>
        <TextInput 
            label={label}
            mode='outlined'
            value={text}
            onChangeText={(t) => setInputText(t)}
            style = {styles.text}
            theme={{colors: {primary: "purple"}}}
        />
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      // backgroundColor: 'purple',
      borderRadius: 8,
    },
    text: { color: 'black' },
  });

