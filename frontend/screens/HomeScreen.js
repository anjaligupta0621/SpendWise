import {  StyleSheet, SafeAreaView, ScrollView, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import {styles} from '../styles/AuthenticationScreenStyle.js';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from 'react-native-chart-kit'
import LoginContext from '../contexts/loginContext.js';

import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const windowWidth = width;

const gap = 12;
const itemPerRow = 2;

const totalGapSize = (itemPerRow - 1) * gap;
const childWidth = (windowWidth - totalGapSize) / itemPerRow;

const categories = [
    { name: 'Car', icon: 'car', color: 'red' },
    { name: 'Transport', icon: 'bus', color: 'green' },
    { name: 'Movies', icon: 'film', color: 'purple' },
    { name: 'Clothes', icon: 'shirt', color: 'navy' },
    { name: 'Pets', icon: 'paw', color: 'skyblue' },
    { name: 'House', icon: 'home', color: 'orange' },
    { name: 'Groceries', icon: 'cart', color: 'green' },
    { name: 'Health', icon: 'medkit', color: 'red' },
    { name: 'Toiletries', icon: 'flask', color: 'turquoise' },
    { name: 'Eating Out', icon: 'restaurant', color: 'blue' },
    { name: 'Sports', icon: 'american-football', color: 'brown' },
    { name: 'Internet', icon: 'globe', color: 'grey' },
  ];

export default function HomeScreen(props) {

    const navigation = useNavigation();

    const [fetchedEmail, setFetchedEmail] = useState('');
    const [fetchedName, setFetchedName] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);

    const handleCategoryPress = (category) => {
        navigation.navigate('Expense', { category, fetchedName });
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
                if (data && data.email) {
                    setFetchedEmail(data.email)
                }
                if (data && data.firstName) {
                    setFetchedName(data.firstName)
                    console.log("Fetched firstname: ", data.firstName);
                }
            });
    }

    useEffect(() => {
        fetchToken();
    }, [])

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

    const data = {
        labels: ["Swim", "Bike", "Run", "Saving"], // optional
        data: [0.4, 0.6, 0.8, 0.2]
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
        <ProgressChart
            data={data}
            width={windowWidth-18}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                color: (opacity = 1) => `rgba(${128}, ${0}, ${128}, ${opacity})`
              }}
            style={{ 
                marginLeft: 18,
                marginRight: 18 
            }}
            hideLegend={false}
        />

        <Button mode='contained' style={styles.buttonStyle}
            onPress={() => console.log("Expense to be added")}
            >
            Add your expense!
        </Button>

        {/* <Button mode='contained' style={styles.buttonStyle}
            onPress={() => onUpdateProfileHandler()}
            >
            Update Profile
       </Button>
        <Button mode='contained' style={styles.buttonStyle}
        onPress={() => onLogoutHandler()}
        >
          Logout
       </Button> */}
       {/* <View style={gridStyles.container}>
            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
                numColumns={3}
            />
        </View> */}
        <View style={gridStyles.container}>
            {categories.map((category) => (
                <View style={gridStyles.categoryItem} key={category.name}>
                <Icon
                    name={category.icon}
                    type='material-icons'
                    color={category.color}
                    size={40}
                    onPress={() => handleCategoryPress(category.name)}
                />
                <Text>{category.name}</Text>
                </View>
            ))}
        </View>
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
    // container: {
    //     flex: 1,
    //     padding: 16,
    //     backgroundColor: '#fff',
    //   },
    //   categoryItem: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     margin: 8,
    //     padding: 16,
    //     borderWidth: 1,
    //     borderColor: '#ddd',
    //     borderRadius: 8,
    //   },

    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      categoryItem: {
        width: '33.33%', // 3 items per row
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      },
  });