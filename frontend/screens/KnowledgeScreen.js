import React from 'react';
import { useState, useContext, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import {styles} from '../styles/AuthenticationScreenStyle.js';
// import VideoPlayer from 'react-native-video-player';
// import ReactPlayer from 'react-player'
// import Video, {VideoRef} from 'react-native-video';
import { ResizeMode } from 'expo-av'
import VideoPlayer from 'expo-video-player'

// const VideoPlayer = () => {
//     // const videoRef = useRef<VideoRef>(null);
//     // const background = require('./background.mp4');
   
//     return (
//       <Video 
//        // Can be a URL or a local file.
//        source="https://www.youtube.com/watch?v=LXb3EKWsInQ"
//        // Store reference  
//     //    ref={videoRef}
//        // Callback when remote video is buffering                                      
//     //    onBuffer={onBuffer}
//        // Callback when video cannot be loaded              
//     //    onError={onError}               
//        style={videoStyles.backgroundVideo}
//       />
//     )
//    }


export default function KnowledgeScreen(props) {

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
      <Text style={{...styles.subtitleStyle, justifyContent: 'space-between', alignItems: 'center'}}>
        Useful Videos
    </Text>
    {/* <View style={videoStyles.container}> */}
    <Text style={{...styles.subtitleStyle, justifyContent: 'space-between', alignItems: 'center'}}>
        Budgeting Videos
    </Text>
      {/* <Text style={videoStyles.title}>Budgeting Videos</Text> */}
      {/* <View style={videoStyles.videoContainer}>
        <Text>Inside container</Text> */}
        {/* <VideoPlayer
          video={{ uri: 'https://www.youtube.com/watch?v=0V5BwTruG5s' }}
            // videoWidth={1600}
            // videoHeight={900}
            thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
        /> */}
        {/* <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' /> */}
        {/* <View style={{
            height: 200,
            width: '100%',
            backgroundColor: 'white',
        }}>
            <VideoPlayer
            videoProps={{
                shouldPlay: false,
                resizeMode: ResizeMode.CONTAIN,
                style: { width: '100%', 
                height: '50%', 
                videoBackgroundColor: 'white', 
                controlsBackgroundColor: 'white' },
                // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
                source: {
                uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            // uri: 'https://youtu.be/PJ4t2U15ACo?si=Ktgfpm8-HjDp73m6'    
            },
            }}
            />
        </View> */}
      {/* </View> */}
    {/* </View> */}
       </KeyboardAvoidingView>
    </>
  );

}

// const videoStyles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     title: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       marginBottom: 20,
//       marginTop: 55,
//       color: 'black'
//     },
//     videoContainer: {
//       width: '90%',
//       aspectRatio: 16 / 9, // Adjust aspect ratio as needed
//       borderWidth: 1,
//       borderColor: 'black',
//     },
//     videoPlayer: {
//       flex: 1,
//     },
//   });

var videoStyles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });