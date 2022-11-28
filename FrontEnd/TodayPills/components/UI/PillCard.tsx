import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { accent, primary, secondary } from "../../constants/Colors";
import { IBackground } from "../../types";

export default function PillCard({
  children,
  height,
  width,
  bgColor,
}: IBackground) {
  return (
    <View
      style={[styles.container, { width, height, backgroundColor: bgColor }]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",

    // backgroundColor: "#edfbf9",
    // backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
    borderWidth: 1,
    borderColor: "#edfbf9",
    elevation: 4,
    // height: 75,
    // marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
});
