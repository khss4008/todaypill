import { Pressable, StyleSheet, Text, View } from "react-native";
import SimpleNutrientCard from "../Cards/SimpleNutrientCard";
import GoBackBtn from "../UI/GoBackBtn";

const AiNutrient = ({ navigation }: any) => {
  const mainNutrients = [
		{
			nutId: 10,
			image: require("../../assets/images/ai/유산균.png"),
			nutrient: "유산균",
		},
		{
			nutId: 6,
			image: require("../../assets/images/ai/오메가3.png"),
			nutrient: "오메가3",
		},
    {
			nutId: 4,
      image: require("../../assets/images/ai/종합비타민.png"),
      nutrient: "종합비타민",
    },
		{
			nutId: 1,
			image: require("../../assets/images/ai/비타민B.png"),
			nutrient: "비타민 B",
		},
		{
			nutId: 2,
			image: require("../../assets/images/ai/비타민C.png"),
			nutrient: "비타민 C",
		},
		{
			nutId: 3,
			image: require("../../assets/images/ai/비타민D.png"),
			nutrient: "비타민 D",
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
      nutId: 9,
      image: require("../../assets/images/ai/아연.png"),
      nutrient: "아연",
    },
    {
			nutId: 8,
      image: require("../../assets/images/ai/루테인.png"),
      nutrient: "루테인",
    },
    {
			nutId: 11,
      image: require("../../assets/images/ai/콜라겐.png"),
      nutrient: "콜라겐",
    },
		{
			nutId: 7,
			image: require("../../assets/images/ai/밀크시슬.png"),
			nutrient: "밀크시슬",
		},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titlecontainer}>
        <View style={styles.marginLeft}>
          <GoBackBtn
            onPress={() => navigation.goBack()}
            size={33}
          />
        </View>
        <Text style={{...styles.text, fontFamily: "웰컴체_Bold"}}>영양 성분</Text>
        <View style={styles.empty} />
      </View>
      <View style={styles.cardscontainer}>
        {mainNutrients.map((mainNutrient, idx) => (
          <Pressable
            key={idx}
            onPress={() =>
              navigation.navigate("AiQnaScreen", {
                nutId: mainNutrient.nutId,
                nutrient: mainNutrient.nutrient,
                stretch: -1,
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
    marginTop: 15,
    paddingBottom: 15,
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
  empty: {
    width: 33,
    marginRight: 10,
  },
  text: {
    fontSize: 24,
  },
  cardscontainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});

export default AiNutrient;
