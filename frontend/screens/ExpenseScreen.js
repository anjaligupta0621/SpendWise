// ExpenseScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {styles} from '../styles/AuthenticationScreenStyle.js';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const ExpenseScreen = ({ route }) => {
  const [expense, setExpense] = useState('');
  const category = route.params.category;
  const fetchedName = route.params.fetchedName;
  const fetchedEmail = route.params.fetchedEmail;

  const navigation = useNavigation();

  // const handleAddExpense = async () => {
    // console.log("Expense has been added to the database.");
    // const data = {
    //     email: fetchedEmail,
    //     category: category,
    //     expense: expense
    // }
    // console.log("Adding expense...");
    // const response = await fetch("http://localhost:3000/updateExpenses", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data),
    // });
  //   if (response) {
  //       console.log("Expense added!")
  //       navigation.navigate('Home');
  //   } else {
  //       console.log("Error adding income!")
  //   }    
  // };

  const handleAddExpense = async () => {
    console.log("Expense has been added to the database.");
    const data = {
        email: fetchedEmail,
        category: category,
        expense: expense
    }
    console.log("Adding expense...");
    const response = await fetch("http://localhost:3000/updateExpenses", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    if (response) {
      console.log("Expense added!");
  
      // Pass the new expense data back to the home screen.
      route.params.onExpenseAdded({
        category: category,
        expense: parseFloat(expense), // Convert the expense to a float
      });
  
      navigation.goBack(); // Go back to the previous screen
    } else {
      console.log("Error adding expense!");
    }
  };

  return (
    <>
        <Text style={styles.welcomeTitle}>
            Hello
        </Text>
        <Text style={styles.spendWiseTitle}>
            {fetchedName}!
        </Text>
        <View style={styles.borderStyle} />
        <Text style={styles.subtitleStyle}>
            Enter your expense for the chosen category: {category}
        </Text>
        <TextInput 
            label="Expense Amount"
            mode='outlined'
            autoCapitalize='none'
            value={expense}
            onChangeText={(text) => setExpense(text)}
            style = {styles.inputFieldStyle}
            theme={{colors: {primary: "purple"}}}
        />
        <Button title="Add" mode='contained' style={styles.buttonStyle}
        onPress={handleAddExpense}
        >
          Add Expense
       </Button>
    </>
  );
};

const expenseStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  categoryTitle: {
    fontWeight: 'bold',
  }
});

export default ExpenseScreen;
