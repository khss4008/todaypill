import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ToastAndroid,
} from 'react-native';
import { updateUsername } from '../../API/userAPI';
import { accent, primary } from '../../constants/Colors';
import { boldWelcome, regularWelcome } from '../Data/fontFamilyObject';
import CustomBtn from '../UI/CustomBtn';
import CustomModal from '../UI/CustomModal';

export default function UpdateNickname({ onChangeName }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState(username);

  const modalCloseHandler = () => {
    setModalVisible(false);
  };

  const cancelHandler = () => {
    modalCloseHandler();
    getCurrentNickname();
  };
  const changeNicknameHandler = async (nickname: string) => {
    // put 요청 닉네임 변경
    if (nickname.length === 0) {
      Alert.alert('수정', '닉네임은 한 글자 이상 가능합니다!');
      return;
    }
    await AsyncStorage.setItem('@storage_UserNickName', nickname);
    const userId = await AsyncStorage.getItem('@storage_UserId');
    await updateUsername(parseInt(userId), nickname);
    setNickname(nickname);
    onChangeName(true);
    await AsyncStorage.setItem('@storage_UserNickName', nickname);
    modalCloseHandler();
    ToastAndroid.show('닉네임 수정이 완료되었습니다.', 2);
  };
  const getCurrentNickname = async () => {
    const currentName = await AsyncStorage.getItem('@storage_UserNickName');
    setNickname(currentName);
  };

  useEffect(() => {
    getCurrentNickname();
  }, []);

  return (
    <>
      <KeyboardAvoidingView behavior="padding">
        <CustomModal
          modalVisible={modalVisible}
          modalCloseHandler={modalCloseHandler}
          customStyle={{ width: '90%', height: 190 }}
        >
          <View style={styles.outerContainer}>
            <View style={styles.nameContainer}>
              <Text style={{ ...styles.nickname, ...boldWelcome }}>
                닉네임 수정
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={{ ...styles.input, ...boldWelcome }}
                // caretHidden={true}
                maxLength={8}
                onChangeText={(updatedNickname) => setNickname(updatedNickname)}
                placeholder="닉네임 입력"
                autoFocus={true}
                value={nickname}
                onSubmitEditing={changeNicknameHandler}
              />
            </View>
            <View style={styles.btnContainer}>
              <Pressable onPress={cancelHandler} style={styles.btn}>
                {({ pressed }) => (
                  <Text
                    style={{
                      ...styles.confirmText,
                      color: pressed ? 'black' : '#B7B7B7',
                      ...regularWelcome,
                    }}
                  >
                    취소
                  </Text>
                )}
              </Pressable>
              <Pressable
                onPress={() => changeNicknameHandler(nickname)}
                style={styles.btn}
              >
                {({ pressed }) => (
                  <Text
                    style={{
                      ...styles.confirmText,
                      color: pressed ? accent : primary,
                      ...regularWelcome,
                    }}
                  >
                    완료
                    {/* {pressed ? 'Pressed!' : 'Press Me'} */}
                  </Text>
                )}
              </Pressable>
            </View>

            {/* <CustomBtn
                buttonColor={accent}
                title={"완료"}
                titleColor={"#fff"}
                fontSize={15}
                buttonWidth={"50%"}
                onPress={modalCloseHandler}
              /> */}
          </View>
        </CustomModal>
      </KeyboardAvoidingView>
      <Pressable
        onPress={() => {
          setModalVisible(true);
          // setTimesPressed((current) => current + 1);
        }}
        style={styles.modifyContainer}
      >
        {({ pressed }) => (
          <Text
            style={
              {
                ...styles.confirmText,
                color: pressed ? 'black' : '#B7B7B7',
                ...regularWelcome,
              }
              // { color: pressed ? "black" : "#B7B7B7" },
            }
          >
            수정
            {/* {pressed ? 'Pressed!' : 'Press Me'} */}
          </Text>
        )}
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
    // paddingBottom: 15,
  },

  nameContainer: {
    flex: 1,
    justifyContent: 'space-between',
    // backgroundColor: "red",
    width: '100%',
    // flexDirection: "row",
    // alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: "center",
    // backgroundColor: "red",
    // marginBottom: 20,
  },
  input: {
    // height: 40,
    width: '90%',
    fontSize: 18,
    // fontWeight: "bold",

    // marginTop: 30,
    paddingBottom: 3,

    // margin: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
  },
  modifyContainer: {
    marginTop: 10,
  },
  confirmText: {
    fontSize: 18,
    // fontWeight: "900",
  },
  // modalContainer: {
  //   width: 0,
  //   height: 0,
  // },
  nickname: {
    fontSize: 20,
    color: '#868686',
    // fontWeight: "900",
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    // buttonColor={accent}
    //             title={"완료"}
    //             titleColor={"#fff"}
    //             fontSize={15}

    flex: 1,
    // width: "50%",
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// likeContainer: {
//   marginVertical: 10,
//   // // flex: 2,
//   // width: "100%",
//   // // height: "30%",
//   // height: 150,
//   // alignItems: "center",
//   // justifyContent: "center",
// },

// myPickContainer: {
//   flexDirection: "row",
// },
// heartContainer: {
//   // width: 50,
//   // height: 50,
//   // paddingBottom: 10,
//   // marginBottom: 5,
//   // position: "absolute",
//   // bottom: 0,
//   // right: -5,
// },
// heart: {
//   width: 45,
//   height: 45,
//   // paddingBottom: 20,
//   // width: "100%",
//   // height: "100%",
//   // resizeMode: "contain",
// },
// name: {
//   fontSize: 24,
//   fontWeight: "900",
//   marginTop: 5,
// },
