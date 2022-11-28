import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'DalseoDarling': require('../assets/fonts/DalseoDarling.ttf'),
          'KOTRA_LEAP': require('../assets/fonts/KOTRA_LEAP.ttf'),
          '웰컴체_Bold': require('../assets/fonts/웰컴체_Bold.ttf'),
          '웰컴체_Regular': require('../assets/fonts/웰컴체_Regular.ttf'),
          '충북대학교_Bold': require('../assets/fonts/충북대학교_Bold.ttf'),
          '한국기계연구원_bold': require('../assets/fonts/한국기계연구원_bold.ttf'),
          '한국기계연구원_Light': require('../assets/fonts/한국기계연구원_Light.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
