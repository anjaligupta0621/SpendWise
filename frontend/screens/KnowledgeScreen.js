import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView} from 'react-native';
import {styles} from '../styles/AuthenticationScreenStyle.js';
import VideoCard from './VideoCard.js'

export default function KnowledgeScreen(props) {

  const videos = [
    {
      title: 'How To Live Below Your Means',
      videoSource: require('frontend/assets/budgeting/3.mp4'),
    },
    {
      title: 'BUDGETING FOR BEGINNERS',
      videoSource: require('frontend/assets/budgeting/2.mp4'),
    },
    {
      title: 'How To Manage Your Money',
      videoSource: require('frontend/assets/budgeting/4.mp4'),
    },
    {
        title: '10 Proven Ways To Grow Money',
        videoSource: require('frontend/assets/budgeting/1.mp4'),
      },
  ]

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
    <Text style={{...styles.subtitleStyle, justifyContent: 'space-between', alignItems: 'center'}}>
        Budgeting Videos
    </Text>
    {/* <ScrollView contentContainerStyle={videoStyles.scrollContainer}>
      {videos.map((title, videoSource) => (
        <VideoCard title={title.title} videoSource={videoSource} />
      ))}
    </ScrollView> */}
    <ScrollView contentContainerStyle={videoStyles.scrollContainer}>
          {videos.map((video, index) => ( // Changed the mapping function parameters
            <VideoCard key={index} title={video.title} videoSource={video.videoSource} /> // Passed video.videoSource
          ))}
        </ScrollView>
       </KeyboardAvoidingView>
    </>
  );

}

const videoStyles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    height: 1600
  },
});