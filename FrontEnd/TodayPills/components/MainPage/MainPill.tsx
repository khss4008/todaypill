import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import {
  fetchAllSupplements,
  fetchPopularSupplements,
} from "../../API/supplementAPI";
import SimplePillCard from "../Cards/SimplePillCard";
import PillItem from "../Pills/PillItem";

const MainPill = ({ navigation }: any) => {
  const [userId, setUserId] = useState(0);
  const [mainPills, setMainPills] = useState([]);
  const [likeChanged, setLikeChanged] = useState(false);

  const getPopularSupplements = async () => {
    const currentUserId = await AsyncStorage.getItem("@storage_UserId");
    setUserId(parseInt(currentUserId));
    const popularSupplements = await fetchPopularSupplements();
    // console.log(PopularSupplements);
    setMainPills(popularSupplements);
    // const userId = await AsyncStorage.getItem("@storage_UserId");
  };

  const likeChangeHandler = () => {
    setLikeChanged((likedOrNot) => !likedOrNot);
  };

  useFocusEffect(
    useCallback(() => {
      getPopularSupplements();
      // return () => {
      // };
    }, [userId, likeChanged])
  );

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        {/* <Image
          source={require("../../assets/images/hot.png")}
          style={styles.heart}
        /> */}
        <Text
          style={{
            ...styles.text,
            fontFamily: "웰컴체_Bold",
            letterSpacing: 0.5,
          }}
        >
          실시간 인기 영양제
        </Text>
      </View>

      <View style={styles.outerContainer}>
        <ScrollView
          style={styles.cardsContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {mainPills.map((pill, idx) => (
            <PillItem
              key={pill.supplementId}
              userId={userId}
              pillId={pill.supplementId}
              image={pill.image}
              brand={pill.brand}
              pill={pill.supplementName}
              // onPressDislike={() => console.log("좋아요취소")}
              onPressChange={likeChangeHandler}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  heart: {
    width: 34,
    height: 34,
  },
  text: {
    fontSize: 20,

    // fontWeight: "bold",
    marginLeft: 5,
  },

  outerContainer: {
    marginHorizontal: 5,

    marginVertical: 5,
    // overflow: "hidden",
  },

  cardsContainer: {
    flexDirection: "row",
    // justifyContent: "space-around",
    minHeight: 100,
    paddingVertical: 10,
    marginTop: 10,
    paddingHorizontal: 5,
    // backgroundColor: "#ECF6F4",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ECF6F4",
    elevation: 5,
  },
});

export default MainPill;
