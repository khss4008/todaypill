import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import BackgroundScreen from "../BackgroundScreen";
import BackgroundScreen2 from "../BackgroundScreen2";

const LoginSuccessScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const getMyName = async () => {
    const nowName = await AsyncStorage.getItem("@storage_UserNickName");
    setName(nowName);
  };
  useEffect(() => {
    getMyName();
  }, []);
  return (
    <BackgroundScreen2>
      <View style={styles.container}>
        <View style={styles.imagecontainer}>
          <Image
            style={styles.image}
            source={require("../../assets/images/hello.png")}
          />
        </View>
        <View style={styles.textcontainer}>
          {/* <Text style={[styles.text, styles.greetingtext, styles.blacktext]}>
            반가워요!
          </Text>
          <View style={styles.flexrow}>
            <Text style={[styles.text, styles.nametext, styles.whitetext]}>
              {name}&nbsp;
            </Text>
            <Text style={[styles.text, styles.nametext, styles.blacktext]}>
              님
            </Text>
          </View> */}
          <Text style={{...styles.blacktext, fontFamily: "웰컴체_Bold", fontSize: 26, alignSelf: "center", width: "80%", marginBottom: 5}}>
            반가워요! <Text style={{color: "#a2a3f5"}}>{name}</Text> 님
          </Text>
          <Text style={{...styles.blacktext, fontFamily: "웰컴체_Regular", fontSize: 18, alignSelf: "center", width: "80%"}}>
            <Text style={{color: "#a2a3f5"}}>{name}</Text>님에게 가장 적합한 영양제를 추천해 드리기 위해서 건강검진 내역을 불러오려고 해요.
          </Text>
          <Text style={{...styles.blacktext, fontFamily: "웰컴체_Regular", fontSize: 18, alignSelf: "center", width: "80%", marginBottom: 5}}>
            만약 최근 10년 내에 국가 건강검진을 실시한 적이 한 번도 없으시다면 설문조사를 기반으로 적합한 영양제를 추천해 드릴게요.
          </Text>
        </View>
        <View style={styles.buttoncontainer}>
          <View style={styles.buttonOuterContainer}>
            <Pressable
              android_ripple={{ color: '#4E736F' }}
              style={styles.buttonInnerContainer}
              onPress={() => navigation.navigate("GenderCheckScreen")}
            >
              <Text style={styles.title}>다음</Text>
            </Pressable>
          </View>
        </View>
        {/* <View style={styles.buttonOuterContainer}>
          <Pressable
            android_ripple={{ color: "#4E736F" }}
            style={styles.buttonInnerContainer}
            onPress={() => navigation.navigate("GenderCheckScreen")}
          >
            <Text style={styles.title}>다음</Text>
          </Pressable>
        </View> */}
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
  imagecontainer: {
    width: 350,
    height: 350,
    marginVertical: -20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    marginTop: 20,
  },
  textcontainer: {
    alignItems: "center",
    width: "100%",
    // justifyContent: "center",
  },
  text: {
    // fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  greetingtext: {
    fontSize: 30,
    marginBottom: 10,
  },
  nametext: {
    fontSize: 40,
  },
  blacktext: {
    color: "black",
  },
  whitetext: {
    color: "#a2a3f5",
  },
  flexrow: {
    flexDirection: "row",
  },
  // buttonOuterContainer: {
  //   borderRadius: 20,
  //   width: "80%",
  //   overflow: "hidden",
  //   marginVertical: 10,
  //   elevation: 10,
  // },
  // buttonInnerContainer: {
  //   paddingVertical: 7,
  //   backgroundColor: "#E881B1",
  // },
  // title: {
  //   fontSize: 22,
  //   fontFamily: "웰컴체_Regular",
  //   textAlign: "center",
  //   color: "white",
  // },
  buttoncontainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonOuterContainer: {
    borderRadius: 10,
    width: '80%',
    // height: 50,
    overflow: 'hidden',
    marginVertical: 10,
    elevation: 10,
  },
  buttonInnerContainer: {
    paddingVertical: 10,
    backgroundColor: '#E881B1',
  },
  title: {
    fontSize: 22,
    fontFamily: "웰컴체_Regular",
    textAlign: 'center',
    color: 'white',
  },
});

export default LoginSuccessScreen;
