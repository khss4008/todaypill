import { ScrollView, StyleSheet, View } from "react-native";
import BackgroundScreen2 from "../BackgroundScreen2";
import Card from "../../components/UI/Card";
import SearchBar from "../../components/TopBar/SearchBar";
import MainPill from "../../components/MainPage/MainPill";
import MainNutrient from "../../components/MainPage/MainNutrient";

export default function HomeScreen({ navigation }: any) {
  return (
    <BackgroundScreen2>
      <Card>
        <View style={styles.container}>
          <SearchBar navigation={navigation} word={""} isMain={true} />
          <ScrollView>
            <MainPill navigation={navigation} />
            <MainNutrient navigation={navigation} />
          </ScrollView>
        </View>
      </Card>
    </BackgroundScreen2>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttoncontainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
});
