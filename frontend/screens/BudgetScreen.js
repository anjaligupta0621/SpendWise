import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, StatusBar, TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles/AuthenticationScreenStyle.js';
import { useNavigation, useRoute } from '@react-navigation/native';

const cardData = [
  { id: 1, text: 'We researched about some budget techniques and present you with the best ones we could find. Swipe left to see more..' },
  { id: 2, text: 'It is recommended that you put 50% of your income in fixed spendings' },
  { id: 3, text: 'It is recommended that you put 20% of your income in savings' },
];

const BudgetScreen = () => {
  const [cards, setCards] = useState(cardData);
  const swipePosition = useRef(new Animated.ValueXY()).current;
  const [fetchedEmail, setFetchedEmail] = useState('');

  const [enteredBudget, setEnteredBudget] = useState(0);
  const [fetchedBudget, setFetchedBudget] = useState(0);

  const fetchBudget = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch("http://localhost:3000/", {
      headers: new Headers({
        Authorization: "Bearer " + token
    })
});
        const data = await response.json();
        console.log(data);
        setFetchedEmail(data.email);
        setFetchedBudget(data.budget);
  }

  useEffect(() => {
    fetchBudget();
  }, [])

  const onAddBudget = () => {
      console.log("Budget added!");
      console.log(enteredBudget);
      const data = {
        email: fetchedEmail,
        budget: enteredBudget,
      };
      const response = fetch("http://localhost:3000/addBudget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setFetchedBudget(enteredBudget);
      setEnteredBudget(0);
    }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      swipePosition.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > 120) {
        // Swiped right
        handleSwipeComplete('right');
      } else if (gesture.dx < -120) {
        // Swiped left
        handleSwipeComplete('left');
      } else {
        resetPosition();
      }
    },
  });

  const handleSwipeComplete = (direction) => {
    // Handle a swipe (right or left) here, e.g., remove card from the stack
    const remainingCards = cards.slice(1);
    if (remainingCards.length === 0) {
      // If there are no more cards, reset to the initial state
      setCards(cardData);
    } else {
      setCards(remainingCards);
    }
    resetPosition();
  };

  const resetPosition = () => {
    Animated.spring(swipePosition, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = swipePosition.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-30deg', '0deg', '30deg'],
    });

    return {
      ...swipePosition.getLayout(),
      transform: [{ rotate }],
    };
  };

  const renderCard = (card) => {
    return (
      <Animated.View style={[cardStyles.card, getCardStyle()]} {...panResponder.panHandlers}>
        <Text style={cardStyles.text}>{card.text}</Text>
      </Animated.View>
    );
  };

  useEffect(() => {
    if (cards.length === 0) {
      setCards(cardData); // Reset to the initial state if there are no more cards
    }
  }, [cards]);

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
      <View style={cardStyles.container}>
        {cards.map((card, index) => {
          if (index === 0) {
            return renderCard(card);
          }
          return null;
        })}
      </View>
      
      <TextInput 
          label="Budget"
          mode='outlined'
          value={enteredBudget}
          onChangeText={(text) => setEnteredBudget(text)}
          style = {styles2.inputFieldStyle}
          theme={{colors: {primary: "purple"}}}
        />
       <Button mode='contained' style={styles2.buttonStyle}
        onPress={() => onAddBudget()}
        >
          Add Budget
       </Button>
       <Text style={styles.textStyle}>
        Current Budget: {fetchedBudget}
      </Text>
    </KeyboardAvoidingView>
    </>
  );
};

const cardStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    width: 400,
    height: 200,
    borderRadius: 10,
    backgroundColor: 'purple',
    shadowColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    margin: 15
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

const styles2 = StyleSheet.create({
  inputFieldStyle: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: "55%",
    position: 'relative'
  },
buttonStyle: { 
    color: "white", 
    backgroundColor: "purple",
    borderRadius: 5,
    marginLeft: 18,
    marginRight: 18,
    marginTop: 18,
    },
})

export default BudgetScreen;
