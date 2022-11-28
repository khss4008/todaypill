import { StyleSheet, View, Text, ScrollView, Pressable, TextInput, ToastAndroid } from "react-native";
import GoBackBtn from "../../components/UI/GoBackBtn";
import BackgroundScreen2 from "../BackgroundScreen2";
import { useState } from "react";
import CustomBtn from "../../components/UI/CustomBtn";
import { accent } from "../../constants/Colors";

export default function AiAnalysisScreen ({ navigation }: any) {
    const [isPaper, setIsPaper] = useState(true);
    const [minLength, setMinLength] = useState("");
    const [maxLength, setMaxLength] = useState("");
    const [url, setUrl] = useState("");
    const [content, setContent] = useState("");
    const onlyNumber = (text) => {
        let changedText = text;
        for (const letter of text.split("")) {
            if (!["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(letter)) {
                changedText = changedText.replace(letter, "");
            }
        }
        if (parseInt(changedText, 10) > 65) {
            changedText = "65";
        }
        return changedText;
    };
    const validationCheck = (text, isMin) => {
        if (isMin && parseInt(text, 10) < 10) {
            setMinLength("10");
            ToastAndroid.show("최소 길이는 10 이상이어야 합니다.", 3);
        }
        if (isMin && maxLength !== "" && parseInt(text, 10) > parseInt(maxLength, 10)) {
            setMinLength(maxLength);
            ToastAndroid.show("최대 길이보다 작아야 합니다.", 3);
        }
        if (!isMin && minLength !== "" && parseInt(text, 10) < parseInt(minLength, 10)) {
            setMaxLength(minLength);
            ToastAndroid.show("최소 길이보다 커야 합니다.", 3);
            return
        }
        if (!isMin && parseInt(text, 10) < 10) {
            setMaxLength("10");
            ToastAndroid.show("최대 길이는 10 이상이어야 합니다.", 3);
        }
    };
	const options = {
		method: "POST",
		url: `https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-${isPaper ? "url" : "text"}/`,
		headers: {
			"content-type": "application/json",
			"X-RapidAPI-Key": "8b490e1804msh4f0f29203fdc9dcp1191d4jsn3a21335f16d9",
			"X-RapidAPI-Host": "tldrthis.p.rapidapi.com"
		},
		data: `{"${isPaper ? "url" : "text"}":"${isPaper ? url : content.replace(/\n|\r/g, " ")}","min_length":10,"max_length":65${isPaper ? ',"is_detailed":false' : ""}}`
	};

    return (
        <BackgroundScreen2>
            <View>
                <View style={styles.textcontainer}>
					<Text style={{...styles.text, fontFamily: "웰컴체_Regular"}}>
						논문 URL이나 내용을 입력하여
					</Text>
					<Text style={{...styles.text, fontFamily: "웰컴체_Regular"}}>
						AI로 논문을 분석해보세요!
					</Text>
				</View>
                <View style={styles.titlecontainer}>
                    <View style={styles.marginLeft}>
                        <GoBackBtn
                            onPress={() => navigation.goBack()}
                            size={33}
                        />
                    </View>
                    <Text style={{...styles.title, fontFamily: "웰컴체_Bold"}}>AI 논문 분석기</Text>
                    <View style={styles.empty} />
                </View>
                <View style={styles.cautioncontainer}>
                    <Text style={{...styles.caution, fontFamily: "웰컴체_Regular"}}>
                        영어로 된 논문만 분석할 수 있어요.
                    </Text>
                    <Text style={{...styles.caution, fontFamily: "웰컴체_Regular"}}>
                        논문의 내용이 영어인지 꼭 확인해주세요.
                    </Text>
                </View>
                <ScrollView>
                    <View style={styles.cardcontainer}>
                        <View style={styles.headcontainer}>
                            <View style={[styles.fixeditem, styles.justifycenter]}>
                                <Text style={{...styles.head, fontFamily: "웰컴체_Bold"}}>
                                    입력 형태
                                </Text>
                            </View>
                            <View style={styles.line} />
                            {/* <View style={[styles.fixeditem, styles.justifycenter]}>
                                <Text style={{...styles.head, fontFamily: "웰컴체_Bold"}}>
                                    최소 길이
                                </Text>
                            </View>
                            <View style={styles.line} />
                            <View style={[styles.fixeditem, styles.justifycenter]}>
                                <Text style={{...styles.head, fontFamily: "웰컴체_Bold"}}>
                                    최대 길이
                                </Text>
                            </View>
                            <View style={styles.line} /> */}
                            {
                                isPaper ?
                                <View style={[styles.fixeditem, styles.justifycenter]}>
                                    <Text style={{...styles.head, fontFamily: "웰컴체_Bold"}}>
                                        논문 URL
                                    </Text>
                                </View> :
                                <View style={[styles.fixeditem, styles.justifycenter]}>
                                    <Text style={{...styles.head, fontFamily: "웰컴체_Bold"}}>
                                        논문 내용
                                    </Text>
                                </View>
                            }
                        </View>
                        <View style={styles.bodycontainer}>
                            <View style={styles.fixeditem}>
                                <Pressable
                                    style={styles.radiocontainer}
                                    onPress={() => setIsPaper(true)}
                                >
                                    <View style={[styles.radiobutton, isPaper ? styles.radioon : styles.radiooff]} />
                                    <Text style={{...styles.body, fontFamily: "웰컴체_Regular"}}>
                                        논문 URL
                                    </Text>
                                </Pressable>
                                <Pressable
                                    style={styles.radiocontainer}
                                    onPress={() => setIsPaper(false)}
                                >
                                    <View style={[styles.radiobutton, isPaper ? styles.radiooff : styles.radioon]} />
                                    <Text style={{...styles.body, fontFamily: "웰컴체_Regular"}}>
                                        논문 내용
                                    </Text>
                                </Pressable>
                            </View>
                            <View style={styles.line} />
                            {/* <View style={styles.fixeditem}>
                                <TextInput
                                    style={styles.lengthinput}
                                    placeholder={"10 ~ 65"}
                                    keyboardType={"numeric"}
                                    maxLength={2}
                                    onChangeText={(text) => {
                                        setMinLength(onlyNumber(text))
                                    }}
                                    onSubmitEditing={() => {
                                        validationCheck(minLength, true)
                                    }}
                                    value={minLength}
                                />
                            </View>
                            <View style={styles.line} />
                            <View style={styles.fixeditem}>
                                <TextInput
                                    style={styles.lengthinput}
                                    placeholder={"10 ~ 65"}
                                    keyboardType={"numeric"}
                                    maxLength={2}
                                    onChangeText={(text) => {
                                        setMaxLength(onlyNumber(text))
                                    }}
                                    onSubmitEditing={() => {
                                        validationCheck(maxLength, false)
                                    }}
                                    value={maxLength}
                                />
                            </View>
                            <View style={styles.line} /> */}
                            {
                                isPaper ?
                                <View style={styles.fixeditem}>
                                    <TextInput
                                        style={styles.urlinput}
                                        placeholder={"논문의 URL을 입력해주세요."}
                                        keyboardType={"url"}
                                        onChangeText={(text) => {
                                            setUrl(text);
                                        }}
                                        value={url}
                                    /> 
                                </View> :
                                <View style={styles.unfixeditem}>
                                    <TextInput
                                        style={styles.contentinput}
                                        placeholder={"논문의 내용을 입력해주세요."}
                                        multiline={true}
                                        onChangeText={(text) => {
                                            setContent(text);
                                        }}
                                        value={content}
                                    />
                                </View>
                            }
                        </View>
                    </View>
                    <View style={styles.buttoncontainer}>
                        <CustomBtn
                            buttonColor={accent}
                            title={"분석 시작"}
                            fontSize={25}
                            titleColor={"#fff"}
                            buttonWidth={"90%"}
                            onPress={() => {
                                navigation.navigate("AiResultScreen", { isPaper: isPaper, options: options, url: url, content: content })
                            }}
                        />
                    </View>
                    <View style={styles.height} />
                </ScrollView>
            </View>
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
    titlecontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    marginLeft: {
        marginLeft: 10,
    },
    title: {
      fontSize: 24,
    },
    empty: {
        width: 33,
        marginRight: 10,
    },
    cautioncontainer: {
        width: "100%",
        paddingHorizontal: 20,
        alignItems: "center",
        marginBottom: 10,
    },
    caution: {
        fontSize: 20,
        color: "grey",
    },
    cardcontainer: {
        width: "90%",
        minHeight: 70,
        backgroundColor: "white",
        elevation: 10,
        marginBottom: 20,
        alignSelf: "center",
        borderRadius: 20,
        flexDirection: "row",
        paddingVertical: 15,
    },
    headcontainer: {
        width: "30%",
    },
    fixeditem: {
        height: 25,
        alignItems: "center",
        flexDirection: "row",
    },
    unfixeditem: {
        alignItems: "center",
        flexDirection: "row",
    },
    justifycenter: {
        justifyContent: "center",
    },
    head: {
        fontSize: 21,
        textAlign: "center",
    },
    line: {
        height: 1,
        width: "100%",
		backgroundColor: "#F5F5F5",
        marginVertical: 10,
    },
    bodycontainer: {
        width: "70%",
    },
    radiocontainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 5,
    },
    radiobutton: {
        width: 20,
        height: 20,
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 1,
        marginHorizontal: 5,  
    },
    radioon: {
        backgroundColor: "#CBE8E9",
    },
    radiooff: {
        backgroundColor: "white",
    },
    body: {
        fontSize: 20,
    },
    lengthinput: {
        width: 60,
        height: 30,
        borderColor: "black",
        borderWidth: 1,
        fontSize: 16,
        paddingHorizontal: 2,
    },
    urlinput: {
        width: "95%",
        height: 30,
        borderColor: "black",
        borderWidth: 1,
        fontSize: 16,
        paddingHorizontal: 2,
    },
    contentinput: {
        width: "95%",
        marginTop: -2.5,
        borderColor: "black",
        borderWidth: 1,
        fontSize: 16,
        paddingHorizontal: 2,
    },
    buttoncontainer: {
        width: "100%",
        alignItems: "center",
    },
    height: {
        height: 180,
    },
});