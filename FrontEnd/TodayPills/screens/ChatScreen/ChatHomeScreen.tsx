import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import BackgroundScreen from '../BackgroundScreen';
import { GiftedChat } from 'react-native-gifted-chat';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
var stompClient = null;
const arrr = [
  {
    _id: '1',
    text: 'hahaha',
    user: { _id: 1 },
    createdAt: new Date(),
    username: 'haha',
  },
];
import { ScrollView } from 'react-native';
import BackgroundScreen2 from '../BackgroundScreen2';
import ChatNutrient from '../../components/ChatPage/ChatNutrient';

const ChatHomeScreen = ({ navigation }: any) => {
  return (
    <BackgroundScreen2>
      <ScrollView>
        <ChatNutrient navigation={navigation} />
      </ScrollView>
    </BackgroundScreen2>
  );
};
export default ChatHomeScreen;
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
  // box: {
  //   flexDirection: "column-reverse",
  // },
});
