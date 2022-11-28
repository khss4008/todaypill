import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { accent } from "../../constants/Colors";
import BackgroundScreen from "../../screens/BackgroundScreen";
import BackgroundScreen2 from "../../screens/BackgroundScreen2";
import { IBackground } from "../../types";

export default function LoadingSpinnerWithText() {
  return (
    <BackgroundScreen2>
      <View style={styles.container}>
        <Text style={styles.text}>카카오 인증을 완료해주세요</Text>
        <Text>인증이 완료되면 추가 설문이 진행 됩니다.</Text>
        <ActivityIndicator size={"large"} color={accent} />
      </View>
    </BackgroundScreen2>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,

    // backgroundColor: "white",
  },
  text: {
    fontSize: 20,
  },
});
