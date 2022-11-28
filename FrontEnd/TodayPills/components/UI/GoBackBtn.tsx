import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// import { IBackground } from "../../types";

export default function GoBackBtn(props: any) {
  return (
    <View style={styles.container}>
      <Pressable onPress={props.onPress}>
        {/* <Ionicons
          name="arrow-back-circle-outline"
          size={props.size}
          color="gray"
        /> */}
        <Ionicons name="chevron-back" size={props.size} color="gray" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // buttonOuterContainer: {
  //   flex: 1,
  //   borderRadius: 30,
  //   margin: 4,
  //   overflow: "hidden",
  //   marginVertical: 10,
  //   elevation: 5,
  // },
  // buttonInnerContainer: {
  //   paddingVertical: 10,
  // },
});
