import { Button, StyleSheet, Text, View, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundScreen from "../BackgroundScreen";
import { useState } from "react";
import CustomBtn from "../../components/UI/CustomBtn";
import BackgroundScreen2 from "../BackgroundScreen2";
import { boldWelcome } from "../../components/Data/fontFamilyObject";
import BackgroundStartScreen from "../BackgroundStartScreen";

const StartScreen = ({ navigation }: any) => {
  const [clikedStart, setClickedStart] = useState(false);
  return (
    <BackgroundStartScreen>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          {/* <Text style={{ ...styles.subTitle, ...boldWelcome }}>
            내게 맞는 영양제 추천
          </Text> */}
          {/* <View style={styles.mainTitle}>
            <Text style={{ ...styles.text1, ...boldWelcome }}>오늘의 </Text>
            <Text style={{ ...styles.text2, ...boldWelcome }}>영양제</Text>
          </View> */}
        </View>
        <View style={styles.btnGroup}>
          <View style={[styles.buttonOuterContainer, { width: "200%" }]}>
            <Pressable
              android_ripple={{ color: "#4E736F" }}
              style={[
                styles.buttonInnerContainer,
                { backgroundColor: "#F7D5E0"},
              ]}
              onPress={async () => {
                navigation.replace("KakaoScreen");
              }}
            >
              <Text
                style={{
                  ...styles.title,
                  color: "#595959",
                  fontSize: 20,
                  letterSpacing: 2,
                  fontFamily: "웰컴체_Bold"
                }}
              >
                카카오 로그인
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </BackgroundStartScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    marginLeft: 30,
  },
  subTitle: {
    fontSize: 30,
  },
  mainTitle: {
    flexDirection: "row",
    paddingRight: 70,
    marginTop: 10,
  },
  text1: {
    fontSize: 50,

    // fontWeight: "bold",
    color: "#E2C3DC",
  },
  text2: {
    fontSize: 50,
    // fontWeight: "bold",
    color: "#C4F1EA",
  },
  btnGroup: { position: "absolute", bottom: 30, alignItems: "center" },
  buttonOuterContainer: {
    flex: 1,
    borderRadius: 30,

    margin: 4,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 5,
  },
  buttonInnerContainer: {
    paddingVertical: 10,
  },
  title: {
    textAlign: "center",
  },
});
export default StartScreen;
