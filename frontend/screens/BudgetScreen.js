import { useState, useContext, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, KeyboardAvoidingView, Image, Animated, PanResponder } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles/AuthenticationScreenStyle.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import { avatarList } from '../data/profileData.js';

export default function BudgetScreen(props) {

    const colors = ['purple', 'turquoise', '#F44336'];

    const [cardsPan, setCardsPan] = useState(new Animated.ValueXY());
    const [cardsStackedAnim, setCardsStackedAnim] = useState(new Animated.Value(0));
    const [currentIndex, setCurrentIndex] = useState(0);

    const [enteredBudget, setEnteredBudget] = useState(0);

    const onAddBudget = () => {
      console.log("Budget added!");
    }

    const cardsPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderMove: (event, gestureState) => {
            setCardsPan({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderTerminationRequest: () => false,
        onPanResponderRelease: (event, gestureState) => {
                    // bring the translationX back to 0
            Animated.timing( cardsPan, {
                toValue: 0,
                duration: 300,
            } ).start();
            // will be used to interpolate values in each view
            Animated.timing( cardsStackedAnim, {
                toValue: 1,
                duration: 300,
            } ).start( () => {
                // reset cardsStackedAnim's value to 0 when animation ends
                setCardsStackedAnim(new Animated.Value(0));
                // increment card position when animation ends
                setCurrentIndex( currentIndex + 1 );
            } );
        }
    })

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
        Your Budget
      </Text>
      {cardsPan && <View style={{
        marginTop: "55%",
        alignContent: "center",
        alignItems: "center",
        position: 'relative',
      }}>    
      <Animated.View
    style={{
      width: 420, height: 200,
      position: 'absolute',
      borderRadius: 10,
      backgroundColor: colors[(currentIndex + 2) % 3],
      zIndex: 1,
      bottom: cardsStackedAnim.interpolate({
        inputRange: [ 0, 1 ], outputRange: [ 40, 20 ] }),
      transform: [{
        scale: cardsStackedAnim.interpolate({
          inputRange: [ 0, 1 ], outputRange: [ 0.80, 0.90 ] })
      }],
      opacity: cardsStackedAnim.interpolate({
        inputRange: [ 0, 1 ], outputRange: [ 0.3, 0.6 ] }),
    }}
  />
  <Animated.View
    style={{
      width: 420, height: 200,
      position: 'absolute',
      borderRadius: 10,
      backgroundColor: colors[(currentIndex + 1) % 3],
      zIndex: 2,
      bottom: cardsStackedAnim.interpolate({
        inputRange: [ 0, 1 ], outputRange: [ 20, 0 ] }),
      transform: [{
        scale: cardsStackedAnim.interpolate({
          inputRange: [ 0, 1 ], outputRange: [ 0.90, 1.0 ] })
      }],
      opacity: cardsStackedAnim.interpolate({
        inputRange: [ 0, 1 ], outputRange: [ 0.6, 1 ] }),
    }}
  />
  <Animated.View    // frontmost card
    { ...cardsPanResponder.panHandlers }
    style={{
      width: 420, height: 200,
      position: 'absolute',
      borderRadius: 10,
      zIndex: 3,
      bottom: 0,
      backgroundColor: colors[0], // Blue
      opacity: 1,
      transform: [
        { translateX: cardsPan.x },
        { scale: 1.0 },
      ],
    }}
  />
</View>}
<TextInput 
        label="Budget"
        mode='outlined'
        value={enteredBudget}
        onChangeText={(text) => setEnteredBudget(text)}
        style = {styles.inputFieldStyle}
        theme={{colors: {primary: "purple"}}}
       />
       <Button mode='contained' style={styles.buttonStyle}
        onPress={() => onAddBudget(props)}
        >
          Add Budget
       </Button>
       </KeyboardAvoidingView>
    </>
  );
}