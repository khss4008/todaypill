import { useState } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import SimpleNutrientCard from "../Cards/SimpleNutrientCard";

const MainNutrient = ({ navigation }: any) => {
  const [mainNutrients, setMainNutrients] = useState([
    {
      nutId: 4,
      image: require("../../assets/images/ai/종합비타민.png"),
      nutrient: "종합비타민",
    },
    {
      nutId: 10,
      image: require("../../assets/images/ai/유산균.png"),
      nutrient: "유산균",
    },
    {
      nutId: 12,
      image: require("../../assets/images/ai/철분.png"),
      nutrient: "철분",
    },
    {
      nutId: 5,
      image: require("../../assets/images/ai/마그네슘.png"),
      nutrient: "마그네슘",
    },
    {
      nutId: 1,
      image: require("../../assets/images/ai/비타민B.png"),
      nutrient: "비타민 B",
    },
    {
      nutId: 6,
      image: require("../../assets/images/ai/오메가3.png"),
      nutrient: "오메가3",
    },
    {
      nutId: 3,
      image: require("../../assets/images/ai/비타민D.png"),
      nutrient: "비타민 D",
    },
    {
      nutId: 9,
      image: require("../../assets/images/ai/아연.png"),
      nutrient: "아연",
    },
    {
      nutId: 2,
      image: require("../../assets/images/ai/비타민C.png"),
      nutrient: "비타민 C",
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image
          source={require("../../assets/images/star.png")}
          style={styles.star}
        />
        <Text
          style={{
            ...styles.text,
            fontFamily: "웰컴체_Bold",
            letterSpacing: 0.5,
          }}
        >
          인기 성분
        </Text>
      </View>
      <View style={styles.cardscontainer}>
        {mainNutrients.map((mainNutrient, idx) => (
          <Pressable
            key={idx}
            onPress={() =>
              navigation.navigate("NutrientScreen", {
                nutId: mainNutrient.nutId,
                nutrient: mainNutrient.nutrient,
              })
            }
          >
            <SimpleNutrientCard
              image={mainNutrient.image}
              nutId={mainNutrient.nutId}
              nutrient={mainNutrient.nutrient}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 20,
    paddingBottom: 15,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  star: {
    width: 38,
    height: 38,
  },
  text: {
    fontSize: 20,
    // fontWeight: "bold",
    marginLeft: 5,
  },
  cardscontainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});

export default MainNutrient;
