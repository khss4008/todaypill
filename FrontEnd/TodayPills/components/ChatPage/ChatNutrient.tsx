import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ChatNutrientCard from '../Cards/ChatNutrientCard';
import SimpleNutrientCard from '../Cards/SimpleNutrientCard';

const ChatNutrient = ({ navigation }: any) => {
  const mainNutrients = [
    {
      nutId: 10,
      image: require('../../assets/images/ai/유산균.png'),
      nutrient: 'lactobacillus',
      nutrientName: '유산균',
    },
    {
      nutId: 6,
      image: require('../../assets/images/ai/오메가3.png'),
      nutrient: 'omega3',
      nutrientName: '오메가 3',
    },
    {
      nutId: 4,
      image: require('../../assets/images/ai/종합비타민.png'),
      nutrient: 'multivitamin',
      nutrientName: '종합비타민',
    },
    {
      nutId: 1,
      image: require('../../assets/images/ai/비타민B.png'),
      nutrient: 'vitaminB',
      nutrientName: '비타민 B',
    },
    {
      nutId: 2,
      image: require('../../assets/images/ai/비타민C.png'),
      nutrient: 'vitaminC',
      nutrientName: '비타민 C',
    },
    {
      nutId: 3,
      image: require('../../assets/images/ai/비타민D.png'),
      nutrient: 'vitaminD',
      nutrientName: '비타민 D',
    },
    {
      nutId: 12,
      image: require('../../assets/images/ai/철분.png'),
      nutrient: 'fe',
      nutrientName: '철분',
    },
    {
      nutId: 5,
      image: require('../../assets/images/ai/마그네슘.png'),
      nutrient: 'magnesium',
      nutrientName: '마그네슘',
    },
    {
      nutId: 9,
      image: require('../../assets/images/ai/아연.png'),
      nutrient: 'zinc',
      nutrientName: '아연',
    },
    {
      nutId: 8,
      image: require('../../assets/images/ai/루테인.png'),
      nutrient: 'lutein',
      nutrientName: '루테인',
    },
    {
      nutId: 11,
      image: require('../../assets/images/ai/콜라겐.png'),
      nutrient: 'collagen',
      nutrientName: '콜라겐',
    },
    {
      nutId: 7,
      image: require('../../assets/images/ai/밀크시슬.png'),
      nutrient: 'milkthistle',
      nutrientName: '밀크시슬',
    },
    {
      nutId: 13,
      image: require('../../assets/images/ai/프로폴리스.png'),
      nutrient: 'profolis',
      nutrientName: '프로폴리스',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text, fontFamily: '웰컴체_Bold' }}>
        관심분야로 채팅하세요
      </Text>
      <View style={styles.cardscontainer}>
        {mainNutrients.map((mainNutrient, idx) => (
          <Pressable
            key={idx}
            onPress={() => {
              navigation.navigate('ChatScreenDetail', {
                nutId: mainNutrient.nutId,
                nutrient: mainNutrient.nutrient,
                nutrientName: mainNutrient.nutrientName,
                nutrientImage: mainNutrient.image,
              });
            }}
          >
            <ChatNutrientCard
              image={mainNutrient.image}
              nutId={mainNutrient.nutId}
              nutrient={mainNutrient.nutrientName}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 15,
    paddingBottom: 15,
  },
  text: {
    fontSize: 21,
    marginLeft: 15,
    marginBottom: 10,
  },
  cardscontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default ChatNutrient;
