import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ToastAndroid,
  FlatList,
} from 'react-native';
import DetailedPillCard from '../../components/Cards/DetailedPillCard';
import Card from '../../components/UI/Card';
import BackgroundScreen2 from '../BackgroundScreen2';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAllSupplements } from '../../API/supplementAPI';
import { useFocusEffect } from '@react-navigation/native';
import { boldWelcome } from '../../components/Data/fontFamilyObject';
import pillKOtoEN from '../../components/Data/pillKOtoEN';
import GoBackBtn from '../../components/UI/GoBackBtn';
import getNutrientImage from '../../components/Data/getNutrientImage';

const NutrientScreen = ({ navigation, route }: any) => {
  const { nutId, nutrient } = route.params;
  const [userId, setUserId] = useState(0);
  const [pills, setPills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllSupplements = async () => {
    const currentUserId = await AsyncStorage.getItem('@storage_UserId');
    setUserId(parseInt(currentUserId));
    const allSupplements = await fetchAllSupplements();
    const supplements = allSupplements.filter((i) => i.category === nutrient);
    await setPills(supplements);
  };

  useFocusEffect(
    useCallback(() => {
      getAllSupplements();
    }, [userId])
  );

  useEffect(() => {
    if (pills.length > 0) {
      setIsLoading(false);
      if (isLoading) {
        ToastAndroid.show(
          `${nutrient} 영양제가 ${pills.length}개 있습니다.`,
          3
        );
      }
    }
  }, [pills]);

  return (
    <BackgroundScreen2>
      <Card>
        <View style={styles.container}>
          <View style={styles.titleback}>
            <View style={styles.backBtn}>
              <GoBackBtn
                size={30}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </View>
            <Text style={{ ...styles.text, ...boldWelcome, letterSpacing: 1 }}>
              {nutrient}
            </Text>
          </View>
          <View style={styles.btnGroup}>
            <View style={styles.buttonOuterContainer}>
              <Pressable
                android_ripple={{ color: '#4E736F' }}
                style={styles.buttonInnerContainer}
                onPress={async () => {
                  await AsyncStorage.setItem('@storage_nowNutrient', nutrient);
                  navigation.navigate('NutrientDetailScreen', {
                    nutrient: [nutrient],
                  });
                }}
              >
                <Text
                  style={{ ...styles.title, ...boldWelcome, letterSpacing: 1 }}
                >
                  영양제 추천받기
                </Text>
              </Pressable>
            </View>
            <View style={styles.buttonOuterContainer}>
              <Pressable
                android_ripple={{ color: '#4E736F' }}
                style={styles.buttonInnerContainer}
                onPress={async () => {
                  await navigation.jumpTo('ChatScreen');
                  await navigation.navigate('ChatScreenDetail', {
                    nutId: nutId,
                    nutrient: pillKOtoEN.get(nutrient),
                    nutrientName: nutrient,
                    nutrientImage: getNutrientImage.get(nutrient),
                  });
                }}
              >
                <Text
                  style={{ ...styles.title, ...boldWelcome, letterSpacing: 1 }}
                >
                  채팅방 접속
                </Text>
              </Pressable>
            </View>
          </View>
          {isLoading ? (
            <View style={styles.loadingspinnercontainer}>
              <Image
                source={require('../../assets/images/loadingspinner.gif')}
                style={styles.loadingspinner}
              />
            </View>
          ) : (
            <FlatList
              data={pills}
              renderItem={({ item }) => {
                return (
                  <DetailedPillCard
                    key={item.supplementId}
                    userId={userId}
                    supplementId={item.supplementId}
                    image={item.image}
                    brand={item.brand}
                    supplementName={item.supplementName}
                    like={item.like}
                    note={item.note}
                    additionalEfficacy={item.additionalEfficacy}
                    ingredients={item.ingredients}
                    caution={item.caution}
                    isMain={true}
                    navigation={navigation}
                    category={item.category}
                    amount={item.amount}
                    requiredCount={item.requiredCount}
                    formula={item.formula}
                  />
                );
              }}
            />
          )}
        </View>
      </Card>
    </BackgroundScreen2>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    // fontWeight: "bold",
    marginLeft: 20,
    marginTop: 30,
  },
  buttonOuterContainer: {
    borderRadius: 10,
    width: '35%',
    marginLeft: 20,
    overflow: 'hidden',
    marginVertical: 10,
    elevation: 10,
  },
  buttonInnerContainer: {
    paddingVertical: 7,
    backgroundColor: '#8EE8DE',
  },
  title: {
    fontSize: 15,
    // fontWeight: "bold",
    textAlign: 'center',
    color: 'white',
  },
  loadingspinnercontainer: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingspinner: {
    width: 200,
    height: 200,
  },
  height: {
    height: 120,
  },
  btnGroup: { flexDirection: 'row' },
  titleback: { flexDirection: 'row' },
  backBtn: { position: 'relative', top: 23, marginRight: -20 },
});

export default NutrientScreen;
