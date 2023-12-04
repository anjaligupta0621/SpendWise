import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const VideoCard = ({ title, videoSource }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View key={2} style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      
      <Video
        ref={video}
        style={styles.video}
        // source={{
        // //   uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        //   uri: videoSource
        // }}
        source={videoSource}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 350,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  }
});

export default VideoCard;