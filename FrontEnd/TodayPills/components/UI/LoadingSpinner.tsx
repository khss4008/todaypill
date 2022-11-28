import { StyleSheet, View, ActivityIndicator } from "react-native";
import { accent } from "../../constants/Colors";
import BackgroundScreen from "../../screens/BackgroundScreen";
import BackgroundScreen2 from "../../screens/BackgroundScreen2";
import { IBackground } from "../../types";

export default function LoadingSpinner() {
  return (
    <BackgroundScreen2>
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={accent} />
      </View>
    </BackgroundScreen2>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,

    // backgroundColor: "white",
  },
});
