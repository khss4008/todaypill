import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import AiQna from "../../components/AiPage/AiQna";
import BackgroundScreen2 from "../BackgroundScreen2";
import { useEffect, useState } from "react";
import GoBackBtn from "../../components/UI/GoBackBtn";
import { AiAnalysis } from "../../components/Data/AiAnalysis";

export default function AiQnaScreen ({ navigation, route }: any) {
	const [randomImage, setRandomImage] = useState();
	const images = [
		require("../../assets/images/ai/face1.png"),
		require("../../assets/images/ai/face2.png"),
		require("../../assets/images/ai/face3.png"),
		require("../../assets/images/ai/face4.png"),
		require("../../assets/images/ai/face5.png"),
		require("../../assets/images/ai/face6.png"),
	]
	const datas = AiAnalysis;

	useEffect(() => {
		const randomNumber = Math.floor(Math.random() * 6)
		setRandomImage(images[randomNumber])
	}, [])

	return (
		<BackgroundScreen2>
			<View style={styles.container}>
				<View style={styles.titlecontainer}>
					<View style={styles.marginleft}>
						<GoBackBtn
							onPress={() => navigation.pop()}
							size={33}
						/>
					</View>
					<Text style={{...styles.nutrient, fontFamily: "웰컴체_Bold"}}>
						{route.params.nutrient}
					</Text>
					<View style={styles.empty} />
				</View>
				<ScrollView style={styles.height}>
					<View style={styles.qnacontainer}>
						{datas[route.params.nutrient].map((data, idx) => 
							<AiQna key={idx} title={data[0]} contents={data.slice(1)} stretch={route.params.stretch === idx}/>
						)}
					</View>
					<View style={styles.imagecontainer}>
						<Image
							source={randomImage}
							style={styles.image}
						/>
					</View>
				</ScrollView>
			</View>
		</BackgroundScreen2>
	)
};

const styles = StyleSheet.create({
	container: {
		position: "relative",
	},
	titlecontainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	marginleft: {
		marginLeft: 10,
	},
	empty: {
		width: 48,
		marginRight: 10,
	},
	height: {
		marginBottom: 65,
	},
	nutrient: {
		fontSize: 24,
	},
	qnacontainer: {
		alignItems: "center",
		marginBottom: 55,
	},
	imagecontainer: {
		width: "100%",
		alignItems: "flex-end",
	},
	image: {
		width: "50%",
		height: 120,
		resizeMode: "contain",
		marginTop: -60,
		marginRight: -30,
	},
});