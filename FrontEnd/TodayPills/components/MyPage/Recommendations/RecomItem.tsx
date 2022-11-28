import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
  Button,
  ScrollView,
  Pressable,
} from "react-native";
import pillIcons from "../../Data/pillIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { boldWelcome } from "../../Data/fontFamilyObject";

export interface RecomItemProps {
  nutName: string;
  key: number;
  id: number;
}

export default function RecomItem({ nutName, id }: RecomItemProps) {
  // const [pickedPills, setPickedPills] = useState([]);
  const navigation = useNavigation<any>();
  return (
    <View style={styles.outerContainer}>
      <Pressable
        android_ripple={{ color: "#827880" }}
        style={styles.buttonInnerContainer}
        onPress={async () => {
          await AsyncStorage.setItem("@storage_nowNutrient", nutName);
          navigation.navigate("NutrientDetailScreen", {
            nutrient: [nutName],
          });
        }}
      >
        <View style={styles.nutContainer}>
          {/* <FontAwesome5 name="pills" size={22} color="#8EE8DE" /> */}
          <Image source={pillIcons[id]} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={{ ...styles.nutrition, ...boldWelcome }}>
              {nutName}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    height: 50,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 3,
    marginBottom: 15,
    justifyContent: "center",
    backgroundColor: "#FFEFFC",
  },
  buttonInnerContainer: {
    padding: 10,
  },
  nutContainer: {
    flexDirection: "row",
  },
  textContainer: {
    // flex: 1,

    justifyContent: "center",
  },
  nutrition: {
    fontSize: 15,
    // fontWeight: "bold",
    marginLeft: 10,
    // color: "white",
  },
  icon: {
    width: 40,
    height: 40,
  },
});
