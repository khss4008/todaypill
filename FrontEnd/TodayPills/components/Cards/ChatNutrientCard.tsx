import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';

interface NutrientProps {
  image: ImageSourcePropType;
  nutId: number;
  nutrient: string;
}
const ChatNutrientCard = (props: NutrientProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={props.image} style={styles.image} />
      </View>
      <View style={styles.textGroup}>
        <Text style={styles.title}>{`${props.nutrient}  `}</Text>
        <Text style={{fontFamily: "웰컴체_Regular", fontSize: 17}}>{`채팅방`}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: 'white',
    width: 350,
    height: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 7,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  textGroup: { flexDirection: 'row' },
  title: { color: '#a2a3f5', fontFamily: "웰컴체_Bold", fontSize: 17, },
  image: { width: 100, height: 100, transform: [{ scale: 0.5 }] },
});
export default ChatNutrientCard;
