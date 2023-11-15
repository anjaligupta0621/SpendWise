import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, StatusBar, TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles/AuthenticationScreenStyle.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import { cardData } from '../data/cardData.js';

const BudgetScreen = () => {
  const [cards, setCards] = useState(cardData);
  const swipePosition = useRef(new Animated.ValueXY()).current;
  const [fetchedEmail, setFetchedEmail] = useState('');

  const [enteredBudget, setEnteredBudget] = useState(0);
  const [fetchedBudget, setFetchedBudget] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);

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
    Animated.timing(swipePosition, {
      toValue: direction === 'left' ? { x: -500, y: 0 } : { x: 500, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      const remainingCards = cards.slice(1);
      if (remainingCards.length === 0) {
        setCards(cardData);
        setCurrentIndex(0);
      } else {
        setCards(remainingCards);
        setCurrentIndex(currentIndex + 1);
      }
      swipePosition.setValue({ x: 0, y: 0 });
    });
  };
  

  const getCardStyle = () => {
    return {
      ...swipePosition.getLayout(),
      transform: swipePosition.getTranslateTransform(),
    };
  };
  
  const resetPosition = () => {
    Animated.spring(swipePosition, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };


  const renderCard = (card) => {
    return (
      <Animated.View style={[cardStyles.card, getCardStyle()]} {...panResponder.panHandlers}>
        <Text style={cardStyles.text}>{card.text}</Text>
      </Animated.View>
    );
  };

  const renderPagination = () => {
    return (
      <View style={styles2.pagination}>
        {cardData.map((_, index) => (
          <View
            key={index}
            style={[
              styles2.paginationDot,
              index === currentIndex ? styles2.activeDot : null,
            ]}
          />
        ))}
      </View>
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
      {renderPagination()}

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
    marginTop: 10,
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
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: "55%",
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#888', // Inactive dot color
      marginHorizontal: 5,
    },
    activeDot: {
      backgroundColor: 'purple', // Active dot color
    },
})

export default BudgetScreen;
