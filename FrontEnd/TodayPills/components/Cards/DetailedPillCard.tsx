import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  ToastAndroid,
  Linking,
} from 'react-native';
import { useState, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { fetchLikeUsers, like, dislike } from '../../API/likeAPI';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import PillCard from '../UI/PillCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { Entypo } from '@expo/vector-icons';
import { boldWelcome, regularWelcome } from '../Data/fontFamilyObject';

const DetailedPillCard = (props: any) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getLikeOrNot = async () => {
    const likeUsersList = await fetchLikeUsers(props.supplementId);
    if (likeUsersList.length === 0) {
      setIsLiked(false);
    } else {
      likeUsersList.includes(props.userId)
        ? setIsLiked(true)
        : setIsLiked(false);
    }
    await setLikeCnt(likeUsersList.length);
  };

  const likeHandler = async () => {
    await like(props.userId, props.supplementId);
    setIsLiked(true);
    ToastAndroid.show('영양제가 나의 Pick에 추가됐습니다.', 3);
  };

  const dislikeHandler = async () => {
    await dislike(props.userId, props.supplementId);
    setIsLiked(false);
    ToastAndroid.show('영양제가 나의 Pick에서 제외됐습니다.', 3);
  };

  const naverSearch = () => {
    Linking.openURL(
      `https://msearch.shopping.naver.com/search/all?query=${props.supplementName}&frm=NVSHSRC&vertical=home&fs=true`
    );
  };

  useFocusEffect(
    useCallback(() => {
      getLikeOrNot();
    }, [props.userId, props.supplementId, isLiked])
  );

  return (
    <PillCard height={120} width={'90%'} bgColor={'white'}>
      <Pressable
        android_ripple={{ color: '#4E736F' }}
        style={styles.cardContainer}
        onPress={() => {
          if (props.isChat) {
            props.chatHandler(props);
            return;
          }
          if (props.isMain) {
            props.navigation.navigate('SupplementScreen', {
              supplementId: props.supplementId,
            });
          } else {
            navigation.navigate('ModifyRoutine', {
              pillId: props.supplementId,
              update: 'false',
            });
          }
        }}
      >
        <View style={styles.imagecontainer}>
          <Image source={{ uri: props.image }} style={styles.image} />
        </View>
        <View style={styles.textcontainer}>
          <Text style={{ ...styles.brandname, ...regularWelcome }}>
            {props.brand}
          </Text>
          <Text
            style={{ ...styles.pillname, ...boldWelcome }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {props.supplementName}
          </Text>
          <View style={styles.featurecontainer}>
            {props.additionalEfficacy ? (
              props.additionalEfficacy
                .split(', ')
                .filter((efficacy, idx) => idx < 4)
                .map((efficacy, idx) => (
                  <Text
                    key={idx}
                    style={{
                      ...styles.feature,
                      ...styles.mintfeature,
                      ...regularWelcome,
                    }}
                  >
                    {efficacy}
                  </Text>
                ))
            ) : props.note ? (
              <Text
                style={{
                  ...regularWelcome,
                  ...styles.feature,
                  ...styles.pinkfeature,
                }}
              >
                {props.note}
              </Text>
            ) : null}
          </View>
          {props.caution !== null && (
            <View style={styles.alertcontainer}>
              <Ionicons name="warning" size={11} color="#FFCE31" />
              <Text style={{ ...styles.blackalert, ...regularWelcome }}>
                주의&nbsp;
              </Text>
              <Text style={{ ...styles.greyalert, ...regularWelcome }}>
                {props.caution}
              </Text>
            </View>
          )}
        </View>
        <Entypo
          name="magnifying-glass"
          size={30}
          color="#a2a3f5"
          style={styles.navercontainer}
          onPress={() => {
            naverSearch();
          }}
        />
        <View style={styles.heartcontainer}>
          <Pressable
            onPress={isLiked ? dislikeHandler : likeHandler}
            style={styles.heartbutton}
          >
            <Image
              source={
                isLiked
                  ? require('../../assets/images/heartOn3.png')
                  : require('../../assets/images/heartOff1.png')
              }
              style={styles.heart}
            />
          </Pressable>
          <Text style={{ ...styles.likeCnt, ...regularWelcome }}>
            {likeCnt}
          </Text>
        </View>
      </Pressable>
    </PillCard>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  imagecontainer: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '100%',
    resizeMode: 'contain',
  },
  textcontainer: {
    width: '70%',
  },
  brandname: {
    fontSize: 12,
    color: '#B7B7B7',
    marginTop: -5,
  },
  pillname: {
    fontSize: 13,
    // fontWeight: "bold",
    marginBottom: 2,
  },
  featurecontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  feature: {
    alignSelf: 'flex-start',
    height: 16,
    fontSize: 10,
    // fontWeight: "bold",
    borderRadius: 20,
    marginBottom: 1,
    marginRight: 3,
    paddingHorizontal: 6,
  },
  mintfeature: {
    backgroundColor: '#C4F1EA',
    paddingVertical: 3,
  },
  pinkfeature: {
    backgroundColor: '#F8F0F6',
    paddingVertical: 3,
  },
  alertcontainer: {
    flexDirection: 'row',
    width: '85%',
  },
  blackalert: {
    color: 'black',
    fontSize: 11,
    width: 23,
    marginTop: 1,
  },
  greyalert: {
    color: '#B7B7B7',
    fontSize: 11,
    marginTop: 1,
  },
  navercontainer: {
    position: 'absolute',
    top: 10,
    right: 5,
  },
  naverbutton: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  heartcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 0,
    width: '10%',
    height: '30%',
  },
  heartbutton: {
    width: '100%',
    height: '100%',
  },
  heart: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  likeCnt: {
    color: '#6B6B6B',
    marginTop: -5,
    fontSize: 15,
  },
});

export default DetailedPillCard;
