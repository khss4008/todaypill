import {
  StyleSheet,
  View,
  Image,
  ToastAndroid,
  FlatList,
} from "react-native";
import BackgroundScreen2 from "../BackgroundScreen2";
import Card from "../../components/UI/Card";
import SearchBar from "../../components/TopBar/SearchBar";
import DetailedPillCard from "../../components/Cards/DetailedPillCard";
import { useState, useCallback } from "react";
import { fetchAllSupplements } from "../../API/supplementAPI";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoBackBtn from "../../components/UI/GoBackBtn";

export default function SearchScreen({ navigation, route }: any) {
  //searchResults: 검색어를 이름에 포함하는 영양제 배열
  const [searchResults, setSearchResults] = useState([]);
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [failedSearch, setFailedSearch] = useState(false);
  const filterSupplements = async (word) => {
    setIsLoading(true);
    if (word) {
      const supplements = await fetchAllSupplements();
      const filteredSupplements = supplements.filter((supplement) =>
        supplement.supplementName.toLowerCase().includes(word.toLowerCase())
      );
      if (filteredSupplements.length > 0) {
        setFailedSearch(false);
        await setSearchResults(filteredSupplements);
        await setIsLoading(false);
        ToastAndroid.show(`${filteredSupplements.length}건이 검색됐습니다.`, 3);
      } else {
        setFailedSearch(true);
        setSearchResults(filteredSupplements);
        setIsLoading(false);
        ToastAndroid.show("검색에 실패했습니다.", 3);
      }
    } else {
      setFailedSearch(false);
      setIsLoading(false);
    }
  };
  const getUserId = async () => {
    const currentUserId = await AsyncStorage.getItem("@storage_UserId");
    setUserId(parseInt(currentUserId));
  };
  useFocusEffect(
    useCallback(() => {
      getUserId();
      filterSupplements(route.params.word);
    }, [route.params.word])
  );

  return (
    <BackgroundScreen2>
      <Card>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.backBtn}>
              <GoBackBtn onPress={() => navigation.pop()} size={36} />
            </View>
            <SearchBar
              navigation={navigation}
              word={route.params.word}
              isMain={route.params.isMain}
            />
          </View>
          {isLoading ? (
            <View style={styles.loadingspinnercontainer}>
              <Image
                source={require("../../assets/images/loadingspinner.gif")}
                style={styles.loadingspinner}
              />
            </View>
          ) : failedSearch ? (
            <View style={styles.imagecontainer}>
              <Image
                source={require("../../assets/images/noResult.png")}
                style={styles.image}
              />
            </View>
          ) : (
            <FlatList
              data={searchResults}
              renderItem={({ item }) => {
                return (
                  <DetailedPillCard
                    key={item.supplementId}
                    userId={userId}
                    supplementId={item.supplementId}
                    image={item.image}
                    brand={item.brand}
                    supplementName={item.supplementName}
                    like={item.like}
                    note={item.note}
                    additionalEfficacy={item.additionalEfficacy}
                    ingredients={item.ingredients}
                    caution={item.caution}
                    isMain={route.params.isMain}
                    navigation={navigation}
                  />
                );
              }}
            />
          )}
        </View>
      </Card>
    </BackgroundScreen2>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    // paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    // marginRight: 10,
  },
  paginationcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  currentpage: {
    fontSize: 18,
    fontWeight: "bold",
    width: 25,
    height: 25,
    borderRadius: 5,
    textAlign: "center",
    backgroundColor: "#D2ECFA",
  },
  otherpage: {
    fontSize: 15,
    width: 20,
    height: 20,
    borderRadius: 5,
    textAlign: "center",
    backgroundColor: "#FBE7F0",
  },
  emptypage: {
    width: 20,
    height: 20,
  },
  loadingspinnercontainer: {
    width: "100%",
    // height: 500,
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingspinner: {
    width: 200,
    height: 200,
  },
  imagecontainer: {
    width: "100%",
    height: "90%",
    alignItems: "center",
  },
  image: {
    width: "140%",
    height: "100%",
    resizeMode: "contain",
  },
});
