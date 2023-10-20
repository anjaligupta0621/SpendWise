import {  StyleSheet, SafeAreaView, ScrollView, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import {styles} from '../styles/AuthenticationScreenStyle.js';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { PieChart } from 'react-native-chart-kit'
import LoginContext from '../contexts/loginContext.js';
import {categories} from '../data/homedata.js';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const windowWidth = width;

const gap = 12;
const itemPerRow = 2;

const totalGapSize = (itemPerRow - 1) * gap;
const childWidth = (windowWidth - totalGapSize) / itemPerRow;

export default function HomeScreen(props) {

    const navigation = useNavigation();

    const [fetchedEmail, setFetchedEmail] = useState('');
    const [fetchedName, setFetchedName] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);

    const [income, setIncome] = useState(0);
    const [isIncome, setIsIncome] = useState(false);

    const [fetchedExpenses, setFetchedExpenses] = useState(null);
    const [pieData1, setPieData1] = useState(null);

    const [fetchedTotalExpenses, setFetchedTotalExpenses] = useState(0);
    const [fetchedIncome, setFetchedIncome] = useState(0);

    const handleCategoryPress = (category) => {
        navigation.navigate('Expense', { category, fetchedEmail, fetchedName });
      };
    

    const renderItem = ({ item }) => (
        <TouchableOpacity style={gridStyles.categoryItem}>
          <Icon name={item.icon} size={40} color="#333" />
          <Text>{item.name}</Text>
        </TouchableOpacity>
      );

    const fetchToken = async () => {
        const token = await AsyncStorage.getItem('token');
        fetch("http://localhost:3000/", {
            headers: new Headers({
                Authorization: "Bearer " + token
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setFetchedEmail(data.email)
                    setFetchedName(data.firstName)
                    console.log("Fetched firstname: ", data.firstName);
                    setFetchedExpenses(data.expenses)
                    console.log("Fetched expenses: ", data.expenses);
                    setFetchedTotalExpenses(data.totalExpenses)
                    console.log("Fetched total expenses: ", data.totalExpenses);
                    setFetchedIncome(data.income);
                    console.log("Fetched income: ", data.income);

                    const pieData = [
                        {
                        name: "Car",
                        value: parseFloat(data.expenses['Car']),
                        color: "skyblue",
                        legendFontColor: "#181818",
                        legendFontSize: 15,
                        },
                        {
                        name: "Clothes",
                        value: data.expenses['Clothes'],
                        color: "blue",
                        legendFontColor: "#181818",
                        legendFontSize: 15
                        },
                        {
                        name: "Eating Out",
                        value: data.expenses['Eating Out'],
                        color: "red",
                        legendFontColor: "#181818",
                        legendFontSize: 15
                        },
                        {
                        name: "Groceries",
                        value: data.expenses['Groceries'],
                        color: "green",
                        legendFontColor: "#181818",
                        legendFontSize: 15
                        },
                        {
                        name: "Transport",
                        value: data.expenses['Transport'],
                        color: "purple",
                        legendFontColor: "#181818",
                        legendFontSize: 15
                        },
                        {
                        name: "Movies",
                        value: data.expenses['Movies'],
                        color: "yellow",
                        legendFontColor: "#181818",
                        legendFontSize: 15
                        },
                        {
                        name: "House",
                        value: data.expenses['House'],
                        color: "orange",
                        legendFontColor: "#181818",
                        legendFontSize: 15
                        },
                        {
                        name: "Pets",
                        value: data.expenses['Pets'],
                        color: "brown",
                        legendFontColor: "#181818",
                        legendFontSize: 15
                        },
                        {
                        name: "Health",
                        value: data.expenses['Health'],
                        color: "pink",
                        legendFontColor: "#181818",
                        legendFontSize: 15
                        },
                        {
                        name: "Toiletries",
                        value: data.expenses['Toiletries'],
                        color: "turquoise",
                        legendFontColor: "#181818",
                        legendFontSize: 15
                        },
                        {
                        name: "Internet",
                        value: data.expenses['Internet'],
                        color: "grey",
                        legendFontColor: "#181818",
                        legendFontSize: 15
                        },
                        {
                        name: "Sports",
                        value: data.expenses['Sports'],
                        color: "black",
                        legendFontColor: "#181818",
                        legendFontSize: 15
                        },
                        {
                        name: "Custom",
                        value: data.expenses['Custom'],
                        color: "navy",
                        legendFontColor: "#181818",
                        legendFontSize: 15
                        },
                        {
                        name: "Savings",
                        value: data.income - data.totalExpenses,
                        color: "#abf7b1",
                        legendFontColor: "#181818",
                        legendFontSize: 15
                        }
                        ];
                        setPieData1(pieData);
                
                }
            });
    }

    useEffect(() => {
        fetchToken();
    }, [fetchedIncome])

    const onLogoutHandler = () => {
        AsyncStorage.removeItem('token')
            .then(() => {
                setIsLoggedIn({isLoggedIn: false});
                props.navigation.replace("Login")
            })
    }

    const onUpdateProfileHandler = () => {
        console.log("Updating profile...");
        props.navigation.replace("UpdateProfile");
    }

    const onAddIncomeHandler = async () => {
        const data = {
            email: fetchedEmail,
            fetchedIncome: income
        }
        console.log("Adding income...");
        const response = await fetch("http://localhost:3000/updateIncome", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (response) {
            console.log("Income added!");
            setFetchedIncome(fetchedIncome + parseFloat(income));
            setIncome(null)
        } else {
            console.log("Error adding income!")
        }
        setIsIncome(false);
    }

    const handleExpenseAdded = ({ category, expense }) => {
        // Calculate the new total expense for the category and update the state
        const updatedPieData = pieData1.map((item) => {
          if (item.name === category) {
            item.value += expense;
          }
          if (item.name === "Savings") {
            item.value -= expense;
          }
          return item;
        });
      
        setPieData1(updatedPieData);
      };

        const chartConfig = {
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2,
            barPercentage: 0.5,
            decimalPlaces: 1, 
            style: {
              fontSize: 12, 
            },
          };

  return (
    <>
        <Text style={styles.welcomeTitle}>
            Hello
        </Text>
        <Text style={styles.spendWiseTitle}>
            {fetchedName}!
        </Text>
        <View style={{
            marginBottom: 20,
            ...styles.borderStyle}} />
        {pieData1 && <PieChart
            data={pieData1}
            width={windowWidth}
            height={300}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="20"
            absolute
        />}

        <Button mode='contained' style={styles.buttonStyle}
            onPress={() => setIsIncome(true)}
            >
            Add your income!
        </Button>

        {isIncome ? (
            <>
                <TextInput 
                    label="Income"
                    mode='outlined'
                    value={income}
                    onChangeText={(text) => setIncome(text)}
                    style = {styles.inputFieldStyle}
                    theme={{colors: {primary: "purple"}}}
                />
                <Button mode='contained' style={styles.buttonStyle}
                    onPress={onAddIncomeHandler}
                    >
                    Add
                </Button>
            </>
       ) : null }

        <Text style={gridStyles.normalHeading}>
            Choose a category below to add an expense
        </Text>

        <ScrollView>
            <View style={gridStyles.container}>
                {categories.map((category) => (
                    <View style={gridStyles.categoryItem} key={category.name}>
                    <Icon
                        name={category.icon}
                        type='material-icons'
                        color={category.color}
                        size={40}
                        onPress={() =>{
                            if (fetchedIncome === 0) {
                                alert("Please add your income first!")
                                return;
                            }
                            navigation.navigate('Expense', {
                            category: category.name,
                            fetchedEmail,
                            fetchedName,
                            onExpenseAdded: handleExpenseAdded, 
                            })}
                        }
                    />
                    <Text>{category.name}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>

    </>
  );
}

const gridStyles = StyleSheet.create({
    itemsWrap: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: -(gap / 2),
      marginHorizontal: -(gap / 2),
      marginLeft: 10,
      width: '45%',
    },
    singleItem: {
      marginHorizontal: gap / 2,
      minWidth: childWidth,
      maxWidth: childWidth,
      height: 100,
      width: 80,
      padding: 10,
      margin: 10,
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '50px'
    },
    itemStyle: {
        borderRadius: '20%',
    },
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        flexWrap: 'wrap',
        ScrollView: 'vertical',
      },
      categoryItem: {
        width: '33.33%', // 3 items per row
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      },
      normalHeading: {
        fontWeight: 'bold',
        margin: 10,
        fontSize: 16,
        alignSelf: 'center',
      }
  });