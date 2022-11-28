import BackgroundScreen2 from '../BackgroundScreen2';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { regularWelcome } from '../../components/Data/fontFamilyObject';
const HealthScreeningFail = ({ navigation }: any) => {
  const text1 = '최근 10년 이내에 국가 건강검진을 받으신 적이 없네요.';
  const text2 = '설문조사를 통해 필요한 영양소를 추천해드릴게요';
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
              fontSize: 40,
            }}
          >
            {'건강검진 결과'}
          </Text>
        </View>
        <View style={styles.imagecontainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/surveyFail.png')}
          />
        </View>
        <View style={styles.textcontainer}>
          <Text
            style={{
              ...styles.text,
              ...styles.greetingtext,
              ...styles.blacktext,
              ...regularWelcome,
            }}
          >
            {text1 + text2}
          </Text>
        </View>
        <View style={styles.buttonOuterContainer}>
          <Pressable
            android_ripple={{ color: '#4E736F' }}
            style={styles.buttonInnerContainer}
            onPress={() => navigation.navigate('SurveyScreen')}
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
    fontSize: 18,
    margin: 20,
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
export default HealthScreeningFail;
