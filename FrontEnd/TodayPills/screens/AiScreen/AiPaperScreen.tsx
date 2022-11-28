import { ScrollView, StyleSheet, Text, View } from "react-native";
import AiNutrient from "../../components/AiPage/AiNutrient";
import BackgroundScreen2 from "../BackgroundScreen2";

export default function AiPaperScreen ({ navigation }: any) {
	return (
		<BackgroundScreen2>
			<ScrollView>
				<View style={styles.textcontainer}>
					<Text style={{...styles.text, fontFamily: "웰컴체_Regular"}}>
						영양소를 클릭해서
					</Text>
					<Text style={{...styles.text, fontFamily: "웰컴체_Regular"}}>
						AI로 분석한 논문을 확인해보세요!
					</Text>
				</View>
				<AiNutrient navigation={navigation} />
			</ScrollView>
		</BackgroundScreen2>
	)
};

const styles = StyleSheet.create({
	textcontainer: {
		borderRadius: 20,
		backgroundColor: "#F3E5EF",
		elevation: 10,
		paddingVertical: 7,
		marginHorizontal: 20,
		marginBottom: 10,
	},
	text: {
		textAlign: "center",
		fontSize: 20,
	},
});