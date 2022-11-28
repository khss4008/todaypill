import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, ImageBackground, View, Text, Image } from "react-native";
import Card from "../components/UI/Card";
import { primary, secondary } from "../constants/Colors";

// import EditScreenInfo from "../components/EditScreenInfo";
// import { Text, View } from "../components/Themed";

import { IBackground, RootTabScreenProps } from "../types";

export default function BackgroundStartScreen({ children }: IBackground) {
  return (
    // <LinearGradient
    //   colors={[primary, secondary]}
    //   // colors={["#E2C3DC", "#CEEAE6"]}
    //   // start={{ x: 0.0, y: 0.25 }}
    //   // end={{ x: 0.5, y: 1.0 }}
    //   // locations={[0, 0.5, 0.6]}
    //   style={styles.rootScreen}
    // >
    <ImageBackground
      source={require("../assets/images/backgroundStart.png")}
      resizeMode="cover"
      style={styles.rootScreen}
      imageStyle={styles.backgroundImage}
    >
      {/* <Card> */}
      <View style={styles.children}>{children}</View>
      {/* </Card> */}
    </ImageBackground>
    // </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // title: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: "80%",
  // },
  rootScreen: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundImage: {
    opacity: 1,
  },
  logoContainer: {
    // flex: 1,
    height: "20%",
    paddingTop: 70,
    paddingHorizontal: 30,
  },
  imageContainer: {
    width: 220,
    height: 60,
    // borderRadius: 150,
    // borderWidth: 3,
    // borderColor: Colors.primary800,
    // overflow: "hidden",
    // margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  children: {
    flex: 4,
  },
  logoColor1: {
    color: "#FF78A3",
    fontSize: 30,
    fontWeight: "bold",
  },
  logoColor2: {
    color: "#C4F1EA",
  },
});
