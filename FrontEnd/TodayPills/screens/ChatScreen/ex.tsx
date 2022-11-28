import { useCallback, useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import BackgroundScreen from "../BackgroundScreen";
import { GiftedChat } from "react-native-gifted-chat";
import SockJS from "sockjs-client";
import StompJsClient from "react-stomp";
const ChatScreen = () => {
  // const [allChat, setAllChat] = useState([]);
  // const [myText, setMyText] = useState("");
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);
  useEffect(() => {
    // setMessages([
    //   {
    //     _id: 1,
    //     text: "안녕하세요! 반가워요 :D",
    //     createdAt: new Date(),
    //     user: {
    //       _id: 3,
    //       name: "React Nativ!!e",
    //       avatar: "https://placeimg.com/140/140/any",
    //     },
    //   },
    // ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    // console.log('previousMessages: ',previousMessages)
    // console.log("messages: ", messages);
    // ws.current.onopen();
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  return (
    <BackgroundScreen>
      <>
        <GiftedChat
          placeholder={"메세지를 입력하세요..."}
          alwaysShowSend={true}
          renderUsernameOnMessage={true}
          messages={messages}
          textInputProps={{ keyboardAppearance: "dark", autoCorrect: false }}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {/* <View>
          {allChat.map((tt) => {
            return <Text>{tt}</Text>;
          })}
        </View>
        <View>
          <Text>채팅</Text>
          <TextInput
            ref={textinput}
            onChangeText={(text: string) => {
              setMyText(text);
            }}
            onKeyPress={insertChat}
          ></TextInput>
        </View> */}
      </>
    </BackgroundScreen>
  );
};
export default ChatScreen;
