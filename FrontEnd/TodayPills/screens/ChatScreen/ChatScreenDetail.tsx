import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ToastAndroid,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import BackgroundScreen from '../BackgroundScreen';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { getSpecificRoomChat } from '../../API/chatAPI';
import { useFocusEffect } from '@react-navigation/native';
import BackgroundScreen2 from '../BackgroundScreen2';
import GoBackBtn from '../../components/UI/GoBackBtn';
import { ScrollView } from 'react-native-gesture-handler';
import DetailedPillCard from '../../components/Cards/DetailedPillCard';
import {
  fetchAllSupplements,
  fetchSupplementByCategory,
} from '../../API/supplementAPI';
var stompClient = null;

const ChatScreenDetail = ({ navigation, route }: any) => {
  const [publicChats, setPublicChats] = useState([]);
  const [loadFlag, setLoadFlag] = useState(false);
  const [messages, setMessages] = useState([]);
  const [pills, setPills] = useState([]);
  const [nowPills, setNowPills] = useState([]);
  const [tab, setTab] = useState('CHATROOM');
  const [chat, setChat] = useState('');
  const [showSelectBox, SetShowSelectBox] = useState(false);
  const chatRef = useRef();
  const [uid, setUid] = useState(0);
  const [userData, setUserData] = useState({
    userId: 0,
    username: 'wjdtj',
    // receivername: "wjdtj",
    connected: false,
    message: 'hello',
  });
  const loadUserNickName = async () => {
    let name = await AsyncStorage.getItem('@storage_UserNickName');
    setUserData({
      ...userData,
      username: name,
      connected: false,
      message: 'hello',
    });
  };
  // useEffect(() => {
  //   // loadUserNickName();
  //   registerUser();
  // }, []);
  const loadPrevData = async () => {
    let chatData = await getSpecificRoomChat(route.params?.nutrient);
    // publicChats.push(chatData[0]);
    for (let chat of chatData) {
      if (chat.supplementId) {
        chat.text = (
          <Text
            style={{
              color: '#736bfa',
              textDecorationLine: 'underline',
              textDecorationStyle: 'solid',
              textDecorationColor: 'black',
            }}
            onPress={() => {
              navigation.navigate('SupplementScreen', {
                supplementId: chat.supplementId,
              });
            }}
          >
            {chat.text}
          </Text>
        );
      }
      publicChats.push(chat);
    }
    // setPublicChats(...publicChats, chatData);
  };
  useEffect(() => {
    registerUser();
    loadPrevData();
  }, []);
  // useFocusEffect(
  //   useCallback(() => {
  //     registerUser();
  //     loadPrevData();
  //   }, [])
  // );
  useEffect(() => {}, [publicChats]);
  useEffect(() => {
    if (chat.startsWith('@')) SetShowSelectBox(true);
    else {
      SetShowSelectBox(false);
    }
  }, [chat]);
  const connect = () => {
    try {
      let Sock = new SockJS('http://k7a706.p.ssafy.io:8080/wss');
      stompClient = over(Sock);
      stompClient.connect({}, onConnected, onError);
    } catch {
      ToastAndroid.show(
        '일시적 오류 입니다, 다시 시도 해주세요',
        ToastAndroid.SHORT
      );
      navigation.navigate('ChatHomeScreen');
    }
  };
  const onConnected = async () => {
    let userName = await AsyncStorage.getItem('@storage_UserNickName');
    let userId = Number(await AsyncStorage.getItem('@storage_UserId'));
    setUid(userId);
    console.log('연결시도!!');
    console.log(route.params);
    setUserData({
      ...userData,
      connected: true,
      username: userName,
      userId: userId,
    });
    stompClient.subscribe(
      `/chatroom/${route.params?.nutrient}`,
      onMessageReceived
    );
    userJoin(userName);
  };
  const userJoin = (userName) => {
    var chatMessage = {
      senderName: userName,
      status: 'JOIN',
    };
    stompClient.send(
      `/app/${route.params?.nutrient}`,
      {},
      JSON.stringify(chatMessage)
    );
  };
  const onMessageReceived = async (payload) => {
    // _id: Math.random(),
    // text: messages[0].text,
    // user: { _id: id },
    // createdAt: new Date(),
    // senderName: userData.username,
    // message: messages[0].text,
    // status: 'MESSAGE',
    var payloadData = JSON.parse(payload.body);
    console.log(payloadData, 'thisispay');
    if (payloadData.supplementId) {
    }
    let refinedData = {
      message: payloadData.text,
      text: payloadData.supplementId ? (
        <Text
          style={{ color: '#736bfa' }}
          onPress={() => {
            navigation.navigate('SupplementScreen', {
              supplementId: payloadData.supplementId,
            });
          }}
        >
          {payloadData.text}
        </Text>
      ) : (
        payloadData.text
      ),
      senderName: payloadData.senderName,
      status: payloadData.status,
      createdAt: payloadData.createdAt,
      _id: payloadData._id,
      supplementId: payloadData.supplementId,
      user: { _id: payloadData.user._id, name: payloadData.senderName },
    };
    // console.log(payloadData, 'this is payloadData');
    switch (payloadData.status) {
      case 'JOIN':
        break;
      case 'MESSAGE':
        // publicChats.push(payloadData);
        publicChats.unshift(refinedData);
        setPublicChats([...publicChats]);

        break;
    }
  };

  const onError = (err) => {
    console.log('실패!!');
    navigation.replace('ChatHomeScreen');
    ToastAndroid.show(`일시적 오류 입니다. 다시 시도해주세요`, 2);
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const sendValue = async (messages) => {
    onSend(messages);
    // _id: '1',
    // text: 'hahaha',
    // user: { _id: 1 },
    // createdAt: new Date(),
    // username: 'haha',
    console.log('this is message!!!', messages);
    if (stompClient) {
      let id = await AsyncStorage.getItem('@storage_UserId');
      var chatMessage = {
        _id: messages[0]._id,
        text: messages[0].text.props.children,
        user: { _id: id, name: userData.username },
        createdAt: new Date(),
        senderName: userData.username,
        userName: userData.username,
        supplementId: messages[0].supplementId,
        // message: messages[0].text,
        status: 'MESSAGE',
      };
      // console.log(chatMessage.message, 'this is messages');
      // console.log(messages, 'all messagse');
      console.log(chatMessage);
      console.warn(chatMessage);
      // console.log(publicChats);
      stompClient.send(
        `/app/${route.params?.nutrient}`,
        {},
        JSON.stringify(chatMessage)
      );
      setUserData({ ...userData, message: '' });
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };
  const onSend = useCallback((messages = []) => {
    // setMessages((previousMessages) =>
    //   GiftedChat.append(previousMessages, messages)
    // );
    if (messages[0].supplementId) {
      messages[0].text = (
        <Text
          style={{ color: '#ff8247' }}
          onPress={() => {
            navigation.navigate('SupplementScreen', {
              supplementId: messages[0].supplementId,
            });
          }}
        >
          {messages[0].text}
        </Text>
      );
    }
    console.log(messages, 'this is message');
    setPublicChats((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  const registerUser = async () => {
    connect();
    const arr = await fetchSupplementByCategory(route.params?.nutrientName);
    setPills(arr);
  };
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#d6d6d6',
          },
          right: {
            backgroundColor: '#f4caf3',
          },
        }}
        textStyle={{
          left: {
            color: '#fff',
          },
        }}
      />
    );
  };
  const annotationHandler = async (value) => {
    let id = await AsyncStorage.getItem('@storage_UserId');
    let name = await AsyncStorage.getItem('@storage_UserNickName');

    // console.log(value);
    SetShowSelectBox(false);
    chatRef.current.onSend([
      {
        _id: String(Math.random()),
        createdAt: new Date(),
        text: '@' + value.supplementName,
        supplementId: value.supplementId,
        user: {
          _id: id,
          name: name,
        },
      },
    ]);
    setChat('');
  };
  return (
    <BackgroundScreen2>
      <>
        <View style={styles.chatTitle}>
          {/* <Ionicons
            name="arrow-back"
            size={48}
            color="black"
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
          <View style={{ marginLeft: 20, flexDirection: 'row' }}>
            <Image source={route.params?.nutrientImage} style={styles.image} />
            <Text style={styles.roomChat}>
              <Text style={styles.chat}>{`${route.params?.nutrientName}`}</Text>{' '}
              채팅방
            </Text>
          </View>
        </View>
        {showSelectBox && (
          <View style={styles.selectBox}>
            <View style={styles.selectContent}>
              <ScrollView>
                {nowPills.map((item, index) => {
                  return (
                    <DetailedPillCard
                      key={index}
                      userId={uid}
                      supplementId={item.supplementId}
                      image={item.image}
                      brand={item.brand}
                      supplementName={item.supplementName}
                      like={item.like}
                      note={item.note}
                      additionalEfficacy={item.additionalEfficacy}
                      ingredients={item.ingredients}
                      caution={item.caution}
                      isMain={'chat'}
                      isChat={true}
                      chatHandler={annotationHandler}
                      navigation={navigation}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>
        )}
        {userData.userId !== 0 && (
          <GiftedChat
            ref={chatRef}
            placeholder={'메세지를 입력하세요...'}
            alwaysShowSend={true}
            renderUsernameOnMessage={true}
            messages={publicChats}
            renderBubble={renderBubble}
            textInputProps={{ keyboardAppearance: 'dark', autoCorrect: false }}
            text={chat}
            onInputTextChanged={(text) => {
              const nowArr = pills.filter((item) => {
                return item.supplementName.includes(text.slice(1));
              });
              setNowPills(nowArr);
              setChat(text);
            }}
            onSend={(messages) => {
              return sendValue(messages);
              // return onSend(messages);
            }}
            user={{
              _id: userData.userId,
              name: userData.username,
            }}
          />
        )}
      </>
    </BackgroundScreen2>
  );
};
export default ChatScreenDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textLine: {
    flex: 1,
  },
  textInput: {
    backgroundColor: 'white',
    width: '85%',
  },
  textBox: {
    flexDirection: 'row',
  },
  textBtn: {
    width: '15%',
  },
  chatTitle: {
    flexDirection: 'row',
    marginTop: 20,
  },
  roomChat: {
    fontSize: 20,
    marginTop: 10,
  },
  chat: {
    color: '#a2a3f5',
    fontFamily: '웰컴체_Bold',
    fontSize: 25,
  },
  image: {
    position: 'relative',
    top: 5,
    marginRight: 15,
    width: 40,
    height: 40,
  },
  selectBox: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    height: 370,
    zIndex: 100,
    backgroundColor: 'white',
  },
  selectContent: {
    width: '100%',
  },
  // box: {
  //   flexDirection: "column-reverse",
  // },
});
