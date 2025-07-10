import {useFonts} from "expo-font"
import {SplashScreen, Stack} from "expo-router";
import {useEffect} from "react";

import "./global.css"
import useAuthStore from "@/store/auth.store";

export default function RootLayout() {
  const {isLoading, fetchAuthenticatedUser} = useAuthStore()
  const [fontsLoaded, error] = useFonts({
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Medium": require("../assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-Light": require("../assets/fonts/OpenSans-Light.ttf"),
  })

  useEffect(() => {
    // Prevent auto-hide BEFORE fonts load
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(()=>{
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  },[fontsLoaded, error])

  useEffect(() => {
    fetchAuthenticatedUser()
  }, []);

  if (!fontsLoaded || isLoading) return null;

  return <Stack screenOptions={{ headerShown: false }}/>;
}
