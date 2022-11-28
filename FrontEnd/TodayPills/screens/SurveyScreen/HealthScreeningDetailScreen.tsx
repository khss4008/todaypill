import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
  Pressable,
} from 'react-native';
import CustomBtn from '../../components/UI/CustomBtn';
import { accent } from '../../constants/Colors';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HealthScreeningCheck } from '../../API/userAPI';
import BackgroundScreen2 from '../BackgroundScreen2';
import LoadingSpinnerWithText from '../../components/UI/LoadingSpinnerWithText';
import GoBackBtn from '../../components/UI/GoBackBtn';
import { boldWelcome } from '../../components/Data/fontFamilyObject';
const HealthScreeningDetailScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {isLoading && <LoadingSpinnerWithText />}
      {!isLoading && (
        <BackgroundScreen2>
          <ScrollView style={styles.container}>
            {/* <Ionicons
              name="arrow-back"
              size={48}
              color="black"
              style={styles.icon}
              onPress={() => {
                navigation.goBack();
              }}
            /> */}
            <View style={styles.textcontainer}>
              <View style={{ marginLeft: 20 }}>
                <GoBackBtn
                  size={48}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              </View>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <Text
                  style={{
                    ...styles.text,
                    ...styles.largetext,
                    ...boldWelcome,
                  }}
                >
                  건강 검진 결과 분석을 위해
                </Text>
                <Text
                  style={{
                    ...styles.text,
                    ...styles.largetext,
                    ...boldWelcome,
                  }}
                >
                  본인 정보를 입력해주세요
                </Text>
              </View>
              {/* <Text style={[styles.text, styles.smalltext]}>
            흡연할 경우 조심해야 할 성분이 있어요
          </Text> */}
            </View>
            <View style={styles.inputTextContainer}>
              <View style={styles.textBox}>
                <Text>이름</Text>
                <TextInput
                  style={styles.inputText}
                  placeholder="홍길동"
                  onChangeText={(text) => {
                    setName(text);
                  }}
                />
              </View>
              <View style={styles.textBox}>
                <Text>생년원일</Text>
                <TextInput
                  style={styles.inputText}
                  placeholder="19960621"
                  onChangeText={(text) => {
                    setBirth(text);
                  }}
                />
              </View>
              <View style={styles.textBox}>
                <Text>핸드폰 번호</Text>
                <TextInput
                  style={styles.inputText}
                  placeholder="01038819667(-제외)"
                  onChangeText={(text) => {
                    setPhone(text);
                  }}
                />
              </View>
            </View>
            <View style={styles.buttoncontainer}>
              <View style={styles.buttonOuterContainer}>
                <Pressable
                  android_ripple={{ color: '#4E736F' }}
                  style={styles.buttonInnerContainer}
                  onPress={async () => {
                    console.log(name, 'what');
                    const nameRegex1 = /[A-Za-z가-힣]{1,20}/g;
                    const nameRegex2 =
                      /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"0-9]/g;

                    if (!name.match(nameRegex1) || name.match(nameRegex2)) {
                      ToastAndroid.show(
                        '정상적인 이름을 작성해주세요',
                        ToastAndroid.SHORT
                      );
                      return;
                    }
                    const birthRegex1 = /[0-9]{8}/g;
                    const birthRegex2 =
                      /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"0-9]/g;

                    if (!birth.match(birthRegex1) || name.match(birthRegex2)) {
                      ToastAndroid.show(
                        '올바른 생일을 입력해주세요',
                        ToastAndroid.SHORT
                      );
                      return;
                    }
                    const phoneRegex1 = /[0-9]{11}/g;
                    const phoneRegex2 =
                      /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"0-9]/g;

                    if (!phone.match(phoneRegex1) || name.match(phoneRegex2)) {
                      ToastAndroid.show(
                        '올바른 핸드폰 번호를 입력해주세요',
                        ToastAndroid.SHORT
                      );
                      return;
                    }
                    setIsLoading(true);
                    try {
                      await AsyncStorage.setItem('@storage_userName', name);
                      await AsyncStorage.setItem('@storage_userBirth', birth);
                      await AsyncStorage.setItem('@storage_userPhone', phone);
                      const email = await AsyncStorage.getItem(
                        '@storage_UserEmail'
                      );
                      const result = await HealthScreeningCheck(
                        birth,
                        email,
                        phone,
                        name
                      );
                      setIsLoading(false);
                      if (result.data) navigation.replace('FirstAddSurvey');
                      else navigation.replace('HealthScreeningFail');
                    } catch {
                      ToastAndroid.show(
                        '인증에 실패 하였습니다.',
                        ToastAndroid.SHORT
                      );
                      setIsLoading(false);
                      navigation.navigate('HealthScreeningDetailScreen');
                    }
                  }}
                >
                  <Text style={styles.title}>다음</Text>
                </Pressable>
              </View>
            </View>
            {/* <View style={styles.customBtnView}>
              <CustomBtn
                buttonColor={accent}
                title={'확인'}
                titleColor={'#fff'}
                fontSize={20}
                buttonWidth={'70%'}
                onPress={async () => {
                  console.log(name, 'what');
                  const nameRegex1 = /[A-Za-z가-힣]{1,20}/g;
                  const nameRegex2 =
                    /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"0-9]/g;

                  if (!name.match(nameRegex1) || name.match(nameRegex2)) {
                    ToastAndroid.show(
                      '정상적인 이름을 작성해주세요',
                      ToastAndroid.SHORT
                    );
                    return;
                  }
                  const birthRegex1 = /[0-9]{8}/g;
                  const birthRegex2 =
                    /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"0-9]/g;

                  if (!birth.match(birthRegex1) || name.match(birthRegex2)) {
                    ToastAndroid.show(
                      '올바른 생일을 입력해주세요',
                      ToastAndroid.SHORT
                    );
                    return;
                  }
                  const phoneRegex1 = /[0-9]{11}/g;
                  const phoneRegex2 =
                    /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"0-9]/g;

                  if (!phone.match(phoneRegex1) || name.match(phoneRegex2)) {
                    ToastAndroid.show(
                      '올바른 핸드폰 번호를 입력해주세요',
                      ToastAndroid.SHORT
                    );
                    return;
                  }
                  setIsLoading(true);
                  try {
                    await AsyncStorage.setItem('@storage_userName', name);
                    await AsyncStorage.setItem('@storage_userBirth', birth);
                    await AsyncStorage.setItem('@storage_userPhone', phone);
                    const email = await AsyncStorage.getItem(
                      '@storage_UserEmail'
                    );
                    const result = await HealthScreeningCheck(
                      birth,
                      email,
                      phone,
                      name
                    );
                    setIsLoading(false);
                    navigation.navigate('FirstAddSurvey');
                  } catch {
                    ToastAndroid.show(
                      '인증에 실패 하였습니다.',
                      ToastAndroid.SHORT
                    );
                    setIsLoading(false);
                    navigation.navigate('HealthScreeningDetailScreen');
                  }
                }}
              />
            </View> */}
          </ScrollView>
        </BackgroundScreen2>
      )}
    </>
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
  },
  textcontainer: {
    // alignItems: 'center',
  },
  text: {
    // fontWeight: 'bold',
    // textShadowColor: 'rgba(0, 0, 0, 0.25)',
    // textShadowOffset: { width: 2, height: 2 },
    // textShadowRadius: 1,
  },
  largetext: {
    fontSize: 24,
  },
  greytext: {
    color: 'black',
    fontSize: 30,
  },
  inputTextContainer: {
    padding: 40,
  },
  textBox: { marginBottom: 40 },
  inputText: {
    fontSize: 25,
    borderBottomWidth: 1,
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
  backBtn: {
    position: 'relative',
    bottom: 10,
  },
});
export default HealthScreeningDetailScreen;
