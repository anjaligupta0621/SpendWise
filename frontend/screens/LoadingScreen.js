import { ActivityIndicator} from 'react-native';
import { StyleSheet } from 'react-native';

export default function LoginScreen() {
  return (
    <>
      <ActivityIndicator size="large" color="purple"/>
    </>
  );
}

// const styles = StyleSheet.create({
//     loading: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center"
//     }
//   })