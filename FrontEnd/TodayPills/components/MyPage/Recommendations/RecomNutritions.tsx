import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useCallback } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Button,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { getUserInfoByEmail } from "../../../API/userAPI";
import { boldWelcome, regularWelcome } from "../../Data/fontFamilyObject";
import PillItem, { PillProps } from "../../Pills/PillItem";
import RecomItem from "./RecomItem";

export default function RecomNutritions({ navigation }: any) {
  const [myNutritions, setMyNutritions] = useState([]);
  const [userId, setUserId] = useState(0);
  const getRecomNut = async () => {
    // const currentUserId = await AsyncStorage.getItem("@storage_UserId");
    // setUserId(parseInt(currentUserId));
    const myEmail = await AsyncStorage.getItem("@storage_UserEmail");
    const userInfo = await getUserInfoByEmail(myEmail);
    setMyNutritions(userInfo.recommendNutrients);
    // setMyNutritions(myNutrients);
  };
  // const [pickedPills, setPickedPills] = useState([]);
  useFocusEffect(
    useCallback(() => {
      getRecomNut();

      // return () => {

      // };
    }, [userId])
  );
  return (
    <View style={styles.likeContainer}>
      <View style={styles.myPickContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            // source={require("../../assets/images/hearton.png")}
            source={require("../../../assets/images/likeIcon.png")}
            style={styles.pill}
          />

          <Text style={{ ...styles.name, ...boldWelcome }}>추천 영양성분</Text>
        </View>
        <Pressable
          onPress={() => {
            navigation.replace("HealthScreeningCheckScreen");
          }}
          style={{ marginTop: 3 }}
        >
          {({ pressed }) => (
            <Text
              style={{
                fontSize: 18,
                color: pressed ? "black" : "#B7B7B7",
                ...regularWelcome,
                letterSpacing: 0.5,
              }}
            >
              재추천받기
            </Text>
          )}
        </Pressable>
      </View>

      <View>
        <View style={styles.cardscontainer}>
          {myNutritions.map((nut, idx) => (
            <RecomItem nutName={nut} key={idx} id={idx} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  likeContainer: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  name: {
    fontSize: 24,
    // fontWeight: "900",
    marginTop: 5,
  },
  myPickContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  pill: {
    width: 45,
    height: 45,
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 10,
  },
  cardscontainer: {
    padding: 10,
    marginTop: 10,
  },
  outerContainer: {
    backgroundColor: "rgba(226, 195, 220, 0.26)",
  },
  nutContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    // elevation: 10,
    borderRadius: 20,
  },
  nutrition: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
