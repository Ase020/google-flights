import {ImageBackground, View,  KeyboardAvoidingView, Platform, ScrollView, Dimensions, Image} from 'react-native'
import React from 'react'
import {Redirect, Slot} from "expo-router";
import {images} from "@/constants";
import {SafeAreaView} from "react-native-safe-area-context";
import useAuthStore from "@/store/auth.store";

export default function AuthLayout() {
    const {isAuthenticated } = useAuthStore()

    if (isAuthenticated) return <Redirect href="/" />

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>

                <ScrollView className={"bg-white h-full"} keyboardShouldPersistTaps={"handled"}>
                    <View className={"w-full relative"} style={{ height: Dimensions.get("screen").height / 2.25}}>
                        <ImageBackground source={images.loginImg} className={"size-full rounded-b-lg"} resizeMode={"stretch"}/>
                        <Image className={"self-center size-20 absolute -bottom-16 z-10 shadow-2xl"} source={images.logo}/>
                    </View>
                    <Slot/>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
