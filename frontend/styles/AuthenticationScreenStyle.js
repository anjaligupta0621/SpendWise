import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    welcomeTitle: {
        fontSize: 30,
        marginLeft: 18,
        marginTop: 60,
        color: 'grey'
    },
    spendWiseTitle: {
        fontSize: 35,
        marginLeft: 18,
        color: 'purple'
      },
    borderStyle: {
        borderBottomColor: "purple",
        borderBottomWidth: 4,
        borderRadius: 10,
        marginLeft: 16,
        marginRight: 260,
        marginTop: 10
      },
    subtitleStyle: {
        fontSize: 20,
        marginLeft: 18,
        marginTop: 20,
        fontWeight: "bold",
      },
    inputFieldStyle: {
        marginLeft: 18,
        marginRight: 18,
        marginTop: 18,
      },
    buttonStyle: { 
        color: "white", 
        backgroundColor: "purple",
        borderRadius: 5,
        marginLeft: 18,
        marginRight: 18,
        marginTop: 18,
        },
    lastTitle: {
        fontSize: 16,
        marginLeft: 18,
        marginTop: 18,
        },
    container: {
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between',
    },
    inputFieldLeft: {
      flex: 1, 
      marginLeft: 18,
      marginRight: 6,
      marginTop: 18,
    },
    inputFieldRight: {
      flex: 1, 
      marginLeft: 8,
      marginRight: 18,
      marginTop: 18,
    }

})
// .welcomeTitle {
//     font-size: 30;
//     margin-left: 18;
//     margin-top: 60;
//     color: 'grey'; 
// }