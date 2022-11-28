import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Linking,
  ToastAndroid,
} from 'react-native';
import BackgroundScreen2 from '../BackgroundScreen2';
import Card from '../../components/UI/Card';
import GoBackBtn from '../../components/UI/GoBackBtn';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import { fetchLikeUsers, like, dislike } from "../../API/likeAPI";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchRecommendation } from "../../API/supplementAPI";
import PillItem from "../../components/Pills/PillItem";
import { AiAnalysis } from "../../components/Data/AiAnalysis";
import { findCommonQuestion } from '../../API/userAPI';

export default function SupplementScreen({ navigation, route }: any) {
  const [ingredientStretch, setIngredientStretch] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const [userId, setUserId] = useState(0);
  const [pill, setPills]: any = useState({});
  const [similarPills, setSimilarPills] = useState([]);
  const [userNickName, setUserNickName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [likeChanged, setLikeChanged] = useState(false);
  const [AiPapers, setAiPapers] = useState([]);
  const naverSearch = () => {
    Linking.openURL(
      `https://msearch.shopping.naver.com/search/all?query=${pill.supplementName}&frm=NVSHSRC&vertical=home&fs=true`
    );
  };
  const getLikeOrNot = async () => {
    const likeUsersList = await fetchLikeUsers(route.params.supplementId);
    if (likeUsersList.length === 0) {
      setIsLiked(false);
    } else {
      likeUsersList.includes(userId) ? setIsLiked(true) : setIsLiked(false);
    }
    setLikeCnt(likeUsersList.length);
  };

  const likeHandler = async () => {
    await like(userId, route.params.supplementId);
    setIsLiked(true);
    ToastAndroid.show('영양제가 나의 Pick에 추가됐습니다.', 3);
  };

  const dislikeHandler = async () => {
    await dislike(userId, route.params.supplementId);
    setIsLiked(false);
    ToastAndroid.show('영양제가 나의 Pick에서 제외됐습니다.', 3);
  };

  const likeChangeHandler = () => {
    setLikeChanged((likedOrNot) => !likedOrNot);
  };
	
	const userRecommendation = async () => {
		const nickName = await AsyncStorage.getItem("@storage_UserNickName");
		const Id = await AsyncStorage.getItem("@storage_UserId");
		setUserNickName(nickName);
		setUserId(parseInt(Id));
		const recommendation = await fetchRecommendation(route.params.supplementId, Id);
		setPills(recommendation.supplement);
		setSimilarPills(recommendation.similar);
	};

	const aiSetting = async () => {
		const answerSheet = await findCommonQuestion(userId);
		const Ai = [];
		if (answerSheet.pregnant) {
			if (pill.category === "비타민 B") {
				Ai.push(["비타민 B", 7]);
			} else if (pill.category === "철분") {
				Ai.push(["철분", 2]);
			}
		}
		if (answerSheet.menopause) {
			if (pill.category === "비타민 D") {
				Ai.push(["비타민 D", 3]);
			}
		}
		if (answerSheet.smoking) {
			if (pill.category === "루테인") {
				Ai.push(["루테인", 3]);
			}
		}
		if (answerSheet.drink !== 0) {
			if (pill.category === "밀크시슬") {
				Ai.push(["밀크시슬", 2]);
			}
		}
		if (answerSheet.allergy.includes("해당")) {
			if (pill.category === "밀크시슬") {
				Ai.push(["밀크시슬", 0]);
			}
		}
		if (answerSheet.allergy.includes("기타")) {
			if (pill.category === "밀크시슬") {
				Ai.push(["밀크시슬", 1]);
			}
		}
		if (answerSheet.symptom.includes("해당")) {
			if (pill.category === "마그네슘") {
				Ai.push(["마그네슘", 1]);
			}
		}
		if (answerSheet.symptom.includes("쓰림")) {
			if (pill.category === "종합비타민") {
				Ai.push(["종합비타민", 1]);
			} else if (pill.category === "비타민 C") {
				Ai.push(["비타민 C", 5]);
			}
		}
		if (answerSheet.symptom.includes("변비")) {
			if (pill.category === "유산균") {
				Ai.push(["유산균", 3]);
			}
		}
		if (answerSheet.symptom.includes("설사")) {
			if (pill.category === "밀크시슬") {
				Ai.push(["밀크시슬", 4]);
			} else if (pill.category === "유산균") {
				Ai.push(["유산균", 0]);
			}
		}
		if (answerSheet.symptom.includes("소화")) {
			if (pill.category === "콜라겐") {
				Ai.push(["콜라겐", 11]);
			}
		}
		if (answerSheet.symptom.includes("요통")) {
			if (pill.category === "비타민 D") {
				Ai.push(["비타민 D", 5]);
			}
		}
		if (answerSheet.symptom.includes("편두")) {
			if (pill.category === "마그네슘") {
				Ai.push(["마그네슘", 3]);
			} else if (pill.category === "루테인") {
				Ai.push(["루테인", 1]);
			} else if (pill.category === "오메가3") {
				Ai.push(["오메가3", 4]);
			}
		}
		if (answerSheet.symptom.includes("대장")) {
			if (pill.category === "유산균") {
				Ai.push(["유산균", 2]);
			}
		}
		if (answerSheet.symptom.includes("아토")) {
			if (pill.category === "유산균") {
				Ai.push(["유산균", 5]);
			}
		}
		if (answerSheet.symptom.includes("비듬")) {
			if (pill.category === "유산균") {
				Ai.push(["유산균", 6]);
			}
		}
		if (answerSheet.symptom.includes("야간")) {
			if (pill.category === "마그네슘") {
				Ai.push(["마그네슘", 3]);
			}
		}
		if (answerSheet.symptom.includes("구내")) {
			if (pill.category === "비타민 B") {
				Ai.push(["비타민 B", 3]);
			} else if (pill.category === "아연") {
				Ai.push(["아연", 3]);
			}
		}
		if (answerSheet.disease.includes("해당")) {
			if (pill.category === "종합비타민") {
				Ai.push(["종합비타민", 3]);
			}
		}
		if (answerSheet.disease.includes("빈혈")) {
			if (pill.category === "철분") {
				Ai.push(["철분", 3]);
			}
		}
		if (answerSheet.disease.includes("신장")) {
			if (pill.category === "비타민 C") {
				Ai.push(["비타민 C", 1]);
			}
		}
		if (answerSheet.disease.includes("당뇨")) {
			if (pill.category === "비타민 C") {
				Ai.push(["비타민 C", 3]);
			} else if (pill.category === "밀크시슬") {
				Ai.push(["밀크시슬", 3]);
			} else if (pill.category === "마그네슘") {
				Ai.push(["마그네슘", 3]);
			}
		}
		if (answerSheet.disease.includes("통풍")) {
			if (pill.category === "비타민 C") {
				Ai.push(["비타민 C", 0]);
			}
		}
		if (answerSheet.disease.includes("고혈")) {
			if (pill.category === "비타민 C") {
				Ai.push(["비타민 C", 3]);
			}
		}
		if (answerSheet.disease.includes("고지")) {
			if (pill.category === "비타민 D") {
				Ai.push(["비타민 D", 10]);
			}
		}
		if (answerSheet.disease.includes("치주")) {
			if (pill.category === "비타민 D") {
				Ai.push(["비타민 D", 8]);
			}
		}
		if (answerSheet.disease.includes("심부")) {
			if (pill.category === "종합비타민") {
				Ai.push(["종합비타민", 0]);
			} else if (pill.category === "마그네슘") {
				Ai.push(["마그네슘", 3]);
			}
		}
		if (answerSheet.disease.includes("기타")) {
			if (pill.category === "비타민 D") {
				Ai.push(["비타민 D", 6]);
			}
		}
		if (answerSheet.medicine.includes("해당")) {
			if (pill.category === "종합비타민") {
				Ai.push(["종합비타민", 2]);
			}
		}
		if (answerSheet.medicine.includes("피임")) {
			if (pill.category === "마그네슘") {
				Ai.push(["마그네슘", 0]);
			}
		}
		if (answerSheet.medicine.includes("제산")) {
			if (pill.category === "아연") {
				Ai.push(["아연", 1]);
			} else if (pill.category === "마그네슘") {
				Ai.push(["마그네슘", 0]);
				Ai.push(["마그네슘", 5]);
			}
		}
		if (answerSheet.medicine.includes("혈압")) {
			if (pill.category === "아연") {
				Ai.push(["아연", 1]);
			}
		}
		if (answerSheet.medicine.includes("이뇨")) {
			if (pill.category === "마그네슘") {
				Ai.push(["마그네슘", 0]);
			}
		}
		if (answerSheet.medicine.includes("부정")) {
			if (pill.category === "마그네슘") {
				Ai.push(["마그네슘", 5]);
			}
		}
		if (answerSheet.medicine.includes("경련")) {
			if (pill.category === "마그네슘") {
				Ai.push(["마그네슘", 5]);
			}
		}
		if (answerSheet.medicine.includes("갑상")) {
			if (pill.category === "아연") {
				Ai.push(["아연", 3]);
			} else if (pill.category === "마그네슘") {
				Ai.push(["마그네슘", 5]);
			}
		}
		if (answerSheet.medicine.includes("항생")) {
			if (pill.category === "아연") {
				Ai.push(["아연", 6]);
			} else if (pill.category === "마그네슘") {
				Ai.push(["마그네슘", 5]);
			}
		}
		if (answerSheet.toughActivity) {
			if (pill.category === "비타민 D") {
				Ai.push(["비타민 D", 9]);
			} else if (pill.category === "마그네슘") {
				Ai.push(["마그네슘", 3]);
			} else if (pill.category === "콜라겐") {
				Ai.push(["콜라겐", 6]);
			}
		}
		if (answerSheet.outdoor_activity === 0) {
			if (pill.category === "비타민 D") {
				Ai.push(["비타민 D", 2]);
			}
		} else if (answerSheet.outdoor_activity === 3) {
			if (pill.category === "비타민 D") {
				Ai.push(["비타민 D", 1]);
			}
		} else  {
			if (pill.category === "콜라겐") {
				Ai.push(["콜라겐", 3]);
			}
		}
		if (answerSheet.lack.includes("채소") || answerSheet.lack.includes("과일")) {
			if (pill.category === "철분") {
				Ai.push(["철분", 0]);
			}
		}
		if (answerSheet.lack.includes("생선") || answerSheet.lack.includes("육류")) {
			if (pill.category === "비타민 D") {
				Ai.push(["비타민 D", 0]);
			}
		}
		if (answerSheet.preferred_brand.includes("기타")) {
			if (pill.category === "아연") {
				Ai.push(["아연", 4]);
			}
		}
		if (answerSheet.problem.includes("해당")) {
			if (pill.category === "비타민 B") {
				Ai.push(["비타민 B", 0]);
			}
		}
		if (answerSheet.problem.includes("면역")) {
			if (pill.category === "비타민 C") {
				Ai.push(["비타민 C", 2]);
			}
		}
		if (answerSheet.problem.includes("심혈")) {
			if (pill.category === "종합비타민") {
				Ai.push(["종합비타민", 0]);
			}
		}
		if (answerSheet.problem.includes("치매")) {
			if (pill.category === "비타민 B") {
				Ai.push(["비타민 B", 4]);
			} else if (pill.category === "비타민 D") {
				Ai.push(["비타민 D", 7]);
			} else if (pill.category === "마그네슘") {
				Ai.push(["마그네슘", 5]);
			}
		}
		if (answerSheet.problem.includes("식후")) {
			if (pill.category === "아연") {
				Ai.push(["아연", 3]);
			} else if (pill.category === "콜라겐") {
				Ai.push(["콜라겐", 11]);
			}
		}
		if (answerSheet.problem.includes("콜레")) {
			if (pill.category === "비타민 B") {
				Ai.push(["비타민 B", 8]);
			} else if (pill.category === "아연") {
				Ai.push(["아연", 3]);
			} else if (pill.category === "마그네슘") {
				Ai.push(["마그네슘", 5]);
			}
		}
		if (answerSheet.problem.includes("관절")) {
			if (pill.category === "비타민 D") {
				Ai.push(["비타민 D", 4]);
			} else if (pill.category === "콜라겐") {
				Ai.push(["콜라겐", 5]);
			}
		}
		if (answerSheet.problem.includes("간")) {
			if (pill.category === "밀크시슬") {
				Ai.push(["밀크시슬", 2]);
			}
		}
		if (answerSheet.problem.includes("우울")) {
			if (pill.category === "비타민 B") {
				Ai.push(["비타민 B", 2]);
			} else if (pill.category === "오메가3") {
				Ai.push(["오메가3", 4]);
			}
		}
		if (answerSheet.problem.includes("월경")) {
			if (pill.category === "철분") {
				Ai.push(["철분", 1]);
			} else if (pill.category === "마그네슘") {
				Ai.push(["마그네슘", 3]);
			}
		}
		if (answerSheet.problem.includes("수면")) {
			if (pill.category === "비타민 B") {
				Ai.push(["비타민 B", 1]);
			} else if (pill.category === "마그네슘") {
				Ai.push(["마그네슘", 3]);
			}
		}
		if (answerSheet.problem.includes("눈")) {
			if (pill.category === "루테인") {
				Ai.push(["루테인", 0]);
				Ai.push(["루테인", 1]);
			}
		}
		if (answerSheet.problem.includes("청력")) {
			if (pill.category === "마그네슘") {
				Ai.push(["마그네슘", 3]);
			}
		}
		if (answerSheet.problem.includes("주름")) {
			if (pill.category === "콜라겐") {
				Ai.push(["콜라겐", 0]);
			}
		}
		if (answerSheet.problem.includes("모발")) {
			if (pill.category === "비타민 B") {
				Ai.push(["비타민 B", 6]);
			}
		}
		if (answerSheet.problem.includes("기타")) {
			if (pill.category === "철분") {
				Ai.push(["철분", 3]);
			}
		}
		return Ai;
	};

  const analysisRecommendation = async () => {
    const Ai = await aiSetting();
    setAiPapers(Ai);
    setIsLoading(true);
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(false);
      getLikeOrNot();
      userRecommendation();
    }, [route.params.supplementId, isLiked])
  );

  useFocusEffect(
    useCallback(() => {
      analysisRecommendation();
    }, [pill])
  );

	return (
		<BackgroundScreen2>
			<Card>
				{
					isLoading ?
					<View style={styles.container}>
						<View style={styles.gobackcontainer}>
							<GoBackBtn
								onPress={() => navigation.goBack()}
								size={33}
							/>
						</View>
						<View style={styles.titlecontainer}>
							<Text style={styles.title}>
								{pill.supplementName}
							</Text>
						</View>
						<ScrollView>
							<View style={styles.imagecontainer}>
								<Image
									source={{ uri: pill.image }}
									style={styles.image}
								/>
								<Pressable
									style={styles.navercontainer}
									onPress={() => naverSearch()}
								>
									<Text style={styles.navertext}>
										네이버
									</Text>
									<Text style={styles.navertext}>
										검색
									</Text>
									<Entypo
										name="magnifying-glass"
										size={30}
										color="#a2a3f5"
										style={styles.navericon}
									/>
								</Pressable>
								<Pressable
									style={styles.likecontainer}
									onPress={() => isLiked ? dislikeHandler() : likeHandler()}
								>
									<Text style={styles.liketext}>
										찜하기
									</Text>
									<Image
										source={
											isLiked
												? require("../../assets/images/heartOn3.png")
												: require("../../assets/images/heartOff1.png")
										}
										style={styles.like}
									/>
									<Text style={styles.likecount}>
										{likeCnt}
									</Text>
								</Pressable>
							</View>
							<View style={styles.textcontainer}>
								<View style={styles.flexrow}>
									<View	style={styles.headcontainer}>
										<View style={styles.head}>
											<Text style={styles.headtext}>
												카테고리
											</Text>
										</View>
									</View>
									<View style={styles.contentcontainer}>
										<View style={styles.content}>
											<Text style={styles.contenttext}>
												{pill.category}
											</Text>
										</View>
									</View>
								</View>
								<View style={styles.flexrow}>
									<View style={styles.headcontainer}>
										<View style={styles.head}>
											<Text style={styles.headtext}>
												제조사
											</Text>
										</View>
									</View>
									<View style={styles.contentcontainer}>
										<View style={styles.content}>
											<Text
												style={styles.contenttext}
												numberOfLines={1}
												ellipsizeMode={"tail"}
											>
												{pill.brand}
											</Text>
										</View>
									</View>
								</View>
								<View style={styles.flexrow}>
									<View style={styles.headcontainer}>
										<Pressable
											style={styles.ingredienthead}
											onPress={() => setIngredientStretch(!ingredientStretch)}
										>
											<Text style={styles.headtext}>
												전성분
											</Text>
										</Pressable>
									</View>
									<View style={styles.contentcontainer}>
										<Pressable
											style={styles.ingredientcontent}
											onPress={() => setIngredientStretch(!ingredientStretch)}
										>
											{
												ingredientStretch ?
												<View>
													{pill.ingredients.split(" / ").map((ingredient, idx) =>
														<Text
															key={idx}
															style={styles.contenttext}
														>
															· {ingredient}
														</Text>
													)}
													<AntDesign name="upcircle" size={19} color="grey" style={styles.unstretch} />
												</View> :
												<View style={styles.flexrow}>
													<Text
														style={styles.ingredientcontenttext}
														numberOfLines={1}
														ellipsizeMode={"tail"}
													>
														· {pill.ingredients}
													</Text>
													<AntDesign name="downcircle" size={19} color="grey" />
												</View>
											}
										</Pressable>
									</View>
								</View>
								<View style={styles.flexrow}>
									<View style={styles.headcontainer}>
										<View style={styles.ingredienthead}>
											<Text style={styles.headtext}>
												효능
											</Text>
										</View>
									</View>
									<View style={styles.contentcontainer}>
										<View style={styles.ingredientcontent}>
											<Text
												style={styles.contenttext}
											>
												{pill.additionalEfficacy}
											</Text>
										</View>
									</View>
								</View>
								<View style={styles.flexrow}>
									<View style={styles.headcontainer}>
										<View style={styles.head}>
											<Text style={styles.headtext}>
												추천 복용 시간
											</Text>
										</View>
									</View>
									<View style={styles.contentcontainer}>
										<View style={styles.content}>
											<Text
												style={styles.contenttext}
												numberOfLines={1}
												ellipsizeMode={"tail"}
											>
												{pill.note}
											</Text>
										</View>
									</View>
								</View>
								<View style={styles.flexrow}>
									<View style={styles.headcontainer}>
										<View style={styles.head}>
											<Text style={styles.headtext}>
												총량
											</Text>
										</View>
									</View>
									<View style={styles.contentcontainer}>
										<View style={styles.content}>
											<Text
												style={styles.contenttext}
												numberOfLines={1}
												ellipsizeMode={"tail"}
											>
												{pill.amount}
											</Text>
										</View>
									</View>
								</View>
								<View style={styles.flexrow}>
									<View style={styles.headcontainer}>
										<View style={styles.head}>
											<Text style={styles.headtext}>
												1회 섭취량
											</Text>
										</View>
									</View>
									<View style={styles.contentcontainer}>
										<View style={styles.content}>
											<Text
												style={styles.contenttext}
												numberOfLines={1}
												ellipsizeMode={"tail"}
											>
												{pill.requiredCount}
											</Text>
										</View>
									</View>
								</View>
								<View style={styles.flexrow}>
									<View style={styles.headcontainer}>
										<View style={styles.head}>
											<Text style={styles.headtext}>
												제형
											</Text>
										</View>
									</View>
									<View style={styles.contentcontainer}>
										<View style={styles.content}>
											<Text
												style={styles.contenttext}
												numberOfLines={1}
												ellipsizeMode={"tail"}
											>
												{
													pill.formula === "capsule" ?
														"캡슐" :
														pill.formula === "liquid" ?
															"액상" :
															pill.formula === "chewable" ?
																"젤리" :
																pill.formula === "powder" ?
																	"분말" :
																	pill.formula === "spray" ?
																	"스프레이" : null
												}
											</Text>
										</View>
									</View>
								</View>
								<View style={styles.flexrow}>
									<View style={styles.headcontainer}>
										<View style={styles.ingredienthead}>
											<Text style={styles.headtext}>
												주의사항
											</Text>
										</View>
									</View>
									<View style={styles.contentcontainer}>
										<View style={styles.ingredientcontent}>
											<Text style={styles.contenttext}>
												{pill.caution}
											</Text>
										</View>
									</View>
								</View>
							</View>
							<View style={styles.similartextcontainer}>
								<Image
									source={require("../../assets/images/similar.png")}
									style={styles.similarimage}
								/>
								<View style={styles.textjustify}>
									<Text style={styles.similartext}>
										{userNickName}님과 비슷한 분들은
									</Text>
									<Text style={styles.similartext}>
										이 제품을 눈여겨보고 있어요
									</Text>
								</View>
							</View>
							<View style={styles.similarpillcontainer}>
                {similarPills.map((pill, idx) => {
                  if (!pill) return;
                  return (
                    <PillItem
                      key={idx}
                      userId={userId}
                      pillId={pill.supplementId}
                      image={pill.image}
                      brand={pill.brand}
                      pill={pill.supplementName}
                      onPressChange={likeChangeHandler}
                      navigation={navigation}
                    />
                  );
                })}
              </View>
								{
									AiPapers.length > 0 &&
									<View style={styles.similartextcontainer}>
										<Image
											source={require("../../assets/images/aipaper.png")}
											style={styles.aiimage}
										/>
										<View style={styles.textjustify}>
											<Text style={styles.similartext}>
												{userNickName}님과 관련있는
											</Text>
											<Text style={styles.similartext}>
												논문 분석 결과를 살펴보세요
											</Text>
										</View>
									</View>
								}
								{
									AiPapers.map((AiPaper, idx) =>
										<View
											key={idx}
											style={styles.aicontainer}
										>
											<Text
												style={styles.aitext}
												onPress={async () => {
													if (navigation.jumpTo) await navigation.jumpTo('Ai');
													await navigation.navigate('AiQnaScreen', {
														nutId: pill.supplementId,
														nutrient: AiPaper[0],
														stretch: AiPaper[1],
													});
												}}
											>
												{AiAnalysis[AiPaper[0]][AiPaper[1]][0]}
											</Text>
										</View>
									)
								}
							<View style={styles.height} />
						</ScrollView>
					</View> :
					<View style={styles.loadingspinnercontainer}>
						<Image
							source={require("../../assets/images/loadingspinner.gif")}
							style={styles.loadingspinner}
						/>
					</View>
				}
			</Card>
		</BackgroundScreen2>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 1000,
		paddingTop: 10,
	},
	gobackcontainer: {
		marginLeft: 10,
	},
	titlecontainer: {
		alignItems: "center",
	},
	title: {
		width: "90%",
		fontSize: 25,
		overflow: "hidden",
		textAlign: "center",
		fontFamily: "웰컴체_Bold",
	},
	imagecontainer: {
		position: "relative",
		width: "100%",
		height: 200,
		alignItems: "center",
		marginVertical: 10,
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
	navercontainer: {
		position: "absolute",
		top: 10,
		right: 20,
	},
	navertext: {
		textAlign: "center",
		fontSize: 15,
		fontFamily: "웰컴체_Regular",
		color: "#a2a3f5"
	},
	likecontainer: {
		position: "absolute",
		bottom: 10,
		right: 17.5,
	},
	liketext: {
		textAlign: "center",
		fontSize: 15,
		fontFamily: "웰컴체_Regular",
		color: "pink",
		marginVertical: -5,
	},
	like: {
		width: 45,
		height: 45,
	},
	likecount: {
		textAlign: "center",
		fontSize: 15,
		fontFamily: "웰컴체_Regular",
		marginTop: -5,
	},
	navericon: {
		alignSelf: "center",
	},
	textcontainer: {
		width: "90%",
		alignSelf: "center",
	},
	headcontainer: {
		width: "30%",
		borderRightWidth: 1,
		borderRightColor: "grey",
		marginBottom: -1,
	},
	contentcontainer: {
		width: "70%",
		paddingLeft: 10,
		marginBottom: -1,
	},
	line: {
		height: 1,
		backgroundColor: "#F5F5F5",
		width: "102%",
	},
	head: {
		height: 30,
		// alignItems: "center",
		justifyContent: "center",
		paddingVertical: 5,
		paddingHorizontal: 7,
	},
	content: {
		height: 30,
		justifyContent: "center",
		paddingVertical: 5,
		paddingHorizontal: 7,
	},
	headtext: {
		fontSize: 18,
		fontFamily: "웰컴체_Bold",
	},
	contenttext: {
		fontSize: 17,
		fontFamily: "웰컴체_Regular",
		lineHeight: 20,
		marginRight: 8,
	},
	ingredienthead: {
		// alignItems: "center",
		paddingVertical: 5,
		paddingHorizontal: 7,
	},
	ingredientcontent: {
		paddingVertical: 5.5,
		paddingHorizontal: 7,
	},
	ingredientcontenttext: {
		width: "85%",
		fontSize: 17,
		fontFamily: "웰컴체_Regular",
	},
	similartextcontainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
		marginBottom: 5,
		marginHorizontal: 12,
	},
	similarimage: {
		width: 50,
		height: 60,
		resizeMode: "contain",
		marginLeft: 3.5,
		marginRight: 9,
	},
	similartext: {
		width: "100%",
		fontSize: 18,
		fontFamily: "웰컴체_Bold",
	},
	similarpillcontainer: {
		width: "90%",
		flexDirection: "row",
		justifyContent: "space-evenly",
    backgroundColor: "#ECF6F4",
    borderRadius: 10,
    elevation: 5,
		alignSelf: "center",
		// marginHorizontal: 20,
	},
	flexrow: {
		flexDirection: "row",
	},
	unstretch: {
		alignSelf: "flex-end",
		marginTop: 5,
		marginRight: 20,
	},
	aicontainer: {
		width: "90%",
		alignSelf: "center",
		// paddingHorizontal: 10,
		// marginHorizontal: 20,
	},
	aiimage: {
		width: 50,
		height: 60,
		resizeMode: "contain",
		// marginLeft: 3.5,
		// marginRight: 10,
		marginLeft: 8.5,
		marginRight: 4,
	},
	aitext: {
		width: "100%",
    backgroundColor: "#ECF6F4",
		elevation: 5,
		paddingHorizontal: 15,
		paddingVertical: 10,
		fontSize: 17,
		fontFamily: "웰컴체_Regular",
		borderRadius: 10,
		marginBottom: 8,
	},
	height: {
		height: 430,
	},
	textjustify: {
		height: 60,
		justifyContent: "flex-end",
		paddingBottom: 1,
	},
	loadingspinnercontainer: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	loadingspinner: {
    width: 200,
    height: 200,
	},
});
