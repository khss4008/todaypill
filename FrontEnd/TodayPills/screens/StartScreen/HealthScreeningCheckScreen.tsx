import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import BackgroundScreen2 from "../BackgroundScreen2";

const HealthScreeningCheckScreen = ({ navigation }: any) => {
  return (
    <BackgroundScreen2>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/exam-intro.png")}
          style={styles.image}
        />
        <View style={styles.textcontainer}>
          <Text style={{...styles.greytext, fontFamily: "웰컴체_Bold"}}>건강 검진 결과를 기반으로 필요한</Text>
          {/* <Text style={{...styles.greytext, fontFamily: "웰컴체_Bold"}}></Text> */}
          <Text style={{...styles.greytext, fontFamily: "웰컴체_Bold"}}>영양 성분을 추천해드릴게요!</Text>
          {/* <Text style={{...styles.greytext, fontFamily: "웰컴체_Bold"}}></Text> */}
        </View>
        <View style={styles.questioncontainer}>
          <Text style={styles.whitetext}>
            건강 검진을 받으신 적이 있나요?
          </Text>
          <View style={styles.buttoncontainer}>
            <View style={styles.buttonOuterContainer}>
              <Pressable
                android_ripple={{ color: "#4E736F" }}
                style={[styles.buttonInnerContainer, styles.pinkbutton]}
                onPress={() =>
                  navigation.navigate("HealthScreeningDetailScreen")
                }
              >
                <Text style={styles.title}>네</Text>
              </Pressable>
            </View>
            <View style={styles.buttonOuterContainer}>
              <Pressable
                android_ripple={{ color: "#4E736F" }}
                style={[styles.buttonInnerContainer, styles.greybutton]}
                onPress={() => navigation.navigate("SurveyStartScreen")}
              >
                <Text style={styles.title}>아니요</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </BackgroundScreen2>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
    marginTop: -50,
  },
  textcontainer: {
    alignItems: "center",
    marginTop: -230,
  },
  greytext: {
    color: "black",
    fontSize: 25,
  },
  whitetext: {
    fontSize: 24,
    fontFamily: "웰컴체_Regular",
  },
  questioncontainer: {
    alignItems: "center",
    marginTop: -20,
  },
  buttoncontainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    // marginTop: 20,
  },
  buttonOuterContainer: {
    borderRadius: 25,
    width: "35%",
    overflow: "hidden",
    marginVertical: 10,
    elevation: 10,
  },
  buttonInnerContainer: {
    paddingVertical: 7,
  },
  pinkbutton: {
    backgroundColor: "#E881B1",
  },
  greybutton: {
    backgroundColor: "#B7B7B7",
  },
  title: {
    fontSize: 22,
    fontFamily: "웰컴체_Regular",
    textAlign: "center",
    color: "white",
  },
});

export default HealthScreeningCheckScreen;
