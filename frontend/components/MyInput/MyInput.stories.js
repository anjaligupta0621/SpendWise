import React from 'react';
import { View } from 'react-native';
import { MyInput } from './MyInput';

export default {
  title: "components/MyInput",
  component: MyInput,
//   argTypes: {
//     onPress: { action: 'pressed the button' },
//     // text: 'Hello world',
//   },
  args: {
    text: 'Hello world',
    label: "First Input",
    // onPress: { action: 'pressed the button' },
  },
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export const MySecondStory = {
  args: {
    text: 'Hello world',
    label: 'Last Name'
    // onPress: { action: 'pressed the button' },
  }
};

