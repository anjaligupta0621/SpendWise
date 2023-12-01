import { LineChart } from "react-native-chart-kit";
import { View, Text } from "react-native";
import { Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

const LineComponent = () => {
    const monthData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43, 50, 100, 120, 70, 80, 76],
            strokeWidth: 2, // optional
          },
        ],
      };

      const weekData = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
          {
            data: [20, 45, 28, 80, 60, 90, 65],
            strokeWidth: 2, // optional
          },
        ],
      };

      const [activeBtn, setActiveBtn] = useState(1);

      const handleToggle = (btnNumber) => {
        setActiveBtn(btnNumber);
      };

    return (
        <>
        <View style={styles.ToggleBar}>
        <TouchableOpacity 
            style={activeBtn === 1 ? styles.ToggleBtnActive : styles.ToggleBtn}
            onPress={() => handleToggle(1)}
        >
          <Text style = {activeBtn === 1 ? {color : "white"} : null}>W</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={activeBtn === 2 ? styles.ToggleBtnActive : styles.ToggleBtn}
            onPress={() => handleToggle(2)}
        >
          <Text style = {activeBtn === 2 ? {color : "white"} : null}>M</Text>
        </TouchableOpacity>
      </View>
  <LineChart
    data={activeBtn === 1 ? weekData : monthData}
    width={Dimensions.get('window').width} // from react-native
    height={220}
    yAxisLabel={'$'}
    chartConfig={{
      backgroundColor: '#e26a00',
      backgroundGradientFrom: 'purple',
      backgroundGradientTo: 'turquoise',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      marginTop: 15,
      borderRadius: 16
    }}
  />
  <Text style={{ fontWeight: 'bold', alignSelf: 'center'}}>
    Your Spendings {activeBtn === 1 ? "this Week" : "monthly"}
  </Text>
  </>
    )
}

export default LineComponent;

const styles = StyleSheet.create({
    ToggleBar: {
      width: 100,
      alignSelf: "center",
      height: 50,
      backgroundColor: "#fff",
      marginTop: 70,
      borderRadius: 50,
      borderColor: "#111111",
      borderWidth: 2,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 5,
    },
    ToggleBtn: {
      width: 35,
      height: 35,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 30,
    },
    ToggleBtnActive: {
      width: 35,
      height: 35,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 30,
      backgroundColor: "purple"
    }
  });