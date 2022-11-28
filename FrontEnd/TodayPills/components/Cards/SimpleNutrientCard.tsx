import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
} from "react-native";

interface NutrientProps {
  image: ImageSourcePropType;
  nutId: number;
  nutrient: string;
}

const SimpleNutrientCard = (props: NutrientProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image source={props.image} style={styles.image} />
      </View>
      <Text style={{ ...styles.text, fontFamily: "웰컴체_Regular" }}>
        {props.nutrient}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 90,
    borderRadius: 25,
    backgroundColor: "white",
    elevation: 7,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  imagecontainer: {
    width: 60,
    height: 60,
  },
  image: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  text: {
    fontSize: 15,
    // fontWeight: "bold",
  },
});

export default SimpleNutrientCard;
