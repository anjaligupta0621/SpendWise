import React from 'react';
import { View } from 'react-native';
import { MySearchBar } from './MySearchBar';

export default {
  title: "components/MySearchBar",
  component: MySearchBar,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  args: {
    text: 'Type something here',
    label: 'Search',
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

export const SearchBarStory = (args) => <MySearchBar {...args} />;

SearchBarStory.args = {
  text: 'Type...',
  label: 'Search Something',
  onPress: { action: 'pressed the button' },
};