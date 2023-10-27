import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MyInput } from '../MyInput/MyInput';
import { MyButton } from '../MyButton/MyButton';

export const MySearchBar = ({ onPress, text, label }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <MyInput label={label} text={text} />
      <MyButton text="Search" onPress={onPress} />
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
//   text: { color: 'white' },
});
