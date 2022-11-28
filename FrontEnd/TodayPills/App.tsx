import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import StartScreen from "./screens/StartScreen/StartScreen";
import { useFocusEffect } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

import { RecoilRoot } from "recoil";

//  ------------- 스플래시 애니메이션 추가

// import React, { useState } from "react";
// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import AnimatedSplash from "react-native-animated-splash-screen";

// export default function App() {
//   const [loading, setLoading] = useState(false);

//   setTimeout(() => {
//     setLoading(true);
//   }, 3000);

//   return (
//     <AnimatedSplash
//       translucent={true}
//       isLoaded={loading}
//       logoImage={require("./assets/splash.png")}
//       backgroundColor={"#262626"}
//       logoHeight={150}
//       logoWidth={150}
//     >
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <StatusBar style="auto" />
//       </View>
//     </AnimatedSplash>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [userInfo, setUserInfo] = useState("");
  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem("@storage_User", value);
    } catch (e) {
      // saving error
    }
  };
  const loadData = async () => {
    try {
      let userStorage = await AsyncStorage.getItem("@storage_UserId");
      if (userStorage) {
        setUserInfo(userStorage);
        return true;
      }
      return false;
    } catch (e) {
      console.log("error", e);
    }
  };
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RecoilRoot>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} LoginCheck={loadData} />
          {userInfo && (
            <>
              <StatusBar />
            </>
          )}
        </SafeAreaProvider>
      </RecoilRoot>

      // <SafeAreaProvider>
      //   <Navigation colorScheme={colorScheme} LoginCheck={loadData} />
      //   {userInfo && (
      //     <>
      //       <StatusBar />
      //     </>
      //   )}
      // </SafeAreaProvider>
    );
  }
}
// const styles = StyleSheet.create({
//   rootScreen: {
//     flex: 1,
//   },
//   backgroundImage: {
//     opacity: 0.15,
//   },
// });
