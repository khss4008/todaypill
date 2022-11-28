import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import BackgroundScreen from '../BackgroundScreen';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import AnswerSurvey from '../../components/Cards/AnswerSurvey';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SurveyQuestion from '../../components/Data/SurveyAdditionalEfficiency';
import SurveyFormula from '../../components/Data/SurveyFormula';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import BackgroundScreen2 from '../BackgroundScreen2';
import GoBackBtn from '../../components/UI/GoBackBtn';
import {
  boldWelcome,
  regularWelcome,
} from '../../components/Data/fontFamilyObject';

const SecondAddSurvey = ({ navigation }: any) => {
  const [selectedItem, setSelectedItem] = useState<any>(1);
  const [nowStage, setNowStage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [answerSheet, setAnswerSheet] = useState<any>({
    lowerPriceLimit: 0,
    upperPriceLimit: 0,
    additionalEfficacy: '',
    formula: '',
    sustainedRelease: false,
  });
  const surveyData = [
    ['lowerPriceLimit', '원하는 가격대를 설정해주세요.', ''],
    [
      'additionalEfficacy',
      '추가로 원하는 효과가 있나요?',
      '중복 선택 가능합니다.',
      [
        '해당없음',
        '스트레스 완화',
        '기억력 증진',
        '혈액 순환',
        '에너지 증진',
        '근육통 완화',
        '면역 증진',
        '신경통 완화',
        '관절 건강',
        '다이어트',
        '질 건강',
      ],
    ],
    [
      'formula',
      '원하는 약의 형태를 선택해주세요.',
      '',
      ['해당없음', '캡슐형', '츄어블', '액체형', '파우더형', '스프레이형'],
    ],
    [
      'sustainedRelease',
      '서방형 제제를 원하세요?',
      '서방형 제제란 영양제 성분이 천천히 방출되게끔 만든 형태를 말해요. 더 자세한 정보는 AI 분석 탭에서 확인해보실 수 있어요.',
      ['YES', 'NO'],
    ],
    [],
  ];
  useEffect(() => {
    if (nowStage === surveyData.length - 1) {
      // navigation.navigate('SurveyDeepLoadingScreen', {
      //   answerSheet: answerSheet,
      // });
      navigation.replace('SurveyDeepLoadingScreen', {
        answerSheet: answerSheet,
      });
    }
  }, [answerSheet]);
  return (
    <BackgroundScreen2>
      <View style={styles.container}>
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <>
            {/* <Ionicons
              name="arrow-back"
              size={48}
              color="black"
              style={styles.icon}
              onPress={() => {
                navigation.goBack();
              }}
            /> */}
            <View style={{ marginLeft: 20 }}>
              <GoBackBtn
                size={48}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </View>
            <View style={styles.textcontainer}>
              <Text
                style={{ ...styles.text, ...styles.largetext, ...boldWelcome }}
              >
                {surveyData[nowStage][1]}
              </Text>
              <Text
                style={{
                  ...styles.text,
                  ...styles.smalltext,
                  ...regularWelcome,
                }}
              >
                {surveyData[nowStage][2]}
              </Text>
            </View>
            <ScrollView>
              <AnswerSurvey
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                nowStage={nowStage}
                surveyData={surveyData}
              />
            </ScrollView>
            <View style={styles.buttoncontainer}>
              <View style={styles.buttonOuterContainer}>
                <Pressable
                  android_ripple={{ color: '#4E736F' }}
                  style={styles.buttonInnerContainer}
                  onPress={async () => {
                    console.log(answerSheet);
                    let uid = await AsyncStorage.getItem('@storage_UserId');
                    let uemail = await AsyncStorage.getItem(
                      '@storage_UserEmail'
                    );
                    let nowSelectedNutrient = await AsyncStorage.getItem(
                      '@storage_nowNutrient'
                    );
                    if (nowSelectedNutrient === '오메가 3')
                      nowSelectedNutrient = '오메가3';
                    setNowStage(nowStage + 1);
                    let answer: boolean | number | string;
                    if (nowStage === 0) {
                      // let price = selectedItem.split(" ");
                      // answer = price;
                      if (selectedItem === 1) answer = '';
                      else answer = selectedItem.split(' ');
                    } else if (nowStage === 1 || nowStage === 2) {
                      // answer = SurveyQuestion.get(selectedItem);
                      answer = selectedItem;
                      console.log(answer, 'what!!!');
                      if (!answer || answer === ' ') {
                        setNowStage(nowStage);
                        ToastAndroid.show('선택 해주세요', ToastAndroid.SHORT);
                        return;
                      }
                    } else if (surveyData[nowStage][3]) {
                      selectedItem == 0 ? (answer = false) : (answer = true);
                    } else answer = selectedItem;
                    if (nowStage === surveyData.length - 2) setIsLoading(true);
                    if (nowStage !== 0) {
                      setAnswerSheet({
                        userId: uid,
                        email: uemail,
                        category: nowSelectedNutrient,
                        ...answerSheet,
                        [`${surveyData[nowStage][0]}`]: answer,
                      });
                    } else {
                      console.log(answer[0], answer[1], 'answer');
                      if (!answer[0] || !answer[1]) {
                        setNowStage(nowStage);
                        ToastAndroid.show(
                          '가격을 입력해주세요',
                          ToastAndroid.SHORT
                        );
                        return;
                      }
                      if (Number(answer[0]) > Number(answer[1])) {
                        setNowStage(nowStage);
                        ToastAndroid.show(
                          '최소 가격이 더 큽니다.',
                          ToastAndroid.SHORT
                        );
                        return;
                      }
                      setAnswerSheet({
                        userId: uid,
                        email: uemail,
                        category: nowSelectedNutrient,
                        ...answerSheet,
                        lowerPriceLimit: Number(answer[0]),
                        upperPriceLimit: Number(answer[1]),
                        // [`${surveyData[nowStage][0]}`]: answer,
                      });
                    }
                    if (nowStage === 0 || nowStage === 1) setSelectedItem('');
                    else setSelectedItem(1);
                  }}
                >
                  <Text style={{ ...styles.title, ...boldWelcome }}>다 음</Text>
                </Pressable>
              </View>
            </View>
          </>
        )}
      </View>
    </BackgroundScreen2>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-around",
    // alignItems: "center",
  },
  icon: {
    marginLeft: 10,
    marginBottom: 10,
  },
  textcontainer: {
    marginLeft: 30,
    height: '15%',
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
  },
  largetext: {
    fontSize: 24,
  },
  smalltext: {
    fontSize: 13,
    marginTop: 10,
    marginRight: 10,
  },
  itemcontainer: {
    width: '100%',
    alignItems: 'center',
  },
  itemoutercontainer: {
    borderRadius: 10,
    width: '80%',
    height: 80,
    overflow: 'hidden',
    marginVertical: 10,
    elevation: 10,
  },
  iteminnercontainer: {
    paddingVertical: 25,
    backgroundColor: '#E5E5E5',
  },
  iteminnercontainerClicked: {
    paddingVertical: 25,
    backgroundColor: 'rgba(142,232,222,0.95)',
  },
  itemflex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 25,
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
  icon1: {
    marginRight: 20,
  },
});
export default SecondAddSurvey;
