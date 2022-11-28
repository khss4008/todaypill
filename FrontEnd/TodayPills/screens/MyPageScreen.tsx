import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Pressable,
  ImageBackground,
  View,
  Text,
  Button,
  ScrollView,
  Image,
} from "react-native";

import { getUserInfoByEmail, kakaoLogout } from "../API/userAPI";

import MyPickPills from "../components/MyPage/MyPickPills";
import RecomNutritions from "../components/MyPage/Recommendations/RecomNutritions";
import UpdateNickname from "../components/MyPage/UpdateNickname";
import Card from "../components/UI/Card";
import CustomBtn from "../components/UI/CustomBtn";
import CustomModal from "../components/UI/CustomModal";
import { accent, primary, secondary } from "../constants/Colors";

import { IUserInfo, RootTabScreenProps } from "../types";
import BackgroundScreen2 from "./BackgroundScreen2";
import {
  boldWelcome,
  regularWelcome,
} from "../components/Data/fontFamilyObject";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function MyPageScreen({ navigation }: any) {
  // RootTabScreenProps<"MyPage">
  const [myName, setMyName] = useState("");
  const [isChangeName, setIsChangeName] = useState(false);
  // const [MyInfo, setMyInfo] = useState<IUserInfo>({});
  const [myInfo, setMyInfo] = useState<any>({});

  const getMyName = async () => {
    const name = await AsyncStorage.getItem("@storage_UserNickName");
    setMyName(name);
  };

  const getMyInfo = async () => {
    const myEmail = await AsyncStorage.getItem("@storage_UserEmail");
    const myInfo: IUserInfo = await getUserInfoByEmail(myEmail);
    setMyInfo(myInfo);
  };
  const goMyPillsHandler = () => {
    navigation.navigate("MyPills", { userId: 1 });
  };
  useEffect(() => {
    getMyName();
    getMyInfo();
    setIsChangeName(false);
    // getMyNowNutrient();
  }, [isChangeName]);
  return (
    <BackgroundScreen2>
      <Card>
        <ScrollView style={styles.scrollView}>
          <View style={styles.myInfoContainer}>
            <View style={styles.nameContainer}>
              <Text style={{ fontSize: 27, ...boldWelcome }}>
                {myName}&nbsp;
                <Text style={{ fontSize: 23, ...regularWelcome }}>님</Text>
              </Text>

              <UpdateNickname onChangeName={setIsChangeName} />
            </View>

            <View style={styles.ageContainer}>
              <Text style={{ ...styles.age, ...regularWelcome }}>
                {myInfo.age}대
              </Text>

              <Text style={{ ...styles.age, ...regularWelcome }}>
                {myInfo.gender}
              </Text>
            </View>
          </View>
          <View style={styles.nutrBtnContainer}>
            <View style={styles.nutrBtn}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <FontAwesome5 name="pills" size={24} color="#B7B7B7" /> */}
                {/* <Feather name="check" size={24} color="black" /> */}
                <Text style={{ ...styles.nutrBtnText, ...regularWelcome }}>
                  나의 영양제
                </Text>
              </View>
              <Pressable onPress={goMyPillsHandler}>
                <AntDesign
                  name="right"
                  size={23}
                  color="#B7B7B7"
                  style={{ marginBottom: 3, marginLeft: 3 }}
                />
              </Pressable>
            </View>
          </View>
          {/* <View style={styles.nutrBtnContainer}>
            <View style={styles.nutrBtn}>
              <CustomBtn
                buttonColor={accent}
                title={"내가 섭취중인 영양제"}
                fontSize={20}
                titleColor={"#fff"}
                buttonWidth={"70%"}
                onPress={goMyPillsHandler}
              />
            </View>
          </View> */}

          <View style={styles.myLikeContainer}>
            <MyPickPills
              navigation={navigation}
            />
          </View>
          <View style={styles.nutrisContainer}>
            <RecomNutritions navigation={navigation} />
          </View>
          <View style={styles.btnContainer}>
            {/* <CustomBtn
              buttonColor={accent}
              title={"영양성분 다시 추천 받기!"}
              fontSize={20}
              titleColor={"#fff"}
              buttonWidth={"85%"}
              onPress={() => {
                navigation.replace("HealthScreeningCheckScreen");
              }}
            /> */}
            <Pressable
              onPress={async () => {
                await AsyncStorage.removeItem("@storage_UserId");
                await AsyncStorage.removeItem("@storage_UserNickName");
                await AsyncStorage.removeItem("@storage_UserEmail");
                await AsyncStorage.removeItem("@storage_nowNutrient");
                await AsyncStorage.removeItem("@storage_userName");
                await AsyncStorage.removeItem("@storage_userBirth");
                await AsyncStorage.removeItem("@storage_userPhone");
                const token = await AsyncStorage.getItem(
                  "@storage_ACCESS_TOKEN"
                );
                // kakaoLogout(token);
                // await axios.post(
                //   "https://kapi.kakao.com/v1/user/logout",
                //   {},
                //   {
                //     headers: {
                //       "Content-Type": "application/x-www-form-urlencoded",
                //       Authorization: `Bearer ${token}`,
                //     },
                //   }
                // );
                await AsyncStorage.removeItem("@storage_ACCESS_TOKEN");

                navigation.replace("Start");
              }}
            >
              <Text
                style={{
                  ...styles.logout,
                  ...regularWelcome,
                  letterSpacing: 1,
                }}
              >
                로그아웃
              </Text>
            </Pressable>
          </View>
        </ScrollView>
        {/* <View
            style={styles.separator}
            darkColor="rgba(255,255,255,0.1)"
            lightColor="#eee"
          /> */}
        {/* <EditScreenInfo path="/screens/HomeScreen.tsx" /> */}
      </Card>
    </BackgroundScreen2>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginTop: 30,
    // backgroundColor: "red",
    // alignItems: "center",
    // justifyContent: "center",
    // marginTop: 10,
    // padding: 20,
  },

  myInfoContainer: {
    // flex: 1,
    width: "100%",
    height: 70,
    // marginTop: 10,
    // backgroundColor: "yellow",
    // height: 600,
    // borderTopWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 10,
    padding: 20,
  },
  nameContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    // padding: 10,
  },
  ageContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 8,

    // padding: 10,
  },
  nutrBtnContainer: {
    width: "100%",
    marginTop: 5,
    // alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
    paddingHorizontal: 10,
  },
  nutrBtn: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: "90%",
    // borderTopWidth: 2,
    // borderTopColor: "#B7B7B7",
    // alignItems: "center",
    // justifyContent: "center",
  },
  nutrBtnText: {
    marginLeft: 7,
    fontSize: 20,
    letterSpacing: 0.5,
  },
  myLikeContainer: {
    // flex: 2,
    width: "100%",
    // height: "30%",
    minHeight: 200,

    paddingVertical: 10,
    paddingHorizontal: 20,
    // alignItems: "center",
    // justifyContent: "center",
  },
  nutrisContainer: {
    // flex: 5,
    // flexDirection: "column",
    width: "100%",
    minHeight: 120,
    // alignItems: "center",
    // justifyContent: "center",
  },
  btnContainer: {
    // flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  pillIcon: {
    width: 27,
    height: 35,
  },

  name: {
    fontSize: 24,
    fontWeight: "900",
  },

  age: {
    fontSize: 15,

    color: "#B7B7B7",
    // color: primary,
    marginLeft: 5,
  },
  // gender: {
  //   fontSize: 15,
  //   color: accent,
  //   marginLeft: 5,
  // },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
  logout: {
    fontSize: 13,
    // fontWeight: "bold",
    marginVertical: 13,
    color: "#FF78A3",
  },
});
