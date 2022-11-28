import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import BackgroundScreen2 from '../BackgroundScreen2';

const SurveyStartScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const getMyName = async () => {
    const nowName = await AsyncStorage.getItem('@storage_UserNickName');
    setName(nowName);
  };
  // useEffect(() => {
  //   getMyName();
  // }, []);
  useFocusEffect(
    useCallback(() => {
      getMyName();
    }, [])
  );
  return (
    <BackgroundScreen2>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/survey-intro.png")}
          style={styles.image}
        />
        <View style={styles.textcontainer}>
          <View style={styles.flexrow}>
            <Text style={[styles.text, styles.whitetext]}>{name}&nbsp;</Text>
            <Text style={[styles.text, styles.blacktext]}>님의 건강 설문을 기반으로</Text>
          </View>
          <Text style={[styles.text, styles.blacktext]}>
            필요한 영양 성분을 추천해드릴게요!
          </Text>
        </View>
        {/* <View style={styles.buttonOuterContainer}>
          <Pressable
            android_ripple={{ color: '#4E736F' }}
            style={styles.buttonInnerContainer}
            onPress={() => navigation.navigate('SurveyScreen')}
          >
            <Text style={styles.title}>설문하기</Text>
          </Pressable>
        </View> */}
        <View style={styles.buttoncontainer}>
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
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
    marginTop: -50,
  },
  textcontainer: {
    alignItems: 'center',
    marginTop: -230,
  },
  flexrow: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 24,
    fontFamily: "웰컴체_Bold",
  },
  blacktext: {
    color: 'black',
  },
  whitetext: {
    // color: "white",
    color: '#4E736F',
  },
  // buttonOuterContainer: {
  //   borderRadius: 20,
  //   width: '80%',
  //   marginLeft: 20,
  //   overflow: 'hidden',
  //   marginVertical: 10,
  //   elevation: 10,
  // },
  // buttonInnerContainer: {
  //   paddingVertical: 7,
  //   backgroundColor: '#E881B1',
  // },
  // title: {
  //   fontSize: 35,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   color: 'white',
  // },
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
    fontFamily: "웰컴체_Regular",
    textAlign: 'center',
    color: 'white',
  },
});

export default SurveyStartScreen;
