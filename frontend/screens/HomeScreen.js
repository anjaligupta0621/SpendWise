import {  StyleSheet, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import {styles} from '../styles/AuthenticationScreenStyle.js';
import { Dimensions } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from 'react-native-chart-kit'
import LoginContext from '../contexts/loginContext.js';

const { width } = Dimensions.get('window');
const windowWidth = width;

const gap = 12;
const itemPerRow = 2;

const totalGapSize = (itemPerRow - 1) * gap;
const childWidth = (windowWidth - totalGapSize) / itemPerRow;

export default function HomeScreen(props) {

    const [fetchedEmail, setFetchedEmail] = useState('');
    const [fetchedName, setFetchedName] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);

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

        <Button mode='contained' style={styles.buttonStyle}
            onPress={() => onUpdateProfileHandler()}
            >
            Update Profile
       </Button>
        <Button mode='contained' style={styles.buttonStyle}
        onPress={() => onLogoutHandler()}
        >
          Logout
       </Button>
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
    }
  });