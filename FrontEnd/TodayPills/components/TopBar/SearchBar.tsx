import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState, useCallback } from "react";
import { regularWelcome } from "../Data/fontFamilyObject";
import { primary } from "../../constants/Colors";
import { useFocusEffect } from "@react-navigation/native";

const SearchBar = ({ navigation, word, isMain }: any) => {
  const [keyword, setKeyword] = useState(word);
  const textinput = useRef();
  const Search = () => {
    if (keyword) {
      const realKeyword = keyword.trim();
      if (isMain) {
        navigation.navigate("SearchScreen", {
          word: realKeyword,
          isMain: true,
        });
      } else {
        navigation.navigate("Search", { word: realKeyword, isMain: false });
      }
    } else {
      Alert.alert("", "검색어를 입력하세요.", [
        {
          text: "확인",
        },
      ]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setKeyword(word);
    }, [])
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={{ ...styles.textinput, ...regularWelcome, letterSpacing: 1 }}
        placeholder="어떤 영양제를 찾으세요?"
        onChangeText={(word) => setKeyword(word)}
        onSubmitEditing={() => Search()}
        value={keyword}
        returnKeyType="search"
        ref={textinput}
      />
      <View style={styles.btns}>
        {keyword ? (
          <Feather
            name="x"
            size={24}
            style={styles.clearicon}
            onPress={() => {
              setKeyword("");
              textinput.current.clear();
            }}
          />
        ) : null}
        <Ionicons
          name="search"
          size={28}
          style={styles.searchicon}
          onPress={() => {
            Search();
            Keyboard.dismiss();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "88%",
    // flex: 1,
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 15,

    flexDirection: "row",

    // position: "relative",
    borderWidth: 2,
    borderRadius: 40,
    borderColor: primary,
    backgroundColor: "white",
    elevation: 10,
    alignSelf: "center",
  },
  textinput: {
    height: 36,
    fontSize: 15,

    width: "70%",
  },
  btns: {
    flexDirection: "row",
    alignItems: "center",
  },
  clearicon: {
    color: "#B7B7B7",
    marginHorizontal: 3,
    // position: "absolute",
    // right: 70,
  },
  searchicon: {
    // position: "absolute",
    // right: 40,
    color: "#E2C3DC",
  },
});

export default SearchBar;
