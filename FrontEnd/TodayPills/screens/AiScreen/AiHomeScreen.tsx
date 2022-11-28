import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import BackgroundScreen2 from "../BackgroundScreen2";

export default function AiHomeScreen ({ navigation, route }: any) {
    return (
        <BackgroundScreen2>
            <ScrollView>
                <View style={styles.container}>
                    <Pressable
                        style={styles.buttoncontainer}
                        android_ripple={{ color: "#4E736F" }}
                        onPress={() => navigation.navigate("AiPaperScreen")}
                    >
                        <View style={styles.imagecontainer}>
                            <Image
                                source={require("../../assets/images/ai/paper.png")}
                                style={styles.image}
                            />
                        </View>
                        <View>
                            <Text style={{...styles.text, fontFamily: "웰컴체_Bold"}}>
                                분석된
                            </Text>
                            <Text style={{...styles.text, fontFamily: "웰컴체_Bold"}}>
                                논문 보기
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable
                        style={styles.buttoncontainer}
                        android_ripple={{ color: "#4E736F" }}
                        onPress={() => navigation.navigate("AiAnalysisScreen")}
                    >
                        <View style={styles.imagecontainer}>
                            <Image
                                source={require("../../assets/images/ai/analysis.png")}
                                style={styles.image}
                            />
                        </View>
                        <View>
                            <Text style={{...styles.text, fontFamily: "웰컴체_Bold"}}>
                                직접 논문
                            </Text>
                            <Text style={{...styles.text, fontFamily: "웰컴체_Bold"}}>
                                분석해보기
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </ScrollView>
        </BackgroundScreen2>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    buttoncontainer: {
        width: "90%",
        height: 250,
        borderRadius: 20,
        elevation: 10,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
        paddingBottom: 10,
    },
    imagecontainer: {
        width: "70%",
        height: "70%",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    text: {
        textAlign: "center",
        fontSize: 25,
    }
});