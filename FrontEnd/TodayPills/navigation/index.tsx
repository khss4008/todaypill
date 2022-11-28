/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  Entypo,
  Ionicons,
} from '@expo/vector-icons';
// import { MaterialCommunityIcons } from "react-native-vector-icons.";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useFocusEffect,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

// import Colors from "../constants/Colors";
import useColorScheme from '../hooks/useColorScheme';
import CalendarScreen from '../screens/CalendarScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ModalScreen from '../screens/ModalScreen';
import ModifyRoutineScreen from '../screens/ModifyRoutineScreen';
import MyPageScreen from '../screens/MyPageScreen';
import MyPillsScreen from '../screens/MyPillsScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import RecommendationScreen from '../screens/RecommendationScreen';
import SearchScreen from '../screens/HomeScreen/SearchScreen';
import KakaoScreen from '../screens/StartScreen/KaKaoScreen';
import StartScreen from '../screens/StartScreen/StartScreen';
import NutrientScreen from '../screens/HomeScreen/NutrientScreen';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SurveyScreen from '../screens/SurveyScreen/SurveyScreen';
import HealthScreeningCheckScreen from '../screens/StartScreen/HealthScreeningCheckScreen';
import SurveyStartScreen from '../screens/SurveyScreen/SurveyStartScreen';
import LoginSuccessScreen from '../screens/StartScreen/LoginSuccessScreen';
import HealthScreeningDetail from '../screens/SurveyScreen/HealthScreeningDetailScreen';
import HealthScreeningDetailScreen from '../screens/SurveyScreen/HealthScreeningDetailScreen';
import SurveyLoadingScreen from '../screens/SurveyScreen/SurveyLoadingScreen';
import PersonalRecommendationScreen from '../screens/SurveyScreen/PersonalRecommendationScreen';
import NutrientDetailScreen from '../screens/SurveyScreen/NutrientDetailScreen';
import SurveyDeepScreen from '../screens/SurveyScreen/SurveyDeepScreen';
import SurveyDeepLoadingScreen from '../screens/SurveyScreen/SurveyDeepLoadingScreen';
import PillResultScreen from '../screens/SurveyScreen/PillResultScreen';
import GenderCheckScreen from '../screens/SurveyScreen/GenderCheckScreen';
import FirstAddSurvey from '../screens/AddSurvey/FirstAddSurvey';
import SecondAddSurvey from '../screens/AddSurvey/SecondAddSurvey';
import ChatScreen from '../screens/ChatScreen/ChatHomeScreen';
import AiHomeScreen from '../screens/AiScreen/AiHomeScreen';
import AiPaperScreen from '../screens/AiScreen/AiPaperScreen';
import AiQnaScreen from '../screens/AiScreen/AiQnaScreen';
import AiAnalysisScreen from '../screens/AiScreen/AiAnalysisScreen';
import AiResultScreen from '../screens/AiScreen/AiResultScreen';
import ChatScreenDetail from '../screens/ChatScreen/ChatScreenDetail';
import ChatHomeScreen from '../screens/ChatScreen/ChatHomeScreen';
import SupplementScreen from '../screens/HomeScreen/SupplementScreen';
import HealthScreeningFail from '../screens/SurveyScreen/HealthScreeningFail';
interface Inavigation {
  colorScheme: ColorSchemeName;
  LoginCheck: () => {};
}
let loginCheck: () => {};
export default function Navigation({ colorScheme, LoginCheck }: Inavigation) {
  loginCheck = LoginCheck;
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={MaterialBottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginSuccessScreen"
          component={LoginSuccessScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="KakaoScreen"
          component={KakaoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HealthScreeningCheckScreen"
          component={HealthScreeningCheckScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SurveyStartScreen"
          component={SurveyStartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SurveyScreen"
          component={SurveyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HealthScreeningDetailScreen"
          component={HealthScreeningDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SurveyLoadingScreen"
          component={SurveyLoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PersonalRecommendationScreen"
          component={PersonalRecommendationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NutrientDetailScreen"
          component={NutrientDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SurveyDeepScreen"
          component={SurveyDeepScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SurveyDeepLoadingScreen"
          component={SurveyDeepLoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PillResultScreen"
          component={PillResultScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GenderCheckScreen"
          component={GenderCheckScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FirstAddSurvey"
          component={FirstAddSurvey}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SecondAddSurvey"
          component={SecondAddSurvey}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SupplementScreen"
          component={SupplementScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ai"
          component={Ai}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AiQnaScreen"
          component={AiQnaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HealthScreeningFail"
          component={HealthScreeningFail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createMaterialBottomTabNavigator<RootTabParamList>();

function RootNavigator() {
  return (
    <>
      <Stack.Screen
        name="Root"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={MaterialBottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyPills"
        component={MyPillsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
function MyPageNav() {
  return (
    <Stack.Navigator
      initialRouteName="MyPage"
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="MyPills"
        component={MyPillsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ModifyRoutine"
        component={ModifyRoutineScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SupplementScreen"
        component={SupplementScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function CalendarNav() {
  return (
    <Stack.Navigator
      initialRouteName="Calendar"
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="MyPills"
        component={MyPillsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ModifyRoutine"
        component={ModifyRoutineScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function Home() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NutrientScreen"
        component={NutrientScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SupplementScreen"
        component={SupplementScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function Ai() {
  return (
    <Stack.Navigator initialRouteName="AiHomeScreen">
      <Stack.Screen
        name="AiHomeScreen"
        component={AiHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AiPaperScreen"
        component={AiPaperScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AiQnaScreen"
        component={AiQnaScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AiAnalysisScreen"
        component={AiAnalysisScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AiResultScreen"
        component={AiResultScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function Chat() {
  return (
    <Stack.Navigator initialRouteName="AiHomeScreen">
      <Stack.Screen
        name="ChatHomeScreen"
        component={ChatHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatScreenDetail"
        component={ChatScreenDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function MaterialBottomTabNavigator({ navigation }: any) {
  const colorScheme = useColorScheme();
  const checkLogin = async () => {
    if ((await AsyncStorage.getItem('@storage_UserId')) === null) {
      navigation.replace('Start');
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      // loginCheck();
      checkLogin();
    }, [])
  );
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      activeColor="#E881B1"
      barStyle={{ backgroundColor: 'white' }}
      // barStyle={{ backgroundColor: "#E2C3DC" }}
      // screenOptions={{
      //   tabBarActiveTintColor: Colors[colorScheme].tint,
      // }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            navigation.navigate('HomeScreen');
          },
        }}

        // options={({ navigation }: RootTabScreenProps<"Home">) => ({
        //   title: "Home",
        //   tabBarIcon: ({ color }) =>
        //   <TabBarIcon name="code" color={color} />,
        //   headerRight: () => (
        //     <Pressable
        //       onPress={() => navigation.navigate("Modal")}
        //       style={({ pressed }) => ({
        //         opacity: pressed ? 0.5 : 1,
        //       })}
        //     >
        //       <FontAwesome
        //         name="info-circle"
        //         size={25}
        //         color={Colors[colorScheme].text}
        //         style={{ marginRight: 15 }}
        //       />
        //     </Pressable>
        //   ),
        // })}
      />
      {/* <BottomTab.Screen
        name="Start"
        component={StartScreen}
        options={{
          tabBarLabel: "시작화면",
          tabBarIcon: ({ color }) => (
            // <FontAwesome5 name="pills" size={22} color={color} />
            <MaterialCommunityIcons name="pill" size={26} color={color} />
          ),
        }}
      /> */}
      <BottomTab.Screen
        name="ChatScreen"
        component={Chat}
        options={{
          tabBarLabel: '채팅',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="chatbubble-ellipses-sharp"
              size={22}
              color={color}
            />

            // <MaterialCommunityIcons name="pill" size={26} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Ai"
        component={Ai}
        options={{
          tabBarLabel: 'AI분석',
          tabBarIcon: ({ color }) => (
            <Entypo name="bar-graph" size={26} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            navigation.navigate('AiHomeScreen');
          },
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarNav}
        options={{
          tabBarLabel: '캘린더',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-alt" size={26} color={color} />
            // <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="MyPage"
        component={MyPageNav}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// function CalendarNav(){
//   return (
//     <Stack.Navigator
//     screenOptions={{
//       headerShown : false,
//       initialRouteName : 'Calendar'
//     }}
//     >
//       <Stack.Screen name="Calendar" component={CalendarPage} />
//       <Stack.Screen name="Add" component={AlarmAdd} />
//     </Stack.Navigator>
//   );
// }

// function AlarmNav(){
//   return(
//     <Stack.Navigator
//     screenOptions={{
//       headerShown : false,
//       initialRouteName : 'AlarmScreen'
//     }}
//     >
//       <Stack.Screen name="AlarmScreen" component={Alarm} />
//       <Stack.Screen name="AlarmInfo" component={AlarmInfo} />
//     </Stack.Navigator>
//   )
// }

// function TimelineNav(){
//   return(
//     <Stack.Navigator
//     screenOptions={{
//       headerShown : false,
//       initialRouteName : 'TimelineScreen'
//     }}
//     >
//       <Stack.Screen name="TimelineScreen" component={Timeline} />
//       <Stack.Screen name="TimelineDetail" component={TimelineDetail} />
//     </Stack.Navigator>
//   )
// }

// function CalendarTop() {
//   return (
//     <TopTab.Navigator screenOptions={{
//       headerTitleAlign: 'center',
//       tabBarActiveTintColor:'black',
//       tabBarIndicatorStyle:{backgroundColor:'black'},
//       tabBarLabelStyle:{fontSize:15},
//       initialRouteName:'CalendarScreen'
//       }}>
//         <TopTab.Screen name='CalendarScreen' component={CalendarNav}  options={{title:'달력'}}/>
//         <TopTab.Screen name='Alarm' component={AlarmNav} options={{title:'알람'}} />
//         <TopTab.Screen name='Timeline' component={TimelineNav} options={{title:'이력'}}/>
//     </TopTab.Navigator>
//   );
// }

// function CommunityNav() {
//   return (
//     <Stack.Navigator screenOptions={{
//       headerTitleAlign: 'center',
//       initialRouteName:'community'
//       }}>
//       <Stack.Screen name='community' component={CommunityPage} options={{title:'커뮤니티'}}/>
//       <Stack.Screen name='communitysearch' component={CommunitySearchPage} options={{title:'검색 결과'}}/>
//       <Stack.Screen name='communitywrite' component={PostCreatePage} options={{title:'글 작성'}}/>
//       <Stack.Screen name='communityupdate' component={PostUpdatePage} options={{title:'글 수정'}}/>
//       <Stack.Screen name='communitydetail' component={PostDetailPage} options={{title:''}}/>
//     </Stack.Navigator>
//   );
// }

// function TopTabStackScreen(){
//   return(
//     <Stack.Navigator screenOptions={{
//       headerTitleAlign: 'center'
//     }}>
//       <Stack.Screen name="CalendarTab" component={CalendarTop} options={{ title: '복용 일정' }}/>
//     </Stack.Navigator>
//   );
// }

// function MyPillScreen(){
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="MyPillTab" component={MyPillTop} options={{ headerShown : false }}/>
//     </Stack.Navigator>
//   )
// }

// function HomeNav({navigation}) {
//   return (
//     <Stack.Navigator
//     screenOptions={{
//       headerTitleAlign: 'center',
//       initialRouteName : 'Homes',
//       headerRight: ()=>(<Icon.Button onPress={()=>navigation.navigate('Search', {navigation:`${navigation}`})} name="magnify" color="black" backgroundColor='white' />),
//     }}>
//       <Stack.Screen name="Homes" component={HomePage} options={{title: '홈'}}/>
//       <Stack.Screen name="Search" component={Search} options={{ title: '검색', headerRight: null }}/>
//       <Stack.Screen name="Info" component={Info} options={{ title: '약 정보' }} />
//     </Stack.Navigator>
//   );
// }

// function MyPageNav() {
//   return (
//     <Stack.Navigator
//     screenOptions={{
//       headerTitleAlign: 'center',
//       initialRouteName:'mypageScreen'
//     }}>
//       <Stack.Screen name='mypageScreen' component={Mypage} options={{ title: '내 정보' }}/>
//       <Stack.Screen name='modifyInfo' component={ModifyInfo} options={{ title: '정보수정' }}/>
//       <Stack.Screen name='mypill' component={MyPillScreen} options={{ title: '마이필' }}/>
//     </Stack.Navigator>
//   )
// }

// function MyPillTop() {
//   return (
//     <TopTab.Navigator screenOptions={{
//         headerTitleAlign: 'center',
//         tabBarActiveTintColor:'black',
//         tabBarIndicatorStyle:{backgroundColor:'black'},
//         tabBarLabelStyle:{fontSize:15},
//         initialRouteName:'NowPill'
//        }}>
//         <TopTab.Screen name='NowPill' component={NowPillNav} options={{title:'복용중인 약'}} />
//         <TopTab.Screen name='PillHistory' component={MyPillHistory} options={{title:'최근 복용 이력'}}/>
//     </TopTab.Navigator>
//   );
// }

// function NowPillNav() {
//   return (
//     <Stack.Navigator screenOptions={{initialRouteName : 'MyPillNowPill'}}>
//         <Stack.Screen name="MyPillNowPill" component={MyPillNowPill} options={{ headerShown : false }}/>
//         <Stack.Screen name="MyPillInfo" component={MyPillInfo} options={{ headerShown : false }} />
//     </Stack.Navigator>
//   )
// }

// function MyAppNav() {
//   return(
//   <Tab.Navigator
//     screenOptions={({route})=>({
//       initialRouteName:'Home',
//       tabBarActiveTintColor: 'black',
//       headerShown : false,
//       tabBarHideOnKeyboard: true,
//       tabBarIcon: ({ color, size }) => {
//         const icons = {
//           Home: 'home',
//           Pharmacy : 'map-marker',
//           CalendarPage: 'calendar-blank',
//           Mypage: 'account',
//           CommunityScreen: 'account-group'
//         }
//         return(
//           <Icon name={icons[route.name]} color={color} size={size} />
//         )},
//     })}>
//       <Tab.Screen name="Home" component={HomeNav} options={{tabBarLabel:'홈'}}/>
//       <Tab.Screen name="Pharmacy" component={Pharmacy} options={{ title: '약국' }} />
//       <Tab.Screen name="CalendarPage" component={TopTabStackScreen} options={{ title: '일정' }} />
//       <Tab.Screen name='CommunityScreen' component={CommunityNav} options={{ title: '커뮤니티' }}/>
//       <Tab.Screen name="Mypage" component={MyPageNav} options={{ title: '내 정보' }}/>
//     </Tab.Navigator>
//     )
// }

// return (
//   <Stack.Navigator
//   screenOptions={{
//     headerShown : false
//     }}>
//       <Stack.Screen name="LoginScreen" component={Login} />
//       <Stack.Screen name="appscreen" component={MyAppNav} />
//   </Stack.Navigator>
// )
// }

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
