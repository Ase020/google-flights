import React from 'react'
import {Redirect, Slot} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from "react-native";
import useAuthStore from "@/store/auth.store";

export default function TabLayout() {
    const {isAuthenticated} = useAuthStore();

    if (!isAuthenticated) return (<Redirect href="/sign-in" />);

    return (
        <SafeAreaView>
            <Text>Tabs Layout</Text>
            <Slot/>
        </SafeAreaView>
    )
}
