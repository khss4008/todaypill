import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { afterSecondSurvey } from '../../API/userAPI';
import DetailedPillCard from '../../components/Cards/DetailedPillCard';
import {
  boldWelcome,
  regularWelcome,
} from '../../components/Data/fontFamilyObject';
import CustomBtn from '../../components/UI/CustomBtn';
import GoBackBtn from '../../components/UI/GoBackBtn';
import { accent } from '../../constants/Colors';
import BackgroundScreen from '../BackgroundScreen';
import BackgroundScreen2 from '../BackgroundScreen2';
import BackgroundStartScreen from '../BackgroundStartScreen';

const PillResultScreen = ({ navigation, route }: any) => {
  const [myName, setMyName] = useState('');
  const [nowMyNutrient, setNowMyNutrient] = useState('');
  const [userId, setUserId] = useState(0);
  const [itemList, setItemList] = useState([]);
  const getMyNameAndId = async () => {
    const name = await AsyncStorage.getItem('@storage_UserNickName');
    const currentUserId = await AsyncStorage.getItem('@storage_UserId');
    setUserId(parseInt(currentUserId));
    setMyName(name);
  };
  const getMyNowNutrient = async () => {
    const nutrient = await AsyncStorage.getItem('@storage_nowNutrient');
    setNowMyNutrient(nutrient);
  };
  // const getUserId = async () => {
  //   let id = await AsyncStorage.getItem("@storage_UserId");
  //   setUserId(Number(id));
  // };
  // const getResult = async () => {
  //   await getUserId();
  //   let arr = afterSecondSurvey(route.params.answerSheet);
  //   setItemList([...itemList, arr]);
  //   return arr;
  // };
  useEffect(() => {
    getMyNameAndId();
    getMyNowNutrient();
    // console.log(route.params.answerSheet);
    // getResult();
  }, []);
  return (
    <BackgroundScreen2>
      <ScrollView style={styles.container}>
        {/* <Ionicons
          name="arrow-back"
          size={48}
          color="black"
          style={styles.icon}
          onPress={() => {
            // navigation.goBack();
            navigation.replace("PersonalRecommendationScreen");
          }}
        /> */}
        {/* <View style={{ marginLeft: 5 }}>
        </View> */}
        <View style={styles.titleGroup}>
          <GoBackBtn
            size={48}
            onPress={() => {
              navigation.replace('PersonalRecommendationScreen');
            }}
          />
          <Text style={{ ...styles.title, ...boldWelcome }}>
            {myName} 님의 {nowMyNutrient} 추천
          </Text>
        </View>
        <View>
          {route.params.answerSheet[0] &&
            route.params.answerSheet[0].data.map((item, index) => {
              return (
                <DetailedPillCard
                  supplementId={item.supplementId}
                  supplementName={item.supplementName}
                  brand={item.brand}
                  note={item.note}
                  userId={userId}
                  image={item.image}
                  key={item.supplementId}
                  like={item.like}
                  additionalEfficacy={item.additionalEfficacy}
                  ingredients={item.ingredients}
                  caution={item.caution}
                  isMain={true}
                  navigation={navigation}
                />
              );
            })}
          {route.params.answerSheet[0].data.length === 0 && (
            <View style={styles.titleGroup}>
              <Text style={{ ...styles.content, ...boldWelcome }}>
                검색 결과가 없습니다.
              </Text>
              <Text style={{ ...styles.content2, ...regularWelcome }}>
                영양제는 계속해서 추가될 예정입니다.
              </Text>
            </View>
          )}
        </View>
        <View style={styles.btn}>
          <CustomBtn
            buttonColor={accent}
            title={'영양제 추천 다시 받기!'}
            titleColor={'#fff'}
            fontSize={20}
            buttonWidth={'70%'}
            onPress={() => {
              navigation.navigate('PersonalRecommendationScreen');
            }}
          />
          <CustomBtn
            buttonColor={accent}
            title={'홈으로 가기'}
            titleColor={'#fff'}
            fontSize={20}
            buttonWidth={'70%'}
            onPress={() => {
              navigation.replace('MainScreen');
            }}
          />
        </View>
      </ScrollView>
    </BackgroundScreen2>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    marginLeft: 10,
    marginBottom: 10,
  },
  titleGroup: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 25,
  },
  btn: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  content: {
    fontSize: 20,
    paddingTop: 30,
  },
  content2: {
    fontSize: 20,
    paddingTop: 10,
  },
});

export default PillResultScreen;
