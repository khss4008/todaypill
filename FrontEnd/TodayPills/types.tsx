/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Main: undefined;
  Modal: undefined;
  NotFound: undefined;
  Start: undefined;
  MyPills: undefined;
  Search: undefined;
  MyPage: undefined;
  ModifyRoutine: undefined;
  Calendar: undefined;
  KakaoScreen: undefined;
  LoginScreen: undefined;
  HomeScreen: undefined;
  SearchScreen: undefined;
  NutrientScreen: undefined;
  LoginSuccessScreen: undefined;
  MainScreen: undefined;
  HealthScreeningCheckScreen: undefined;
  SurveyStartScreen: undefined;
  SurveyScreen: undefined;
  HealthScreeningDetailScreen: undefined;
  SurveyLoadingScreen: undefined;
  PersonalRecommendationScreen: undefined;
  NutrientDetailScreen: undefined;
  SurveyDeepScreen: undefined;
  SurveyDeepLoadingScreen: undefined;
  PillResultScreen: undefined;
  GenderCheckScreen: undefined;
  FirstAddSurvey: undefined;
  AllSupplementsScreen: undefined;
  SecondAddSurvey: undefined;
  AiHomeScreen: undefined;
  AiPaperScreen: undefined;
  AiQnaScreen: undefined;
  AiAnalysisScreen: undefined;
  AiResultScreen: undefined;
  ChatHomeScreen: undefined;
  ChatScreenDetail: undefined;
  SupplementScreen: undefined;
  Ai: undefined;
  HealthScreeningFail: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Recommendation: undefined;
  Calendar: undefined;
  MyPage: undefined;
  Start: undefined;
  ChatScreen: undefined;
  Ai: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type IBackground = {
  children?: JSX.Element;
  height?: number | string;
  width?: number | string;
  bgColor?: string;
  modalVisible?: boolean;
  customStyle?: object;
  modalCloseHandler?: () => void;
};

export type IUserInfo = {
  age: number;
  gender: string;
  name: string;
  userId: number;
  recommendNutrients: Array<string>;
};

// {
//   "cli": {
//     "version": ">= 2.6.0"
//   },
//   "build": {
//     "development": {
//       "developmentClient": true,
//       "distribution": "internal"
//     },
//     "preview": {
//       "android": {
//         "buildType": "apk"
//       },
//       "distribution": "internal"
//     },
//     "production": {}
//   },
//   "submit": {
//     "production": {}
//   }
// }
