import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import axios from "axios";
import BackgroundScreen2 from "../BackgroundScreen2";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import GoBackBtn from "../../components/UI/GoBackBtn";
import { Linking } from "react-native";

export default function AiResultScreen ({ navigation, route }: any) {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [result, setResult] = useState("");
	const [randomImage, setRandomImage] = useState();
	const images = [
		require("../../assets/images/ai/face1.png"),
		require("../../assets/images/ai/face2.png"),
		require("../../assets/images/ai/face3.png"),
		require("../../assets/images/ai/face4.png"),
		require("../../assets/images/ai/face5.png"),
		require("../../assets/images/ai/face6.png"),
	]
	const analyze = async (isPaper, options) => {
		let summaries = [];
		let translated = "";
		await setIsLoading(true);
		await setIsError(false);
		await setResult("");
		await axios.request(options).then(function (response) {
			summaries = isPaper ? response.data.summary[0].split(".") : response.data.summary.split(".");
		}).catch(function (error) {
			setIsError(true);
			setIsLoading(false);
			return;
		})
		// console.log(summaries)
		const translate = async (text) => {
			await axios.post(
				`https://openapi.naver.com/v1/papago/n2mt?source=en&target=ko&text=${text}`,
				{},
				{
					headers : {
						"Host": "openapi.naver.com",
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
						"X-Naver-Client-Id": "e4YZwKjR2_fuhYKtlYx8",
						"X-Naver-Client-Secret": "BfKG4ejV4d"
					}
				}
			)
			.then((response) =>	{
				translated = translated + response.data.message.result.translatedText + " "
			});
		};
		for (const summary of summaries) {
			if (summary !== "") {
				await translate(summary);
			}
		}
		await setResult(translated);
		await setIsError(false);
		await setIsLoading(false);
	};

  useFocusEffect(
    useCallback(() => {
      analyze(route.params.isPaper, route.params.options)
			const randomNumber = Math.floor(Math.random() * 6)
			setRandomImage(images[randomNumber])
    }, [route.params.isPaper, route.params.options])
  );

	return (
		<BackgroundScreen2>
			{
				isLoading ?
					<View style={styles.loadingspinnercontainer}>
						<Image
							source={require("../../assets/images/loadingspinner.gif")}
							style={styles.loadingspinner}
						/>
					</View> :
					isError ?
					<View>
						<View style={styles.titlecontainer}>
							<View style={styles.marginLeft}>
								<GoBackBtn onPress={() => navigation.pop()} size={33} />
							</View>
							<Text style={{...styles.title, fontFamily: "웰컴체_Bold"}}>
								분석 실패
							</Text>
							<View style={styles.empty} />
						</View>
						<View style={styles.failcontainer}>
							<View style={styles.failspinnercontainer}>
								<Image
									source={require("../../assets/images/ai/failed.gif")}
									style={styles.failspinner}
								/>
							</View>
							<Text style={{...styles.failtext, fontFamily: "웰컴체_Regular"}}>
								논문 {route.params.isPaper ? "URL" : "내용"}을 확인해주세요.
							</Text>
						</View>
					</View> :
					<ScrollView>
						<View style={styles.titlecontainer}>
							<View style={styles.marginLeft}>
								<GoBackBtn onPress={() => navigation.pop()} size={33} />
							</View>
							<Text style={{...styles.title, fontFamily: "웰컴체_Bold"}}>
								분석 결과
							</Text>
							<View style={styles.empty} />
						</View>
						<View style={styles.cardcontainer}>
							<Text style={{...styles.text, ...styles.textcenter, fontFamily: "웰컴체_Bold"}}>
								결과 내용
							</Text>
							<View style={styles.line} />
							<Text style={{...styles.text, fontFamily: "웰컴체_Regular"}}>
								{result}
							</Text>
						</View>
						<View style={styles.cardcontainer}>
							<Text style={{...styles.text, ...styles.textcenter, fontFamily: "웰컴체_Bold"}}>
								{route.params.isPaper ? "원본 URL" : "원본 내용"}
							</Text>
							<View style={styles.line} />
							{
								route.params.isPaper ?
								<Text
									style={{...styles.text, ...styles.url, fontFamily: "웰컴체_Regular"}}
									onPress={() => Linking.openURL(route.params.url)}
								>
									{route.params.url}
								</Text> :
								<Text style={{...styles.text, fontFamily: "웰컴체_Regular"}}>
									{route.params.content}
								</Text>
							}
						</View>
						<View style={styles.imagecontainer}>
							<Image
								source={randomImage}
								style={styles.image}
							/>
						</View>
					</ScrollView>
			}
		</BackgroundScreen2>
	);
};

const styles = StyleSheet.create({
	loadingspinnercontainer: {
		width: "100%",
		height: "90%",
		justifyContent: "center",
		alignItems: "center",
	},
	loadingspinner: {
		width: 200,
		height: 200,
	},
	titlecontainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontSize: 24,
	},
	marginLeft: {
		marginLeft: 10,
	},
	empty: {
		width: 33,
		marginRight: 10,
	},
	failcontainer: {
		width: "100%",
		height: "80%",
		justifyContent: "center",
		alignItems: "center",
	},
	failspinnercontainer: {
		width: "100%",
		alignItems: "center",
	},
	failspinner: {
		width: 200,
		height: 200,
	},
	failtext: {
		fontSize: 21,
	},
	cardcontainer: {
		width: "90%",
		backgroundColor: "white",
		elevation: 10,
		marginTop: 20,
		alignSelf: "center",
		borderRadius: 20,
		paddingVertical: 15,
		paddingHorizontal: 15,
	},
	text: {
		fontSize: 20,
	},
	textcenter: {
		textAlign: "center",
	},
	urlcontainer: {
		width: "100%",
	},
	url: {
		width: "100%",
		color: "blue",
		textDecorationLine: "underline",
		textDecorationColor: "blue",
	},
	line: {
		height: 1,
		width: "100%",
		backgroundColor: "#F5F5F5",
		marginVertical: 10,
	},
	imagecontainer:{
		width: "100%",
		alignItems: "flex-end",
		marginTop: 65,
	},
	image: {
		width: "50%",
		height: 120,
		resizeMode: "contain",
		marginRight: -50,
	},
});