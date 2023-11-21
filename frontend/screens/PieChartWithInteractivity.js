import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { PieChart } from 'react-native-svg-charts'

const PieChartWithInteractivity = () => {

    const pieData = [
      {
      name: "Car",
      value: 20,
      color: "skyblue",
      legendFontColor: "#181818",
      legendFontSize: 15,
      },
      {
      name: "Clothes",
      value: 30,
      color: "blue",
      legendFontColor: "#181818",
      legendFontSize: 15
      },
      {
      name: "Eating Out",
      value: 10,
      color: "red",
      legendFontColor: "#181818",
      legendFontSize: 15
      },
      {
      name: "Groceries",
      value: 20,
      color: "green",
      legendFontColor: "#181818",
      legendFontSize: 15
      },
      {
      name: "Transport",
      value: 10,
      color: "purple",
      legendFontColor: "#181818",
      legendFontSize: 15
      },
      {
      name: "Movies",
      value: 12,
      color: "yellow",
      legendFontColor: "#181818",
      legendFontSize: 15
      },
      {
      name: "House",
      value: 50,
      color: "orange",
      legendFontColor: "#181818",
      legendFontSize: 15
      },
      {
      name: "Pets",
      value: 25,
      color: "brown",
      legendFontColor: "#181818",
      legendFontSize: 15
      },
      {
      name: "Health",
      value: 40,
      color: "pink",
      legendFontColor: "#181818",
      legendFontSize: 15
      },
      {
      name: "Toiletries",
      value: 20,
      color: "turquoise",
      legendFontColor: "#181818",
      legendFontSize: 15
      },
      {
      name: "Internet",
      value: 15,
      color: "grey",
      legendFontColor: "#181818",
      legendFontSize: 15
      },
      {
      name: "Sports",
      value: 10,
      color: "black",
      legendFontColor: "#181818",
      legendFontSize: 15
      },
      {
      name: "Custom",
      value: 12,
      color: "navy",
      legendFontColor: "#181818",
      legendFontSize: 15
      },
      {
      name: "Savings",
      value: 65,
      color: "#abf7b1",
      legendFontColor: "#181818",
      legendFontSize: 15
      }
      ];

      const [selectedSlice, setSelectedSlice] = useState(null);
      const [selectedSliceValue, setSelectedSliceValue] = useState(null);

      const getPieChartDataRounded2 = (data) => {
        return data.map((item, index) => {
          return {
            key: index,
            value: item.value,
            svg: { fill: item.color },
            arc: {
              cornerRadius: 5,
              outerRadius: selectedSlice === item.name ? '75%' : '70%',
            },
            onPress: () => handleSlicePress(item.name, item.value),
          };
        });
      };
    
      const handleSlicePress = (category, value) => {
        setSelectedSlice(category);
        setSelectedSliceValue(value);
        console.log(`Selected category: ${category}`);
      };

    const pieChartData = getPieChartDataRounded2(pieData);



    return (
        // <PieChart
        //     style={{ width: 300, height: 300, marginTop: "45%", alignContent: 'center', alignSelf: 'center' }}
        //     data={pieChartData}
        //     innerRadius={35}
        //     outerRadius={70}
        //     labelRadius={120}
        //     sort={(a, b) => b.key - a.key}>
        // </PieChart>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <PieChart
        style={{ width: 300, height: 300 }}
        data={pieChartData}
        innerRadius={35}
        labelRadius={120}
        sort={(a, b) => b.key - a.key}
      />

      {selectedSlice && selectedSliceValue && (
        <View style={{ alignItems: 'center'}}>
          <Text style={{ fontWeight: 'bold' }}>{selectedSlice} : {selectedSliceValue}</Text>
        </View>
      )}
    </View>

    )
}
export default PieChartWithInteractivity;