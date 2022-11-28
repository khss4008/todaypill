import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getUserInfoByEmail } from '../../API/userAPI';
import NutrientImage from '../../components/Data/NutrientImage';
import CustomBtn from '../../components/UI/CustomBtn';
import { accent } from '../../constants/Colors';
import BackgroundScreen from '../BackgroundScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BackgroundScreen2 from '../BackgroundScreen2';
import {
  boldWelcome,
  regularWelcome,
} from '../../components/Data/fontFamilyObject';

const PersonalRecommendationScreen = ({ navigation }: any) => {
  const [myNutrient, setMyNutrient] = useState([
    '비타민 C',
    '비타민 A',
    '비타민 D',
  ]);
  // const [nutrientImage, setNutrientImage] = useState<string[]>(NutrientImage);
  const [name, setName] = useState('');
  // const str = require("../../assets/images/nutrients/sample1.png");
  const getMyName = async () => {
    const nowName = await AsyncStorage.getItem('@storage_UserNickName');
    setName(nowName);
  };
  const getMyList = async () => {
    const email = await AsyncStorage.getItem('@storage_UserEmail');
    const userInfo = await getUserInfoByEmail(email);
    setMyNutrient([
      userInfo.recommendNutrients[0],
      userInfo.recommendNutrients[1],
      userInfo.recommendNutrients[2],
    ]);
  };
  useEffect(() => {
    getMyList();
    getMyName();
  }, []);
  return (
    <BackgroundScreen2>
      <ScrollView>
        <View style={styles.textContainer}>
          <Text>
            {/* <Text style={{ ...styles.title, ...boldWelcome }}>
              {name.length > 5 ? name.slice(0, 5) + '...  ' : name + ' '}
            </Text> */}
            <Text style={{ ...styles.contentText, ...boldWelcome }}>
              {name.length > 5 ? name.slice(0, 5) + '...  ' : name + ' '}님의
              맞춤 솔루션
            </Text>
          </Text>
        </View>
        {/* <View style={styles.clickBox}>
          <Text style={styles.clickText}>click me</Text>
        </View> */}
        <View style={styles.textGroup}>
          <Text style={{ ...styles.shape, ...regularWelcome }}>
            {myNutrient.map((item, index) => (
              <Text
                key={index}
                onPress={async () => {
                  await AsyncStorage.setItem('@storage_nowNutrient', item);
                  navigation.navigate('NutrientDetailScreen', {
                    nutrient: [item],
                  });
                }}
              >
                <Image source={NutrientImage[index]} style={styles.image} />
                <View style={styles.tagStyle}>
                  <MaterialCommunityIcons
                    style={styles.tagStyle}
                    name="cursor-pointer"
                    size={20}
                    color="black"
                  />
                </View>
              </Text>
            ))}
          </Text>
        </View>
        <View style={styles.pillBox}>
          {/* <ImageBackground
            source={require("../../assets/images/pinkPillBag.png")}
            style={styles.inPillDetail}
            resizeMode="cover"
          > */}
          <View style={styles.pillDetailImage}>
            <Image source={require('../../assets/images/similar.png')} />
          </View>
          <View style={styles.inPillDetail}>
            <View style={styles.inTextContainer}>
              <Text>
                {/* <Text style={{ ...styles.inTitle, ...boldWelcome }}>
                  {name}
                </Text> */}
                <Text style={{ ...boldWelcome, fontSize: 17 }}>
                  {name}님의 추천 영양성분
                </Text>
              </Text>
            </View>
            <View style={styles.listGroup}>
              {myNutrient.map((item, index) => (
                <Text
                  key={index}
                  style={{ ...styles.listText, ...boldWelcome }}
                  onPress={async () => {
                    await AsyncStorage.setItem('@storage_nowNutrient', item);
                    navigation.navigate('NutrientDetailScreen', {
                      nutrient: [item],
                    });
                  }}
                >
                  {'\u2022' + ' ' + item}
                </Text>
              ))}
            </View>
          </View>
          {/* </ImageBackground> */}
        </View>
        {/* <View style={styles.pillCharacter}>
          <Image source={require('../../assets/images/pillCharacter.png')} />
        </View> */}
        <View style={styles.btn}>
          <CustomBtn
            buttonColor={accent}
            title={'홈으로 가기'}
            fontSize={20}
            titleColor={'#fff'}
            buttonWidth={'70%'}
            onPress={() => navigation.navigate('MainScreen')}
          />
        </View>
      </ScrollView>
    </BackgroundScreen2>
  );
};
const styles = StyleSheet.create({
  textContainer: { alignItems: 'center', fontSize: 20 },
  inTextContainer: { fontSize: 10, marginTop: 20, marginLeft: 20 },
  title: { fontWeight: 'bold', fontSize: 22 },
  contentText: { fontSize: 24 },
  inTitle: { fontWeight: 'bold', fontSize: 15 },
  btn: {
    alignItems: 'center',
  },
  textGroup: {
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 30,
  },
  pillDetail: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
  },
  inPillDetail: {
    width: 270,
    // backgroundColor: '#FFE3FF',
    marginVertical: 15,
    marginHorizontal: 30,
    elevation: 15,
    marginTop: 50,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    // borderStyle: 'dashed',
  },
  pillBox: { alignItems: 'center', marginBottom: 80 },
  listGroup: { marginLeft: 25, marginTop: 20 },
  listText: { marginBottom: 15, fontSize: 17 },
  shape: {
    height: 70,
  },
  image: {
    // marginVertical: 5,
    // marginHorizontal: 10,
    // width: 50,
    // height: 50,
    // resizeMode: 'contain',
  },
  pillDetailImage: {
    position: 'relative',
    top: -30,
    width: '15%',
    height: 0,
    // marginLeft: '30%',
    marginTop: '10%',
    marginRight: 230,
    transform: [{ scale: 0.42 }],
  },
  pillCharacter: {
    position: 'relative',
    top: -30,
    width: '15%',
    marginLeft: '20%',
    height: 100,
    transform: [{ scale: 0.15 }],
  },
  clickBox: {
    alignItems: 'center',
    borderWidth: 1,
  },
  clickText: {
    borderWidth: 1,
  },
  tagStyle: { top: 20, right: 30, fontSize: 30 },
});
export default PersonalRecommendationScreen;
