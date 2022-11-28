import { StyleSheet, View } from "react-native";
import { IBackground } from "../../types";

export default function Card({ children }: IBackground) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // borderWidth: 2,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
