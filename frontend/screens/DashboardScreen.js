import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {styles as headerStyles} from "../styles/AuthenticationScreenStyle";
import { Text as SVGText, G } from 'react-native-svg';
import LineComponent from "./LineComponent";


const DottedBar = (props) => {
  const { bottom } = props;

  return (
    <View
      style={{
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "black",
        borderRadius: 1,
        width: "100%",
        position: "absolute",
        opacity: 0.2,
        bottom: bottom,
      }}
    />
  );
};

const WeekMode = () => {

  return (
    <>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{ padding: 20, flexDirection: "row", alignContent: "center",  justifyContent: "space-between", width: 400, marginLeft: 20 }}
        >
          <GraphLine
            earnLineHeight={100}
            spendLineHeight={50}
            MonthName={"Mon"}
          />
          <GraphLine
            earnLineHeight={80}
            spendLineHeight={60}
            MonthName={"Tue"}
          />
          <GraphLine
            earnLineHeight={110}
            spendLineHeight={76}
            MonthName={"Wed"}
          />
          <GraphLine
            earnLineHeight={135}
            spendLineHeight={85}
            MonthName={"Thu"}
          />
          <GraphLine
            earnLineHeight={55}
            spendLineHeight={34}
            MonthName={"Fri"}
          />
          <GraphLine
            earnLineHeight={90}
            spendLineHeight={76}
            MonthName={"Sat"}
          />
          <GraphLine
            earnLineHeight={90}
            spendLineHeight={76}
            MonthName={"Sun"}
          />
        </View>
      </ScrollView>   
    </>
  );
}

const MonthMode = () => {
    const [activeBtn, setActiveBtn] = useState(1);

    const handleToggle = (btnNumber) => {
        setActiveBtn(btnNumber);
      };

  return (
    <>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{ padding: 20, flexDirection: "row", alignContent: "center" }}
        >
          <GraphLine
            earnLineHeight={100}
            spendLineHeight={50}
            MonthName={"Jan"}
          />
          <GraphLine
            earnLineHeight={80}
            spendLineHeight={60}
            MonthName={"Feb"}
          />
          <GraphLine
            earnLineHeight={110}
            spendLineHeight={76}
            MonthName={"Mar"}
          />
          <GraphLine
            earnLineHeight={135}
            spendLineHeight={85}
            MonthName={"Apr"}
          />
          <GraphLine
            earnLineHeight={55}
            spendLineHeight={34}
            MonthName={"May"}
          />
          <GraphLine
            earnLineHeight={90}
            spendLineHeight={76}
            MonthName={"Jun"}
          />
          <GraphLine
            earnLineHeight={130}
            spendLineHeight={80}
            MonthName={"Jul"}
          />
          <GraphLine
            earnLineHeight={120}
            spendLineHeight={67}
            MonthName={"Aug"}
          />
          <GraphLine
            earnLineHeight={100}
            spendLineHeight={50}
            MonthName={"Sep"}
          />
          <GraphLine
            earnLineHeight={140}
            spendLineHeight={90}
            MonthName={"Oct"}
          />
          <GraphLine
            earnLineHeight={100}
            spendLineHeight={50}
            MonthName={"Nov"}
          />
          <GraphLine
            earnLineHeight={100}
            spendLineHeight={50}
            MonthName={"Dec"}
          />
        </View>
      </ScrollView>
    </>
  );
}

const GraphCard = () => {

    const [activeBtn, setActiveBtn] = useState(1);

    const handleToggle = (btnNumber) => {
        setActiveBtn(btnNumber);
      };

    const yAxisLabels = [100, 80, 60, 40, 20, 0];

  return (
    <View style={styles.GraphCard}>
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
      <DottedBar bottom={250} />
      <DottedBar bottom={220} />
      <DottedBar bottom={190} />
      <DottedBar bottom={160} />
      <DottedBar bottom={130} />
      <DottedBar bottom={100} />
      { activeBtn === 1 ? <WeekMode /> : <MonthMode />}
      {/* Y-axis labels */}
      <View style={{ position: 'absolute', left: 0, top: 42, alignItems: 'left', alignContent: 'left' }}>
        {yAxisLabels.map((label, index) => (
          <Text key={index} style={{marginBottom: 12, marginLeft: 5}}>{label}</Text>
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          marginBottom: 30,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 12,
            backgroundColor: "turquoise",
            marginRight: 10,
          }}
        />
        <Text
          style={{
            marginRight: 20,
            fontSize: 12,
          }}
        >
          Saved
        </Text>
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 12,
            backgroundColor: "purple",
            marginRight: 10,
          }}
        />
        <Text
          style={{
            marginRight: 20,
            fontSize: 12,
          }}
        >
          Spent
        </Text>
      </View>
    </View>
  );
};

const GraphLine = (props) => {
  const { earnLineHeight, spendLineHeight, MonthName } = props;

  var yAxisLabels = [0, 20, 40, 60, 80, 100, 120, 140];

  return (
    <View style={styles.GraphLine}>
      <View style={[styles.EarnLine, { height: earnLineHeight }]}>
        <View style={[styles.SpendLine, { height: spendLineHeight }]}></View>
      </View>

      <Text style={styles.MonthName}>{props.MonthName}</Text>
    </View>
  );
};



const DashboardScreen = () => {
  return (
    <View style={styles.Stat}>
        <Text style={headerStyles.welcomeTitle}>
        Welcome to
      </Text>
      <Text style={headerStyles.spendWiseTitle}>
        SpendWise!
      </Text>
      <View style={headerStyles.borderStyle} />
      <View style={styles.TopBar}>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:10,borderRadius:20,marginBottom:-100}}>
      <GraphCard />
      </ScrollView>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:20, marginLeft: 5, marginRight: 5, borderRadius:20,}}>
      <LineComponent />
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  Stat: {
    flex: 1,
    backgroundColor: "#fff",
  },
  TopBar: {
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  GraphCard: {
    width: "100%",
    height: 300,
    backgroundColor: "#fff",
    marginTop: 20,
    borderRadius: 20,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 3},    
  },
  ToggleBar: {
    width: 100,
    alignSelf: "center",
    height: 50,
    backgroundColor: "#fff",
    marginTop: -20,
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
  },
  GraphLine: {
    height: 200,
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 13,
    paddingBottom: 25,
  },
  EarnLine: {
    backgroundColor: "turquoise",
    width: 9,
    borderRadius: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
  },
  SpendLine: {
    backgroundColor: "purple",
    width: 9,
    borderRadius: 10,
  },
  MonthName: {
    fontSize: 12,
    color: "#404040",
  }
});