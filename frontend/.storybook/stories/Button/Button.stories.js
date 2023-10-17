import React from 'react';
import { View } from 'react-native';
import { MyButton } from './Button';

export default {
  title: "MyButton",
  component: MyButton,
  argTypes: {
    onPress: { action: 'pressed the button' },
    text: 'Hello world',
  },
};

export const MyFirstStory = {
  args: {
    task: 'Hello world',
    onPress: { action: 'pressed the button' },
  },
};

