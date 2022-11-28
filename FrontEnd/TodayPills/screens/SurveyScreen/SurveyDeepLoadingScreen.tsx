import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { afterSecondSurvey } from '../../API/userAPI';
import {
  boldWelcome,
  regularWelcome,
} from '../../components/Data/fontFamilyObject';
import BackgroundScreen from '../BackgroundScreen';
import BackgroundScreen2 from '../BackgroundScreen2';

const SurveyDeepLoadingScreen = ({ navigation, route }: any) => {
  const [nowMyNutrient, setNowMyNutrient] = useState('');
  const [itemList, setItemList] = useState([]);
  const getMyNowNutrient = async () => {
    const nutrient = await AsyncStorage.getItem('@storage_nowNutrient');
    setNowMyNutrient(nutrient);
  };
  const getResult = async () => {
    // console.log(route.params.answerSheet, "hah!");
    let arr = await afterSecondSurvey(route.params.answerSheet);
    console.log(route.params.answerSheet);
    setItemList([...itemList, arr]);
  };
  useEffect(() => {
    getMyNowNutrient();
    // afterSecondSurvey(route.params.answerSheet).then((res) =>
    //   console.log(res, "haha")
    // );
    getResult();
  }, []);
  return (
    <BackgroundScreen2>
      <View style={styles.container}>
        <View style={styles.textcontainer}>
          <Text
            style={{
              ...styles.text,
              ...styles.greetingtext,
              ...styles.blacktext,
              ...regularWelcome,
            }}
          >
            맞춤 추천이 완료되었습니다.
          </Text>
        </View>
        <View style={styles.imagecontainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/surveyResult.png')}
          />
        </View>
        <View style={styles.buttonOuterContainer}>
          <Pressable
            android_ripple={{ color: '#4E736F' }}
            style={styles.buttonInnerContainer}
            onPress={() =>
              navigation.navigate('PillResultScreen', {
                answerSheet: itemList,
              })
            }
          >
            <Text style={{ ...styles.title, ...boldWelcome }}>다음</Text>
          </Pressable>
        </View>
      </View>
    </BackgroundScreen2>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imagecontainer: {
    width: 100,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  textcontainer: {
    alignItems: 'center',
  },
  text: {
    // textShadowColor: 'rgba(0, 0, 0, 0.25)',
    // textShadowOffset: { width: 2, height: 2 },
    // textShadowRadius: 1,
  },
  greetingtext: {
    fontSize: 25,
    marginBottom: 10,
  },
  nametext: {
    fontSize: 40,
  },
  blacktext: {
    color: 'black',
  },
  whitetext: {
    color: 'white',
  },
  flexrow: {
    flexDirection: 'row',
  },
  buttoncontainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonOuterContainer: {
    borderRadius: 10,
    width: '80%',
    overflow: 'hidden',
    marginVertical: 10,
    elevation: 10,
  },
  buttonInnerContainer: {
    paddingVertical: 10,
    backgroundColor: '#E881B1',
  },
  title: {
    fontSize: 22,
    fontFamily: '웰컴체_Regular',
    textAlign: 'center',
    color: 'white',
  },
});

export default SurveyDeepLoadingScreen;
