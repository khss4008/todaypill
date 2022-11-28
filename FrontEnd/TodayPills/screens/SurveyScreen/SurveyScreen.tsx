import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import { useCallback, useState } from 'react';
import AnswerSurvey from '../../components/Cards/AnswerSurvey';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import BackgroundScreen2 from '../BackgroundScreen2';
import GoBackBtn from '../../components/UI/GoBackBtn';
import {
  boldWelcome,
  regularWelcome,
} from '../../components/Data/fontFamilyObject';

const SurveyScreen = ({ navigation }: any) => {
  const [selectedItem, setSelectedItem] = useState(1);
  const [nowStage, setNowStage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [answerSheet, setAnswerSheet] = useState<any>({
    smoking: false,
    pregnant: false,
    menopause: false,
    allergy: '',
    drink: 0,
    symptom: '',
    disease: '',
    medicine: '',
    outdoor_activity: 0,
    toughActivity: false,
    balanced_meal: false,
    lack: '',
    is_ok_big_pill: false,
    preferred_brand: '',
    problem: '',
  });
  const surveyData = [
    [
      'pregnant',
      '임신 가능성이 있으신가요?',
      '임신 계획이 있거나 현재 임신 중인 경우 이를 고려해 더욱 세심하게 영양제를 추천해드릴게요.',
      ['YES', 'NO'],
    ],
    [
      'menopause',
      '폐경기를 지나셨나요?',
      '그에 따른 영양성분이 추천됩니다.',
      ['YES', 'NO'],
    ],
    [
      'smoking',
      '흡연 여부를 알려주세요.',
      '흡연자는 비흡연자보다 일부 영양소가 결핍될 확률이 더 높습니다.',
      ['YES', 'NO'],
    ],
    [
      'drink',
      '음주 습관에 대해 알려주세요.',
      '',
      ['술을 마시지 않음', '한달에 1~2회', '일주일에 1~2회', '일주일에 3회'],
    ],
    [
      'allergy',
      '알러지가 있나요?',
      '',
      [
        '해당없음',
        '꽃가루',
        '벌',
        '고양이',
        '비염',
        '허브',
        '생선',
        '계란',
        '기타',
      ],
    ],
    [
      'symptom',
      '다음 중 해당하는 증상이 있다면 선택해주세요.',
      '중복 선택 가능합니다.',
      [
        '해당없음',
        '속쓰림',
        '변비',
        '설사',
        '소화장애',
        '요통',
        '편두통',
        '과민성 대장군 증후군',
        '아토피 피부염',
        '비듬',
        '야간 다리 경련',
        '구내염',
      ],
    ],
    [
      'disease',
      '다음 중 해당하는 질환을 앓고 계신다면 선택해주세요.',
      '중복 선택 가능합니다.',
      [
        '해당없음',
        '빈혈',
        '갑상선 질환',
        '신장 질환',
        '당뇨병',
        '통풍',
        '고혈압',
        '고지혈증',
        '치주염',
        '심부전',
        '기타',
      ],
    ],
    [
      'medicine',
      '다음 중 복용중인 약이 있으시다면 선택해주세요.',
      '중복 선택 가능합니다.',
      [
        '해당없음',
        '피임약',
        '제산제',
        '혈압약',
        '이뇨제',
        '부정맥(소타롤)',
        '항경련제(가바펜틴)',
        '레보티록신(갑상선)',
        '항생제',
      ],
    ],
    [
      'toughActivity',
      '평소 격렬한 신체 활동을 하는 편인가요?',
      '근육통을 줄일 수 있는지 알아봐드릴게요.',
      ['YES', 'NO'],
    ],
    [
      'outdoor_activity',
      '충분한 양의 햇빛을 쬐고 계신가요?',
      '자외선 차단제를 사용하지 않은 상태에서 팔과 다리를 모두 노출하고 일주일에 4회이상, 하루 20분 이상 햇볕을 쬐면 충분하다고 말할 수 있어요.',
      [
        '충분한 양의 햇볕을 쬔다',
        '종종 햇볕을 쬔다',
        '가끔 햇볕을 쬔다',
        '거의 햇볕을 쬐지 않는다',
      ],
    ],
    ['balanced_meal', '평소 균형잡힌 식사를 하시나요?', '', ['YES', 'NO']],
    [
      'lack',
      '평소 먹는 음식을 알려주세요',
      '복수 선택 가능합니다.',
      ['채소', '생선', '육류', '과일'],
    ],
    [
      'is_ok_big_pill',
      '큰 알약을 삼키는데 불편함이 없으신가요?',
      '',
      ['YES', 'NO'],
    ],
    [
      'preferred_brand',
      '선호하는 영양제 브랜드가 있나요?',
      '중복 선택 가능합니다.',
      [
        '해당없음',
        '고려은단',
        '뉴트리코어',
        '종근당',
        'GC녹십자',
        '제일헬스사이언스',
        '하루틴',
        'solgar',
        'natural factors',
        'life extension',
        "Doctor's Best",
        '21st Century',
        'Thorne Research',
        'NOW Foods',
        'MegaFood',
        'Rainbow Light',
        'Jarrow Formulas',
        'Source Naturals',
        '기타',
      ],
    ],
    [
      'problem',
      '해결하고자 하는 문제가 있나요?',
      '중복 선택 가능합니다.',
      [
        '해당없음',
        '면역력 개선',
        '암, 심혈관 질환 예방',
        '치매 예방',
        '식후 혈당 관리',
        '콜레스테롤 수치 개선',
        '관절 통증',
        '뼈 건강',
        '간 건강',
        '우울감',
        'PMS, 월경통',
        '빈혈',
        '수면',
        '눈 건강',
        '청력 보호',
        '주름 개선',
        '모발 건강',
        '기타',
      ],
    ],
    [],
  ];
  const checkGender = async () => {
    let nowGender = await AsyncStorage.getItem('@storage_UserGender');
    if (nowGender === '남성') {
      setNowStage(2);
    } else {
      setSelectedItem(1);
    }
  };
  // useEffect(() => {
  //   checkGender();
  // }, []);
  useFocusEffect(
    useCallback(() => {
      checkGender();
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      if (nowStage === surveyData.length - 1) {
        // navigation.navigate('SurveyLoadingScreen', {
        //   answerSheet: answerSheet,
        // });
        navigation.replace('SurveyLoadingScreen', {
          answerSheet: answerSheet,
        });
      }
    }, [answerSheet])
  );
  // useEffect(() => {
  //   if (nowStage === surveyData.length - 1) {
  //     console.log(answerSheet);
  //     navigation.navigate("SurveyLoadingScreen", { answerSheet: answerSheet });
  //   }
  // }, [answerSheet]);
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
                style={{
                  ...styles.text,
                  ...styles.largetext,
                  ...boldWelcome,
                  width: '80%',
                }}
              >
                {surveyData[nowStage][1]}
              </Text>
              <Text
                style={{
                  ...styles.text,
                  ...styles.smalltext,
                  ...regularWelcome,
                  width: '80%',
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
                    let uid = '';
                    uid = await AsyncStorage.getItem('@storage_UserId');
                    setNowStage(nowStage + 1);
                    let answer: boolean | number | string;
                    //균형잡힌 식사 관련 질문
                    if (nowStage === 10 && selectedItem === 0) {
                      setNowStage(nowStage + 2);
                    }
                    //복수선택
                    if (
                      nowStage === 4 ||
                      nowStage === 5 ||
                      nowStage === 6 ||
                      nowStage === 7 ||
                      nowStage === 11 ||
                      nowStage === 13 ||
                      nowStage === 14
                    ) {
                      answer = selectedItem;
                      if (answer === 1 || !answer) {
                        setNowStage(nowStage);
                        ToastAndroid.show('선택 해주세요', ToastAndroid.SHORT);
                        return;
                      }
                    } else if (nowStage === 3 || nowStage === 9) {
                      console.log(selectedItem);
                      if (!selectedItem && selectedItem !== 0) {
                        setNowStage(nowStage);
                        ToastAndroid.show('선택 해주세요', ToastAndroid.SHORT);
                      } else {
                        answer = selectedItem;
                      }
                    } else if (surveyData[nowStage][3]) {
                      selectedItem == 0 ? (answer = true) : (answer = false);
                      if (nowStage === 3 || nowStage === 9) {
                        answer = selectedItem;
                      }
                    } else answer = selectedItem;
                    if (nowStage === surveyData.length - 2 && answer !== 1)
                      setIsLoading(true);
                    setAnswerSheet({
                      userId: Number(uid),
                      ...answerSheet,
                      [`${surveyData[nowStage][0]}`]: answer,
                    });
                    console.log(answerSheet);
                    // if (nowStage == 6) setSelectedItem(0);
                    // else setSelectedItem(1);
                  }}
                >
                  <Text style={{ ...styles.title, ...boldWelcome }}>다음</Text>
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
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
    height: '15%',
  },
  text: {
    // fontWeight: 'bold',
    color: 'black',
  },
  largetext: {
    fontSize: 24,
  },
  smalltext: {
    fontSize: 15,
    marginTop: 10,
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

export default SurveyScreen;
