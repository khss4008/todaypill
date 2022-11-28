import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { changeGender } from '../../API/userAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundScreen2 from '../BackgroundScreen2';
import GoBackBtn from '../../components/UI/GoBackBtn';
import {
  boldWelcome,
  regularWelcome,
} from '../../components/Data/fontFamilyObject';

const GenderCheckScreen = ({ navigation }: any) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [nowGender, setNowGender] = useState('');
  return (
    <BackgroundScreen2>
      <View style={styles.container}>
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
          <View style={styles.truetextcontainer}>
            <Text style={{ ...styles.text, ...styles.largetext, ...boldWelcome }}>
              성별을 알려주세요.
            </Text>
            <Text
              style={{ ...styles.text, ...styles.smalltext, ...regularWelcome }}
            >
              철분과 같이 성별에 따라
            </Text>
            <Text
              style={{ ...styles.text, ...styles.smalltext, ...regularWelcome, marginTop: 0 }}
            >
              필요도가 달라지는 영양소가 있어요.
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.itemcontainer}>
            <View style={styles.itemoutercontainer}>
              <Pressable
                android_ripple={{ color: '#4E736F' }}
                style={
                  selectedItem === 1
                    ? styles.iteminnercontainerClicked
                    : styles.iteminnercontainer
                }
                onPress={() => {
                  setNowGender('남성');
                  setSelectedItem(1);
                }}
              >
                <View style={styles.itemflex}>
                  <Text style={styles.itemtitle}>남성</Text>
                  <AntDesign
                    name="checkcircleo"
                    size={24}
                    color="black"
                    style={styles.icon1}
                  />
                </View>
              </Pressable>
            </View>
          </View>
          <View style={styles.itemcontainer}>
            <View style={styles.itemoutercontainer}>
              <Pressable
                android_ripple={{ color: '#4E736F' }}
                style={
                  selectedItem === 2
                    ? styles.iteminnercontainerClicked
                    : styles.iteminnercontainer
                }
                onPress={() => {
                  setSelectedItem(2);
                  setNowGender('여성');
                }}
              >
                <View style={styles.itemflex}>
                  <Text style={styles.itemtitle}>여성</Text>
                  <AntDesign
                    name="checkcircleo"
                    size={24}
                    color="black"
                    style={styles.icon1}
                  />
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttoncontainer}>
          <View style={styles.buttonOuterContainer}>
            <Pressable
              android_ripple={{ color: '#4E736F' }}
              style={styles.buttonInnerContainer}
              onPress={async () => {
                if (selectedItem === 0 || !nowGender) return;
                // console.log(await AsyncStorage.getItem("2s"))
                changeGender(
                  await AsyncStorage.getItem('@storage_UserEmail'),
                  nowGender
                );
                await AsyncStorage.setItem('@storage_UserGender', nowGender);
                navigation.navigate('HealthScreeningCheckScreen');
              }}
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
    // justifyContent: "space-around",
    // alignItems: "center",
  },
  icon: {
    marginLeft: 10,
    marginBottom: 10,
  },
  textcontainer: {
    // marginLeft: 30,
    width: "100%",
  },
  truetextcontainer: {
    // marginLeft: -30,
    width: "100%",
    alignItems: "center",
  },
  text: {
    color: 'black',
    width: "80%",
    // marginLeft: -30,
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
    fontFamily: "웰컴체_Regular",
    textAlign: 'center',
    color: 'white',
  },
  icon1: {
    marginRight: 20,
  },
});
export default GenderCheckScreen;
