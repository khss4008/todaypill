import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import BackgroundScreen from "../BackgroundScreen";
import Card from "../../components/UI/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAllSupplements } from "../../API/supplementAPI";
import PillItem from "../../components/Pills/PillItem";

export default function AllSupplementsScreen({ navigation, route }: any) {
  const [allPills, setAllPills] = useState([]);
  const [userId, setUserId] = useState(0);

  const getMyInfo = async () => {
    const userId = await AsyncStorage.getItem("@storage_UserId");
    // const myInfo: IUserInfo = await getUserInfoByEmail(myEmail);
    // setMyInfo(myInfo)
  };
  const getAllSupplements = async () => {
    const currentUserId = await AsyncStorage.getItem("@storage_UserId");
    setUserId(parseInt(currentUserId));
    const allSupplements = await fetchAllSupplements();
    setAllPills(allSupplements.slice(1, 50));
    // const userId = await AsyncStorage.getItem("@storage_UserId");
  };

  useEffect(() => {
    getAllSupplements();
  }, []);

  return (
    <BackgroundScreen>
      <Card>
        <View style={styles.container}>
          <View style={styles.likeContainer}>
            <View style={styles.myPickContainer}>
              <View style={styles.heartContainer}>
                <Image
                  // source={require("../../assets/images/hearton.png")}
                  source={require("../../assets/images/likeIcon.png")}
                  style={styles.heart}
                />
              </View>
              <Text style={styles.name}>모든영양제</Text>
            </View>

            <View style={styles.outerContainer}>
              <ScrollView style={styles.cardsContainer} horizontal={true}>
                {allPills.map((pill, idx) => (
                  <PillItem
                    key={pill.supplementId}
                    userId={userId}
                    pillId={pill.supplementId}
                    // image={
                    //   "https://cdn.pillyze.io/products/v1/10k/f7ac75f0-10992/1000"
                    // }
                    image={pill.image}
                    brand={pill.brand}
                    pill={pill.supplementName}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </Card>
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  height: {
    height: 25,
  },

  likeContainer: {
    marginVertical: 10,
    // // flex: 2,
    // width: "100%",
    // // height: "30%",
    // height: 150,
    // alignItems: "center",
    // justifyContent: "center",
  },

  myPickContainer: {
    flexDirection: "row",
  },
  heartContainer: {
    // width: 50,
    // height: 50,
    // paddingBottom: 10,
    // marginBottom: 5,
    // position: "absolute",
    // bottom: 0,
    // right: -5,
  },
  heart: {
    width: 45,
    height: 45,
    // paddingBottom: 20,
    // width: "100%",
    // height: "100%",
    // resizeMode: "contain",
  },
  name: {
    fontSize: 24,
    fontWeight: "900",
    marginTop: 5,
  },
  outerContainer: {
    marginHorizontal: 5,

    marginVertical: 5,
    // overflow: "hidden",
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 10,
  },
  cardsContainer: {
    flexDirection: "row",
    // justifyContent: "space-around",
    paddingVertical: 10,
    marginTop: 10,
    paddingHorizontal: 5,
    backgroundColor: "#ECF6F4",
    borderRadius: 10,
    elevation: 5,
  },
});
