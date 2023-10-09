// ExpenseScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {styles} from '../styles/AuthenticationScreenStyle.js';
import { Button, TextInput } from 'react-native-paper';



const ExpenseScreen = ({ route }) => {
  const [expense, setExpense] = useState('');
  const category = route.params.category;
  const fetchedName = route.params.fetchedName;

  const handleAddExpense = () => {
    console.log("Expense has been added to the database.");
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
