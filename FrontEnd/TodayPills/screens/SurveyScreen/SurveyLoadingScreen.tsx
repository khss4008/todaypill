import { useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { afterBasicSurvey, afterScreeningCheck } from '../../API/userAPI';
import BackgroundScreen2 from '../BackgroundScreen2';
import {
  boldWelcome,
  regularWelcome,
} from '../../components/Data/fontFamilyObject';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SurveyLoadingScreen = ({ navigation, route }: any) => {
  useEffect(() => {
    let size = Object.keys(route.params.answerSheet).length;
    if (size > 5) afterBasicSurvey(route.params.answerSheet);
    else afterScreeningCheck(route.params.answerSheet);
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
            onPress={() => navigation.navigate('PersonalRecommendationScreen')}
          >
            <Text style={styles.title}>다음</Text>
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
export default SurveyLoadingScreen;
