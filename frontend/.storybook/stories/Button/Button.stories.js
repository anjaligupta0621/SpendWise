import React from 'react';
import { View } from 'react-native';
import { MyButton } from './Button';

export default {
  title: "components/MyButton",
  component: MyButton,
  argTypes: {
    onPress: { action: 'pressed the button' },
    // text: 'Hello world',
  },
  args: {
    text: 'Hello world',
    onPress: { action: 'pressed the button' },
  },
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

// export const MyFirstStory = {
//   args: {
//     text: 'Hello world',
//     onPress: { action: 'pressed the button' },
//   }
// };

