import {useFonts} from "expo-font"
import {SplashScreen, Stack} from "expo-router";
import {useEffect} from "react";

import "./global.css"

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Medium": require("../assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-Light": require("../assets/fonts/OpenSans-Light.ttf"),
  })

  useEffect(()=>{
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  },[fontsLoaded, error])

  return <Stack screenOptions={{ headerShown: false }}/>;
}
