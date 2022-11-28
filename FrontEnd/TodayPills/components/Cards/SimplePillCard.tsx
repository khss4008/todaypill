import { StyleSheet, View, Image, Text, ImageSourcePropType, Pressable } from "react-native";
import { useState } from "react";

interface PillProps {
    image: ImageSourcePropType;
    brand: string;
    pill: string;
}

const SimplePillCard = (props: PillProps) => {
    const [like, setLike] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.cardcontainer}>
                <View style={styles.imagecontainer}>
                    <Image
                        source={props.image}
                        style={styles.pillimage}
                    />
                </View>
                <Pressable
                    onPress={() => setLike(!like)}
                    style={styles.heartcontainer}
                >
                    <Image
                        source={like ?
                        require("../../assets/images/hearton.png") :
                        require("../../assets/images/heartoff.png")}
                        style={styles.heart}
                    />
                </Pressable>
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.brandname}>
                    {props.brand}
                </Text>
                <Text style={styles.pillname}>
                    {props.pill}
                </Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        marginHorizontal: 5,
        width: 70,
    },
    cardcontainer: {
        width: "100%",
        height: 65,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        elevation: 10,
        borderRadius: 10,
        marginBottom: 3,
    },
    imagecontainer: {
        width: "80%",
        height: "80%",
    },
    pillimage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    heartcontainer: {
        width: 30,
        height: 30,
        position: "absolute",
        bottom: 0,
        right: -5,
    },
    heart: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    textcontainer: {
        width: "100%",
        paddingHorizontal: 3,
    },
    brandname: {
        fontSize: 5,
        color: "#B7B7B7",
    },
    pillname: {
        fontSize: 7,
        fontWeight: "bold",
    },
});

export default SimplePillCard;